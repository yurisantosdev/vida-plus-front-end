'use client'
import BaseApp from '@/components/BaseApp'
import { ChecklistsType } from '@/types/ChecklistsType'
import {
  ListBullets,
  Plus,
  WarningCircle,
  ListChecks
} from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'
import CardChecklist from './_components/CardChecklist'
import { UsuarioType } from '@/types/UsuariosType'
import { useSelector } from 'react-redux'
import { findAllChecklists } from '@/store/Checklists'
import { useRouter } from 'next/navigation'
import { AuthUser } from '@/services/auth'
import Subtitle from '@/components/Subtitle'
import BaseLayout from '@/templates/BaseLayout'

export default function Checklists() {
  const [checklists, setChecklists] = useState<Array<ChecklistsType>>()
  const [atualizar, setAtualizar] = useState<number>(0)
  const [checklistsPendentes, setChecklistsPendentes] = useState<number>(0)
  const [checklistsFinalizados, setChecklistsFinalizados] = useState<number>(0)
  const user: UsuarioType = useSelector((state: any) => state.userReducer)
  const router = useRouter()
  AuthUser()

  useEffect(() => {
    const consultaChecklists = async () => {
      if (user.uscodigo) {
        const response = await findAllChecklists(user.uscodigo)

        if (response !== undefined) {
          setChecklists(response.checklists)
          setChecklistsFinalizados(response.finalizados)
          setChecklistsPendentes(response.pendentes)
        }
      }
    }

    consultaChecklists()
  }, [atualizar])

  return (
    <BaseLayout
      loading={false}
      title="Checklists"
      extraComponent={
        <button
          onClick={async () => {
            localStorage.removeItem('ckcodigo')
            router.push('checklists/cadastro')
          }}
          className="absolute bottom-24 right-4 z-[99999] h-12 w-12 flex items-center justify-center rounded-full bg-green-700">
          <Plus size={20} />
        </button>
      }>
      <div className="pl-4 pr-4 mt-5">
        <div className="mb-5 flex items-center justify-center gap-2 transition-all animate-slide-up">
          <div className="h-[80px] w-[50%] flex items-center justify-between rounded-xl bg-blue-500 p-2">
            <ListBullets size={40} />
            <p className="text-4xl font-bold text-white">
              {checklistsPendentes}
            </p>
          </div>

          <button
            className="w-[50%]"
            onClick={() => {
              router.push('/checklists/finalizados')
            }}>
            <div className="h-[80px] flex items-center justify-between rounded-xl bg-green-700 p-2">
              <ListChecks size={40} />
              <p className="text-4xl font-bold text-white">
                {checklistsFinalizados}
              </p>
            </div>
          </button>
        </div>
      </div>

      <div className="max-h-[60%] pl-4 pr-4 mt-4 transition-all animate-slide-up">
        <Subtitle
          icon={<ListBullets size={25} className="text-black" />}
          title="Checklists Pendentes"
        />

        {Array.isArray(checklists) && checklists.length > 0 ? (
          <div className="overflow-x-scroll max-h-[550px] pb-28">
            {checklists.map((checklist: ChecklistsType, index: number) => {
              return (
                <CardChecklist
                  key={index}
                  title={checklist?.cktitulo || 'Sem título'}
                  quantidade={checklist?.itensChecklists?.length ?? 0}
                  onClick={async () => {
                    if (checklist.ckcodigo) {
                      router.push('/checklists/fazer')
                      localStorage.setItem('ckcodigo', checklist.ckcodigo)
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
    </BaseLayout>
  )
}
