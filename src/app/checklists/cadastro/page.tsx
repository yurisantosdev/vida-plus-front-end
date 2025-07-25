'use client'
import {
  updateChecklist,
  createChecklist,
  findChecklist
} from '@/store/Checklists'
import { ChecklistsType } from '@/types/ChecklistsType'
import { ItensChecklistsType } from '@/types/ItensChecklistsType'
import { UsuarioType } from '@/types/UsuariosType'
import { PlusCircle } from '@phosphor-icons/react'
import { Trash } from '@phosphor-icons/react/dist/ssr'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import BaseLayout from '@/templates/BaseLayout'

export default function CadastroChecklists() {
  const [tituloChecklist, setTituloChecklist] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const [ckcodigo, setCkcodigo] = useState<string | null>('')
  const [itens, setItens] = useState<ItensChecklistsType[]>()
  const user: UsuarioType = useSelector((state: any) => state.userReducer)
  const router = useRouter()

  function adicionarItem() {
    setItens((prev) =>
      prev
        ? [...prev, { ictitulo: '', icdescricao: '', iccheck: false }]
        : [{ ictitulo: '', icdescricao: '', iccheck: false }]
    )
  }

  function atualizarItem(
    index: number,
    campo: keyof ItensChecklistsType,
    valor: string
  ) {
    if (itens) {
      const novosItens: any = [...itens]
      novosItens[index][campo] = valor
      setItens(novosItens)
    }
  }

  function removerItem(index: number) {
    if (itens) {
      const novosItens = [...itens]
      novosItens.splice(index, 1)
      setItens(novosItens)
      toast.success('Item removido com sucesso!')
    }
  }

  async function salvarAtualizarChecklist() {
    setLoading(true)

    if (user.uscodigo) {
      if (tituloChecklist.trim().length === 0) {
        toast('Informe um título do checklist!')
        setLoading(false)
        return
      }

      if (!itens || itens.length === 0) {
        toast('Informe um item do checklist, pelo menos!')
        setLoading(false)
        return
      } else if (!validacaoItens()) {
        toast('Informe todos os campos obrigatórios!')
        setLoading(false)
        return
      }

      const dadosChecklist: ChecklistsType = {
        cktitulo: tituloChecklist,
        ckusuario: user.uscodigo,
        itensChecklists: itens,
        ...(ckcodigo ? { ckcodigo } : {})
      }

      const response = ckcodigo
        ? await updateChecklist(dadosChecklist)
        : await createChecklist(dadosChecklist)

      if (response !== undefined) {
        toast.success(
          ckcodigo
            ? 'Checklist atualizado com sucesso!'
            : 'Checklist registrado com sucesso!'
        )
        router.back()
      } else {
        setLoading(false)
      }
    }

    setLoading(false)
  }

  function validacaoItens() {
    return (
      itens?.every(
        (item) =>
          item.ictitulo.trim().length > 0 && item.icdescricao.trim().length > 0
      ) ?? false
    )
  }

  useEffect(() => {
    const consultaCodigoAtualizar = async () => {
      const codigoChecklist = localStorage.getItem('ckcodigo')

      if (codigoChecklist) {
        setCkcodigo(codigoChecklist)
        const respondeChecklist = await findChecklist(codigoChecklist)

        if (respondeChecklist) {
          const dadosChecklist: ChecklistsType = respondeChecklist.checklist
          setTituloChecklist(dadosChecklist.cktitulo)
          setItens(dadosChecklist.itensChecklists ?? [])
        }
      }
    }

    consultaCodigoAtualizar()
  }, [])

  return (
    <BaseLayout
      loading={loading}
      title={ckcodigo ? 'Atualizar Checklist' : 'Cadastro de Checklist'}
      voltar
      menu={false}
      extraComponent={
        <div className="absolute bottom-4 left-0 w-full px-4 transition-all animate-slide-up">
          <div className="space-y-3">
            <div className="flex gap-2">
              <button
                className="w-1/2 bg-red-600 text-white font-bold py-3 rounded-xl"
                onClick={() => router.back()}>
                Cancelar
              </button>
              <button
                className="w-1/2 bg-green-600 text-white font-bold py-3 rounded-xl"
                onClick={salvarAtualizarChecklist}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      }
      navbar={false}>
      <div className="w-full">
        <div className="mt-6 flex items-center justify-start gap-2">
          <p className=" text-lg font-bold text-neutral-700">
            Título do checklist
          </p>
          <p className=" text-red-700">*</p>
        </div>
        <input
          className="mb-4 w-full mt-1 rounded-lg border border-neutral-300 bg-neutral-100 p-3 text-neutral-900"
          placeholder="Ex: Checklist de limpeza"
          value={tituloChecklist}
          onChange={(e) => setTituloChecklist(e.target.value)}
        />

        <div className="mt-6 flex items-center justify-start gap-2">
          <p className=" text-lg font-bold text-neutral-700">
            Itens do checklist
          </p>
          <p className=" text-red-700">*</p>
        </div>

        <div className="max-h-[65%]">
          {itens?.map((item, index) => (
            <div
              key={index}
              className="mb-4 rounded-xl border border-neutral-300 bg-white p-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-base font-semibold text-neutral-800">
                  Item {index + 1}
                </p>

                <button onClick={() => removerItem(index)}>
                  <Trash size={20} color="#dc2626" />
                </button>
              </div>

              <div>
                <input
                  className="mb-4 mt-1 rounded-lg border border-neutral-300 bg-neutral-100 p-3 text-neutral-900 w-full"
                  placeholder="Título do item"
                  value={item.ictitulo}
                  onChange={(e) =>
                    atualizarItem(index, 'ictitulo', e.target.value)
                  }
                />
              </div>

              <div>
                <input
                  className="mb-4 mt-1 rounded-lg border border-neutral-300 bg-neutral-100 p-3 text-neutral-900 w-full"
                  placeholder="Descrição do item"
                  value={item.icdescricao}
                  onChange={(e) =>
                    atualizarItem(index, 'icdescricao', e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </div>

        <button
          className="mb-6 w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3"
          onClick={adicionarItem}>
          <PlusCircle size={20} />
          <p className="text-base font-semibold text-white">Adicionar item</p>
        </button>
      </div>
    </BaseLayout>
  )
}
