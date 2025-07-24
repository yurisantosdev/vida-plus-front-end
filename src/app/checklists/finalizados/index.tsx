/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-hooks/rules-of-hooks */
import { View, Text, ScrollView, FlatList } from 'react-native';
import { BaseApp } from '~/components/BaseApp';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChecklistsType } from '~/types/ChecklistsType';
import { findFinalizados } from '~/store/Checklists';
import { SubTitleIcon } from '~/components/Title';
import CardChecklist from '../_components/CardChecklist';
import { useNavigation } from '@react-navigation/native';

export default function Finalizados() {
  const navigation: any = useNavigation();

  const [checklists, setChecklists] = useState<Array<ChecklistsType>>();

  useEffect(() => {
    const consultaChecklists = async () => {
      const uscodigo = await AsyncStorage.getItem('uscodigo');
      if (uscodigo) {
        const response = await findFinalizados(uscodigo);

        if (response !== undefined) {
          setChecklists(response.checklists);
        }
      }
    };

    consultaChecklists();
  }, []);

  return (
    <BaseApp loading={false} title="Finalizados" voltar navbar={false} sidebar={false}>
      <View className="pl-4 pr-4">
        {Array.isArray(checklists) && checklists.length > 0 ? (
          <FlatList
            data={checklists}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{ paddingBottom: 32 }}
            renderItem={({ item, index }) => (
              <CardChecklist
                index={index}
                title={item?.cktitulo || 'Sem título'}
                quantidade={item?.itensChecklists?.length ?? 0}
                onPress={async () => {
                  if (item.ckcodigo) {
                    await AsyncStorage.setItem('ckcodigo', item.ckcodigo);
                    navigation.navigate('FazerChecklist');
                  }
                }}
              />
            )}
          />
        ) : (
          <View className="mt-4">
            <Ionicons
              name="alert-circle-outline"
              className="mb-2 text-center"
              size={50}
              color="#000"
            />
            <Text className="text-md text-center text-black">Nenhum checklist cadastrado</Text>
          </View>
        )}
      </View>
    </BaseApp>
  );
}
