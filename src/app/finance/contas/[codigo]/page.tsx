'use client'
import { AuthUser } from '@/services/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UsuarioType } from '@/types/UsuariosType'
import { useRouter } from 'next/navigation'
import BaseLayout from '@/templates/BaseLayout'
import Subtitle from '@/components/Subtitle'
import { Info, Plus, Bank } from '@phosphor-icons/react'
import { Button } from '@/components/Button'
import { ContasType } from '@/types/ContasType'

interface PageProps {
  params: Promise<{ codigo: string }>
}

export default function Contas({ params }: PageProps) {
  AuthUser()

  const router = useRouter()
  const dispatch = useDispatch()
  const [ctcodigo, setCtcodigo] = useState<string>('')
  const user: UsuarioType = useSelector((state: any) => state.userReducer)
  const [contas, setContas] = useState<ContasType[]>()

  function carregarConta() {
    console.log(ctcodigo)
  }

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setCtcodigo(resolvedParams.codigo)
    }
    getParams()
  }, [params])

  useEffect(() => {
    if (ctcodigo) {
      carregarConta()
    }
  }, [ctcodigo])

  return (
    <BaseLayout
      title={ctcodigo == '0' ? 'Cadastro de Conta' : 'Editar Conta'}
      navbar={false}
      voltar>
      {/* Informações do Veículo */}
      <div className="transition-all animate-slide-up">
        <Subtitle
          title="Informações da conta"
          icon={<Bank size={20} className="text-black" />}
        />
      </div>
    </BaseLayout>
  )
}
