import { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BaseApp } from '~/components/BaseApp';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createChecklist, findChecklist, updateChecklist } from '~/store/Checklists';
import { ChecklistsType } from '~/types/ChecklistsType';
import { ItensChecklistsType } from '~/types/ItensChecklistsType';
import { AlertToastType } from '~/types/AlertToastType';
import { ALERT_TYPE } from 'react-native-alert-notification';
import { AlertToast } from '~/components/Alerts';

export default function CadastroChecklists() {
  const [tituloChecklist, setTituloChecklist] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [ckcodigo, setCkcodigo] = useState<string | null>('');
  const [itens, setItens] = useState<ItensChecklistsType[]>();
  const navigation = useNavigation();

  function adicionarItem() {
    if (itens) {
      setItens([...itens, { ictitulo: '', icdescricao: '', iccheck: false }]);
    } else {
      setItens([{ ictitulo: '', icdescricao: '', iccheck: false }]);
    }
  }

  function atualizarItem(index: number, campo: string, valor: string) {
    if (itens) {
      const novosItens: any = [...itens];
      novosItens[index][campo] = valor;
      setItens(novosItens);
    }
  }

  function removerItem(index: number) {
    if (itens) {
      const novosItens = [...itens];
      novosItens.splice(index, 1);
      setItens(novosItens);

      const dadosAlert: AlertToastType = {
        textBody: 'Item removido com sucesso!',
        title: 'Sucesso!',
        typeAlert: ALERT_TYPE.SUCCESS,
      };

      AlertToast(dadosAlert);
    }
  }

  async function salvarAtualizarChecklist() {
    setLoading(true);

    const uscodigo = await AsyncStorage.getItem('uscodigo');

    if (uscodigo) {
      if (tituloChecklist.length <= 0) {
        const dadosAlert: AlertToastType = {
          textBody: 'Informe um título do checklist!',
          title: 'Atenção!',
          typeAlert: ALERT_TYPE.WARNING,
        };

        AlertToast(dadosAlert);
        setLoading(false);
        return;
      }

      if (itens == undefined) {
        const dadosAlert: AlertToastType = {
          textBody: 'Informe um item do checklist, pelo!',
          title: 'Atenção!',
          typeAlert: ALERT_TYPE.WARNING,
        };

        AlertToast(dadosAlert);
        setLoading(false);
        return;
      } else if (!validacaoItens()) {
        const dadosAlert: AlertToastType = {
          textBody: 'Informe todos os campos obrigatórios!!',
          title: 'Atenção!',
          typeAlert: ALERT_TYPE.WARNING,
        };

        AlertToast(dadosAlert);
        setLoading(false);
        return;
      }

      if (ckcodigo != null) {
        const dadosChecklist: ChecklistsType = {
          cktitulo: tituloChecklist,
          ckusuario: uscodigo,
          itensChecklists: itens,
          ckcodigo,
        };

        const response = await updateChecklist(dadosChecklist);

        if (response !== undefined) {
          const dadosAlert: AlertToastType = {
            textBody: 'Checklist atualizado com sucesso!',
            title: 'Sucesso!',
            typeAlert: ALERT_TYPE.SUCCESS,
          };

          AlertToast(dadosAlert);
          DeviceEventEmitter.emit('checklistsAtualizar');
          navigation.goBack();
        } else {
          setLoading(false);
        }
      } else {
        const dadosChecklist: ChecklistsType = {
          cktitulo: tituloChecklist,
          ckusuario: uscodigo,
          itensChecklists: itens,
        };

        const response = await createChecklist(dadosChecklist);

        if (response !== undefined) {
          const dadosAlert: AlertToastType = {
            textBody: 'Checklist registrado com sucesso!',
            title: 'Sucesso!',
            typeAlert: ALERT_TYPE.SUCCESS,
          };

          AlertToast(dadosAlert);
          DeviceEventEmitter.emit('checklistsAtualizar');
          navigation.goBack();
        } else {
          setLoading(false);
        }
      }
    }

    setLoading(false);
  }

  function validacaoItens() {
    if (!itens || itens.length === 0) return false;

    return itens.every(
      (item: ItensChecklistsType) =>
        item.ictitulo.trim().length > 0 && item.icdescricao.trim().length > 0
    );
  }

  useEffect(() => {
    const consultaCodigoAtualizar = async () => {
      const codigoChecklist = await AsyncStorage.getItem('ckcodigo');
      setCkcodigo(codigoChecklist);

      if (codigoChecklist != null) {
        const respondeChecklist = await findChecklist(codigoChecklist);

        if (respondeChecklist !== undefined) {
          const dadosChecklist: ChecklistsType = respondeChecklist.checklist;

          setTituloChecklist(dadosChecklist.cktitulo);
          setItens(dadosChecklist.itensChecklists ?? []);
        }
      }
    };

    consultaCodigoAtualizar();
  }, []);

  return (
    <BaseApp
      loading={loading}
      title={`${ckcodigo != null ? 'Atualizar Checklist' : 'Cadastro de Checklist'}`}
      voltar
      navbar={false}
      sidebar={false}>
      <View className="pl-4 pr-4">
        <View className="mt-6 flex-row items-center justify-start gap-2">
          <Text className=" text-lg font-bold text-neutral-700">Título do checklist</Text>
          <Text className=" text-red-700">*</Text>
        </View>
        <TextInput
          className="mb-4 mt-1 rounded-lg border border-neutral-300 bg-neutral-100 p-3 text-neutral-900"
          placeholder="Ex: Checklist de limpeza"
          placeholderTextColor="#A3A3A3"
          value={tituloChecklist}
          onChangeText={setTituloChecklist}
        />

        <View className="mt-6 flex-row items-center justify-start gap-2">
          <Text className=" text-lg font-bold text-neutral-700">Itens do checklist</Text>
          <Text className=" text-red-700">*</Text>
        </View>

        <ScrollView className="max-h-[65%]">
          {itens &&
            itens.map((item, index) => (
              <View key={index} className="mb-4 rounded-xl border border-neutral-300 bg-white p-4">
                <View className="mb-2 flex-row items-center justify-between">
                  <Text className="text-base font-semibold text-neutral-800">Item {index + 1}</Text>

                  <TouchableOpacity onPress={() => removerItem(index)}>
                    <Ionicons name="trash-outline" size={22} color="#dc2626" />
                  </TouchableOpacity>
                </View>

                <TextInput
                  className="mb-4 mt-1 rounded-lg border border-neutral-300 bg-neutral-100 p-3 text-neutral-900"
                  placeholder="Título do item"
                  placeholderTextColor="#A3A3A3"
                  value={item.ictitulo}
                  onChangeText={(text) => atualizarItem(index, 'ictitulo', text)}
                />

                <TextInput
                  className="mb-4 mt-1 rounded-lg border border-neutral-300 bg-neutral-100 p-3 text-neutral-900"
                  placeholder="Descrição do item"
                  placeholderTextColor="#A3A3A3"
                  value={item.icdescricao}
                  onChangeText={(text) => atualizarItem(index, 'icdescricao', text)}
                />
              </View>
            ))}
        </ScrollView>

        <TouchableOpacity
          className="mb-6 flex-row items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3"
          onPress={adicionarItem}>
          <Ionicons name="add-circle-outline" size={22} color="#fff" />
          <Text className="text-base font-semibold text-white">Adicionar item</Text>
        </TouchableOpacity>
      </View>

      <View className="absolute bottom-2 m-4 flex-row items-center justify-between gap-2 rounded-xl">
        <TouchableOpacity
          className="w-[49%] rounded-xl bg-red-600 py-4"
          onPress={async () => {
            navigation.goBack();
          }}>
          <Text className="text-center text-lg font-bold text-white">Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-[49%] rounded-xl bg-green-600 py-4"
          onPress={salvarAtualizarChecklist}>
          <Text className="text-center text-lg font-bold text-white">Salvar</Text>
        </TouchableOpacity>
      </View>
    </BaseApp>
  );
}
