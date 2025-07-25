'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { findChecklist, updateChecklist } from '@/store/Checklists'
import { ListBullets } from '@phosphor-icons/react/dist/ssr'
import { AuthUser } from '@/services/auth'
import { UsuarioType } from '@/types/UsuariosType'
import { useSelector } from 'react-redux'
import Subtitle from '@/components/Subtitle'
import BaseLayout from '@/templates/BaseLayout'
import { ItensChecklistsType } from '@/types/ItensChecklistsType'
import { Check } from '@phosphor-icons/react'
import Modal from '@/components/Modal'
import { CLickLabel } from '@/services/clickLabel'

export default function FazerChecklist() {
  AuthUser()
  const [tituloChecklist, setTituloChecklist] = useState('')
  const [loading, setLoading] = useState(false)
  const [ckcodigo, setCkcodigo] = useState(null)
  const [itens, setItens] = useState<ItensChecklistsType[]>()
  const [finalizado, setFinalizado] = useState(false)
  const user: UsuarioType = useSelector((state: any) => state.userReducer)
  const router = useRouter()

  async function finalizarChecklist(finalizar: boolean) {
    setLoading(true)

    if (user.uscodigo && ckcodigo) {
      const response = await updateChecklist({
        ckcodigo,
        cktitulo: tituloChecklist,
        ckusuario: user.uscodigo,
        itensChecklists: itens,
        ckfinalizado: finalizar
      })

      if (response) {
        toast.success(
          finalizado ? "'Checklist Finalizado!'" : "'Checklist Realizado!'"
        )
        router.back()
      }
    }

    setLoading(false)
  }

  function changeItemChecklist(item: ItensChecklistsType) {
    if (itens) {
      const novaLista: Array<ItensChecklistsType> = itens.map(
        (i: ItensChecklistsType) =>
          i.iccodigo === item.iccodigo ? { ...i, iccheck: !i.iccheck } : i
      )
      setItens(novaLista)
    }
  }

  useEffect(() => {
    const codigoChecklist: any = localStorage.getItem('ckcodigo')
    setCkcodigo(codigoChecklist)

    if (codigoChecklist) {
      findChecklist(codigoChecklist).then((res) => {
        if (res) {
          setTituloChecklist(res.checklist.cktitulo)
          setItens(res.checklist.itensChecklists || [])
          setFinalizado(res.checklist.ckfinalizado || false)
        }
      })
    }
  }, [])

  return (
    <div>
      <BaseLayout
        voltar
        menu={false}
        navbar={false}
        extraComponent={
          <div className="absolute bottom-4 left-0 w-full px-4 transition-all animate-slide-up">
            {finalizado ? (
              <button
                className="w-full bg-red-600 text-white font-bold py-3 rounded-xl"
                onClick={() => router.back()}>
                Fechar
              </button>
            ) : (
              <div className="space-y-3">
                <button
                  className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl"
                  onClick={() => router.push('/CadastroChecklists')}>
                  Editar
                </button>
                <div className="flex gap-2">
                  <button
                    className="w-1/2 bg-red-600 text-white font-bold py-3 rounded-xl"
                    onClick={() => router.back()}>
                    Cancelar
                  </button>
                  <button
                    className="w-1/2 bg-green-600 text-white font-bold py-3 rounded-xl"
                    onClick={() => {
                      CLickLabel('modalFinalizarChecklist')
                    }}>
                    Salvar
                  </button>
                </div>
              </div>
            )}
          </div>
        }
        title={finalizado ? 'Checklist Finalizado' : 'Realizar Checklist'}>
        <h2 className="text-xl font-semibold text-center text-black transition-all animate-slide-up">
          {tituloChecklist}
        </h2>

        <div className="mt-6 transition-all animate-slide-up">
          <Subtitle
            title="Itens Pendetes"
            icon={<ListBullets size={20} className="text-black" />}
          />
          <div className="mt-4 space-y-4 max-h-[60vh] overflow-auto">
            {itens &&
              itens.map((item: ItensChecklistsType, index: number) => (
                <div
                  key={index}
                  onClick={() => {
                    if (!finalizado) changeItemChecklist(item)
                  }}
                  className={`cursor-pointer rounded-lg p-4 transition-all ${
                    item.iccheck ? 'bg-blue-300' : 'bg-gray-200'
                  }`}>
                  <div className="flex justify-between items-start">
                    <div className="w-full pr-2">
                      <p className="font-bold text-black">{item.ictitulo}</p>
                      <p className="mt-2 text-gray-700 text-sm">
                        {item.icdescricao}
                      </p>
                    </div>
                    {item.iccheck && <Check size={50} className="text-white" />}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </BaseLayout>

      <Modal htmlFor="modalFinalizarChecklist" name="Atenção" loading={false}>
        <p className="text-lg text-center mt-4 text-black">
          Finalizar este checklist agora?
        </p>
        <div className="mt-6 flex justify-center items-center gap-3 w-full">
          <button
            className="bg-red-600 text-white py-2 rounded-xl font-bold w-full"
            onClick={() => finalizarChecklist(false)}>
            Não
          </button>
          <button
            className="bg-green-600 text-white py-2 rounded-xl font-bold w-full"
            onClick={() => finalizarChecklist(true)}>
            Sim
          </button>
        </div>
      </Modal>
    </div>
  )
}
