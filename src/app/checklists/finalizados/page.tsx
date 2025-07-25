'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { findFinalizados } from '@/store/Checklists'
import BaseApp from '@/components/BaseApp'
import CardChecklist from '../_components/CardChecklist'
import { ListChecks, WarningCircle } from '@phosphor-icons/react'
import { AuthUser } from '@/services/auth'
import { UsuarioType } from '@/types/UsuariosType'
import { useSelector } from 'react-redux'
import Subtitle from '@/components/Subtitle'
import { ChecklistsType } from '@/types/ChecklistsType'
import BaseLayout from '@/templates/BaseLayout'

export default function Finalizados() {
  const router = useRouter()
  const [checklists, setChecklists] = useState([])
  const user: UsuarioType = useSelector((state: any) => state.userReducer)
  AuthUser()

  useEffect(() => {
    const consultaChecklists = async () => {
      if (user.uscodigo) {
        const response = await findFinalizados(user.uscodigo)
        if (response) {
          setChecklists(response.checklists)
        }
      }
    }

    consultaChecklists()
  }, [])

  return (
    <BaseLayout
      loading={false}
      menu={false}
      title="Finalizados"
      navbar={false}
      voltar>
      <div className="px-4 mt-4 transition-all animate-slide-up">
        <Subtitle
          icon={<ListChecks size={25} className="text-black" />}
          title="Checklists Finalizados"
        />

        {Array.isArray(checklists) && checklists.length > 0 ? (
          <div className="space-y-4 pb-10 overflow-auto max-h-[75vh] transition-all animate-slide-up">
            {checklists.map((item: ChecklistsType, index: number) => (
              <CardChecklist
                key={index}
                title={item?.cktitulo || 'Sem título'}
                quantidade={item?.itensChecklists?.length ?? 0}
                onClick={async () => {
                  if (item.ckcodigo) {
                    localStorage.setItem('ckcodigo', item.ckcodigo)
                    router.push('/checklists/fazer')
                  }
                }}
              />
            ))}
          </div>
        ) : (
          <div className="mt-4 text-center">
            <WarningCircle size={40} className="text-black w-full" />
            <p className="text-md text-black mt-2">
              Nenhum checklist cadastrado
            </p>
          </div>
        )}
      </div>
    </BaseLayout>
  )
}
