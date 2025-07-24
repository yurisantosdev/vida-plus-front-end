import { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  DeviceEventEmitter,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { BaseApp } from '~/components/BaseApp';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { findChecklist, updateChecklist } from '~/store/Checklists';
import { ChecklistsType } from '~/types/ChecklistsType';
import { ItensChecklistsType } from '~/types/ItensChecklistsType';
import { SubTitleIcon, Title } from '~/components/Title';
import { Ionicons } from '@expo/vector-icons';
import { AlertToastType } from '~/types/AlertToastType';
import { ALERT_TYPE } from 'react-native-alert-notification';
import { AlertToast } from '~/components/Alerts';

export default function FazerChecklist() {
  const [tituloChecklist, setTituloChecklist] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [ckcodigo, setCkcodigo] = useState<string | null>('');
  const [itens, setItens] = useState<ItensChecklistsType[]>();
  const navigation: any = useNavigation();
  const [atualizar, setAtualizar] = useState<number>(0);
  const [modalFinalizarChecklist, setModalFinalizarChecklist] = useState(false);
  const [finalizado, setFinalizado] = useState(false);

  async function finalizarChecklist(finalizar: boolean) {
    setLoading(true);

    const uscodigo = await AsyncStorage.getItem('uscodigo');

    if (uscodigo && ckcodigo) {
      const obj: ChecklistsType = {
        ckcodigo,
        cktitulo: tituloChecklist,
        ckusuario: uscodigo,
        itensChecklists: itens,
        ckfinalizado: finalizar,
      };

      const response = await updateChecklist(obj);

      if (response !== undefined) {
        const dadosAlert: AlertToastType = {
          textBody: 'Checklist finalizado!',
          title: 'Sucesso!',
          typeAlert: ALERT_TYPE.SUCCESS,
        };

        AlertToast(dadosAlert);
        setModalFinalizarChecklist(false);
        DeviceEventEmitter.emit('checklistsAtualizar');
        navigation.goBack();
      }
    }

    setLoading(false);
  }

  function changeItemChecklist(item: ItensChecklistsType) {
    if (!item.iccodigo) return;

    const novaLista = (itens || []).map((i) => {
      if (i.iccodigo === item.iccodigo) {
        return {
          ...i,
          iccheck: !i.iccheck,
        };
      }
      return i;
    });

    setItens(novaLista);
  }

  useEffect(() => {
    const consultaCodigoAtualizar = async () => {
      const codigoChecklist = await AsyncStorage.getItem('ckcodigo');
      setCkcodigo(codigoChecklist);

      if (codigoChecklist != null) {
        const respondeChecklist = await findChecklist(codigoChecklist);

        if (respondeChecklist !== undefined) {
          const dadosChecklist: ChecklistsType = respondeChecklist.checklist;
          setFinalizado(dadosChecklist.ckfinalizado ?? false);
          setTituloChecklist(dadosChecklist.cktitulo);
          setItens(dadosChecklist.itensChecklists ?? []);
        }
      }
    };

    consultaCodigoAtualizar();
  }, [atualizar]);

  useEffect(() => {
    const handleAtualizacao = async () => {
      setAtualizar((prev) => prev + 1);
    };

    handleAtualizacao();

    const subscription = DeviceEventEmitter.addListener('checklistsAtualizar', handleAtualizacao);

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <BaseApp
      loading={loading}
      title={finalizado ? 'Checklist Finalizado' : 'Fazer Checklist'}
      voltar
      navbar={false}
      sidebar={false}>
      <View className="pl-4 pr-4">
        <Title title={tituloChecklist} />

        <View className="mt-4">
          <SubTitleIcon title="Itens do Checklist" icon="list-outline" />

          <ScrollView className="mt-4">
            {itens &&
              itens.map((item: ItensChecklistsType, index: number) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    if (!finalizado) {
                      changeItemChecklist(item);
                      itens[index].iccheck = !itens[index].iccheck;
                    }
                  }}
                  className={`mt-2 flex-row items-start rounded-lg p-3 ${item.iccheck ? 'bg-blue-300' : 'bg-white'}`}>
                  <View className="flex-row items-center justify-between">
                    <View className="w-[90%] flex-1">
                      <Text className="font-bold text-black">{item.ictitulo}</Text>
                      <Text className="mt-3 font-extralight text-black">{item.icdescricao}</Text>
                    </View>

                    {item.iccheck && (
                      <View className="w-[10%]">
                        <Ionicons name="checkmark-outline" size={35} color="#fff" />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      </View>

      <View className="absolute bottom-2 m-4 w-full">
        {finalizado ? (
          <View className="w-full">
            <TouchableOpacity
              className="m-auto mb-3 w-[40%] rounded-xl bg-red-600 py-4"
              onPress={() => {
                navigation.goBack();
              }}>
              <Text className="text-center text-lg font-bold text-white">Fechar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              className="mb-3 w-full rounded-xl bg-blue-600 py-4"
              onPress={() => {
                navigation.navigate('CadastroChecklists');
              }}>
              <Text className="text-center text-lg font-bold text-white">Editar</Text>
            </TouchableOpacity>

            <View className="flex-row items-center justify-between gap-2 rounded-xl">
              <TouchableOpacity
                className="w-[49%] rounded-xl bg-red-600 py-4"
                onPress={async () => {
                  navigation.goBack();
                }}>
                <Text className="text-center text-lg font-bold text-white">Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="w-[49%] rounded-xl bg-green-600 py-4"
                onPress={() => {
                  setModalFinalizarChecklist(true);
                }}>
                <Text className="text-center text-lg font-bold text-white">Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <Modal
        transparent={true}
        visible={modalFinalizarChecklist}
        animationType="fade"
        onAccessibilityTap={() => {
          setModalFinalizarChecklist(false);
        }}
        onRequestClose={() => {
          setModalFinalizarChecklist(false);
        }}>
        <TouchableWithoutFeedback onPress={() => setModalFinalizarChecklist(false)}>
          <View className="flex-1 items-center justify-center bg-black/80 p-10">
            <TouchableWithoutFeedback onPress={() => {}}>
              <View className="h-[20%] w-full rounded-lg bg-white p-3">
                <Text className="text-center text-2xl font-extrabold text-black">Atenção</Text>

                <Text className="mt-4 text-center text-lg text-black">
                  Finalizar este checklist agora?
                </Text>

                <View className="absolute bottom-2 m-4 flex-row items-center justify-between gap-2">
                  <TouchableOpacity
                    className="w-[51%] rounded-xl bg-red-600 py-4"
                    onPress={async () => {
                      finalizarChecklist(false);
                    }}>
                    <Text className="text-center text-lg font-bold text-white">Não</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="w-[50%] rounded-xl bg-green-600 py-4"
                    onPress={() => {
                      finalizarChecklist(true);
                    }}>
                    <Text className="text-center text-lg font-bold text-white">Sim</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </BaseApp>
  );
}
