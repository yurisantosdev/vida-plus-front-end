'use client'
import { AuthUser } from '@/services/auth'
import React, { useState, useEffect } from 'react'
import BaseLayout from '@/templates/BaseLayout'
import ModalCadastroConta from './_components/ModalCadastroConta'
import { ContasType } from '@/types/ContasType'
import {
  Plus,
  Wallet,
  CreditCard,
  PiggyBank,
  Pencil,
  Trash,
  Bank,
  CurrencyDollar,
  X,
  Check
} from '@phosphor-icons/react'
import { CLickLabel } from '@/services/clickLabel'
import { consultarContasUsuario, deletarConta } from '@/store/Contas'
import { UsuariosType } from '@/types/UsuairosType'
import { useSelector } from 'react-redux'
import Modal from '@/components/Modal'
import toast from 'react-hot-toast'

export default function Contas() {
  AuthUser()
  const [contas, setContas] = useState<ContasType[]>([])
  const [contaEditando, setContaEditando] = useState<ContasType | null>(null)
  const user: UsuariosType = useSelector((state: any) => state.userReducer)
  const loading = useSelector((state: any) => state.loadingReducer.loading)
  const [contaDeletar, setContaDeletar] = useState<ContasType>()
  const [atualizar, setAtualizar] = useState<number>(0)
  const [novaConta, setNovaConta] = useState<boolean>(false)

  useEffect(() => {
    if (user.uscodigo) {
      const consultarDados = async () => {
        const response = await consultarContasUsuario(user.uscodigo)

        if (response != undefined) {
          setContas(response.contas)
        }
      }

      consultarDados()
    }
  }, [atualizar])

  const formatCurrency = (value: string) => {
    const numValue = parseFloat(value)
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numValue)
  }

  const getTipoContaIcon = (tipo: string) => {
    switch (tipo) {
      case 'CORRENTE':
        return <CreditCard size={20} className="text-blue-600" />
      case 'POUPANCA':
        return <PiggyBank size={20} className="text-green-600" />
      case 'SALARIO':
        return <CurrencyDollar size={20} className="text-purple-600" />
      default:
        return <Wallet size={20} className="text-gray-600" />
    }
  }

  const getTipoContaText = (tipo: string) => {
    switch (tipo) {
      case 'CORRENTE':
        return 'Conta Corrente'
      case 'POUPANCA':
        return 'Poupança'
      case 'SALARIO':
        return 'Conta Salário'
      default:
        return 'Conta'
    }
  }

  const handleNovaConta = () => {
    setNovaConta(true)
    CLickLabel('modalCadastroConta')
  }

  const handleEditarConta = (conta: ContasType) => {
    setNovaConta(false)
    setContaEditando(conta)
    setTimeout(() => {
      CLickLabel('modalCadastroConta')
    }, 0)
  }

  async function handleExcluirConta() {
    if (contaDeletar) {
      const response = await deletarConta(contaDeletar.ctcodigo)

      if (response != undefined) {
        toast.success('Conta deletada com sucesso!')
        CLickLabel('modalConfirmarDeletarConta')
        setAtualizar(atualizar + 1)
      }
    }
  }

  const handleSalvarConta = async () => {
    const response = await consultarContasUsuario(user.uscodigo)

    if (response != undefined) {
      setContas(response.contas)
    }

    setContaEditando(null)
  }

  const saldoTotal = contas.reduce((total, conta) => {
    return total + parseFloat(conta.ctsaldo)
  }, 0)

  return (
    <div>
      <BaseLayout title="Contas Bancárias">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="md:flex md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Minhas Contas 💳
                </h1>
                <p className="text-gray-600 text-lg">
                  Gerencie suas contas bancárias e cartões
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <button
                  onClick={handleNovaConta}
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors cursor-pointer">
                  <Plus size={20} />
                  <span>Nova Conta</span>
                </button>
              </div>
            </div>
          </div>

          {/* Resumo */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium mb-1">Saldo Total</h3>
                <p className="text-3xl font-bold">
                  {formatCurrency(saldoTotal.toString())}
                </p>
                <p className="text-blue-100 text-sm mt-1">
                  {contas.length} conta{contas.length !== 1 ? 's' : ''} ativa
                  {contas.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="p-4 bg-white bg-opacity-20 rounded-xl">
                <Bank size={32} className="text-black" />
              </div>
            </div>
          </div>

          {/* Lista de Contas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contas.map((conta) => (
              <div
                key={conta.ctcodigo}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg">
                      {getTipoContaIcon(conta.cttipoconta)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-gray-700">
                        {conta.ctnome}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {getTipoContaText(conta.cttipoconta)}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditarConta(conta)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer">
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setContaDeletar(conta)
                        CLickLabel('modalConfirmarDeletarConta')
                      }}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors cursor-pointer">
                      <Trash size={16} />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(conta.ctsaldo)}
                    </p>
                    <p className="text-sm text-gray-600">Saldo atual</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {contas.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet size={24} className="text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">
                Nenhuma conta cadastrada
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Comece adicionando sua primeira conta bancária
              </p>
              <button
                onClick={handleNovaConta}
                className="mt-4 inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
                <Plus size={20} />
                <span>Adicionar Conta</span>
              </button>
            </div>
          )}

          <ModalCadastroConta
            conta={contaEditando}
            onSave={handleSalvarConta}
            novaConta={!novaConta}
            onClose={() => {
              CLickLabel('modalCadastroConta')
              setContaEditando(null)
            }}
          />
        </div>
      </BaseLayout>

      <Modal
        htmlFor="modalConfirmarDeletarConta"
        name="Deletar conta"
        loading={loading}>
        <div className="flex flex-col items-start text-black space-y-2">
          <p className="indent-4">
            Ao deletar sua conta,{' '}
            <span className="font-bold">
              todas as suas informações serão removidas permanentemente
            </span>
            , incluindo dados pessoais, registros financeiros, contas bancárias
            vinculadas e históricos de uso.
          </p>
          <p>
            Após a exclusão,{' '}
            <span className="font-bold text-red-600">
              não será possível recuperar o acesso ou restaurar seus dados
            </span>
            .
          </p>
        </div>
        <p className="font-semibold text-black mt-2 text-center flex justify-center items-center">
          Deseja realmente continuar com a exclusão da conta?
        </p>

        <div className="flex justify-center items-center gap-3 mt-10">
          <button
            onClick={() => {
              CLickLabel('modalConfirmarDeletarConta')
            }}
            className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition-colors cursor-pointer">
            <X size={20} />
            <span>Cancelar</span>
          </button>

          <button
            onClick={() => {
              handleExcluirConta()
            }}
            className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors cursor-pointer">
            <Check size={20} />
            <span>Apagar</span>
          </button>
        </div>
      </Modal>
    </div>
  )
}
