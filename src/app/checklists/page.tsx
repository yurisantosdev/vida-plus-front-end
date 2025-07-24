'use client'
import BaseApp from '@/components/BaseApp'
import { ChecklistsType } from '@/types/ChecklistsType'
import { ListBullets, Plus, WarningCircle } from '@phosphor-icons/react'
import { CheckFat } from '@phosphor-icons/react/dist/ssr'
import React, { useEffect, useState } from 'react'
import CardChecklist from './_components/CardChecklist'

export default function Checklists() {
  const [checklists, setChecklists] = useState<Array<ChecklistsType>>()
  const [atualizar, setAtualizar] = useState<number>(0)
  const [checklistsPendentes, setChecklistsPendentes] = useState<number>(0)
  const [checklistsFinalizados, setChecklistsFinalizados] = useState<number>(0)

  useEffect(() => {
    const consultaChecklists = async () => {
      const uscodigo = await AsyncStorage.getItem('uscodigo')
      if (uscodigo) {
        const response = await findAllChecklists(uscodigo)

        if (response !== undefined) {
          setChecklists(response.checklists)
          setChecklistsFinalizados(response.finalizados)
          setChecklistsPendentes(response.pendentes)
        }
      }
    }

    // consultaChecklists();
  }, [atualizar])

  return (
    <BaseApp
      loading={false}
      title="Checklists"
      extraComponentTitle={
        <button
          onClick={async () => {
            alert('em desenvolvimento')
          }}
          className="absolute bottom-24 right-4 z-[99999] h-12 w-12 flex items-center justify-center rounded-full bg-green-700">
          <Plus size={20} />
        </button>
      }>
      <div className="pl-4 pr-4 mt-5">
        <div className="mb-5 flex items-center justify-center gap-2">
          <div className="h-[80px] w-[50%] flex items-center justify-between rounded-xl bg-blue-500 p-2">
            <ListBullets size={40} />
            <p className="text-4xl font-bold text-white">
              {checklistsPendentes}
            </p>
          </div>

          <button
            className="w-[50%]"
            onClick={() => {
              alert('em desenvolvimento')
            }}>
            <div className="h-[80px] flex items-center justify-between rounded-xl bg-green-700 p-2">
              <CheckFat size={40} />
              <p className="text-4xl font-bold text-white">
                {checklistsFinalizados}
              </p>
            </div>
          </button>
        </div>
      </div>

      <div className="max-h-[60%] pl-4 pr-4">
        {Array.isArray(checklists) && checklists.length > 0 ? (
          <div>
            {/* <SubTI title="Checklists pendentes" icon="list-outline" /> */}

            {checklists.map((checklist: ChecklistsType, index: number) => {
              return (
                <CardChecklist
                  index={index}
                  title={checklist?.cktitulo || 'Sem título'}
                  quantidade={checklist?.itensChecklists?.length ?? 0}
                  onClick={async () => {
                    if (checklist.ckcodigo) {
                      alert('em desenvolvimento')
                    }
                  }}
                />
              )
            })}
          </div>
        ) : (
          <div className="mt-4">
            <div className="w-full m-auto">
              <WarningCircle size={40} className="text-black w-full" />
            </div>
            <p className="text-md text-center text-black">
              Nenhum checklist pendente
            </p>
          </div>
        )}
      </div>
    </BaseApp>
  )
}
