'use client'
import { AuthUser } from '@/services/auth'
import React, { useState, useEffect } from 'react'
import BaseLayout from '@/templates/BaseLayout'
import ModalCadastroConta from './_components/ModalCadastroConta'
import { ContasType } from '@/types/ContasType'
import { TipoContasEnum } from '@/enums/TipoContasEnum'
import {
  Plus,
  Wallet,
  CreditCard,
  PiggyBank,
  Eye,
  Pencil,
  Trash,
  Bank,
  CurrencyDollar
} from '@phosphor-icons/react'

/**
 * Página de gerenciamento de contas bancárias
 * @description Interface completa para CRUD de contas financeiras
 * @author Sistema
 */
export default function Contas() {
  AuthUser()
  const [contas, setContas] = useState<ContasType[]>([])
  const [showModal, setShowModal] = useState(false)
  const [contaEditando, setContaEditando] = useState<ContasType | null>(null)

  // Dados mockados para demonstração
  useEffect(() => {
    const contasMockadas: ContasType[] = [
      {
        ctcodigo: '1',
        ctnome: 'Conta Corrente Principal',
        cttitular: 'user1',
        ctsaldo: '5420.50',
        ctbanco: '001',
        cttipoconta: 'CORRENTE',
        ctlimite: '5000.00',
        ctdescricao: 'Conta principal para recebimentos',
        ctcor: '#3B82F6',
        ctativo: true
      },
      {
        ctcodigo: '2',
        ctnome: 'Poupança',
        cttitular: 'user1',
        ctsaldo: '8500.00',
        ctbanco: '001',
        cttipoconta: 'POUPANCA',
        ctdescricao: 'Reserva de emergência',
        ctcor: '#10B981',
        ctativo: true
      },
      {
        ctcodigo: '3',
        ctnome: 'Cartão de Crédito',
        cttitular: 'user1',
        ctsaldo: '-1500.75',
        ctbanco: '001',
        cttipoconta: 'CORRENTE',
        ctlimite: '8000.00',
        ctdescricao: 'Cartão principal para compras',
        ctcor: '#EF4444',
        ctativo: true
      }
    ]
    setContas(contasMockadas)
  }, [])

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
    setContaEditando(null)
    setShowModal(true)
  }

  const handleEditarConta = (conta: ContasType) => {
    setContaEditando(conta)
    setShowModal(true)
  }

  const handleExcluirConta = (conta: ContasType) => {
    if (confirm(`Tem certeza que deseja excluir a conta "${conta.ctnome}"?`)) {
      setContas(contas.filter((c) => c.ctcodigo !== conta.ctcodigo))
    }
  }

  const handleSalvarConta = (novaConta: ContasType) => {
    if (contaEditando) {
      // Editar conta existente
      setContas(
        contas.map((c) =>
          c.ctcodigo === contaEditando.ctcodigo
            ? { ...novaConta, ctcodigo: contaEditando.ctcodigo }
            : c
        )
      )
    } else {
      // Nova conta
      const contaComId = { ...novaConta, ctcodigo: Date.now().toString() }
      setContas([...contas, contaComId])
    }
    setShowModal(false)
    setContaEditando(null)
  }

  const saldoTotal = contas.reduce((total, conta) => {
    return total + parseFloat(conta.ctsaldo)
  }, 0)

  return (
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
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: conta.ctcor + '20' }}>
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
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleExcluirConta(conta)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors">
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

                {conta.ctlimite && (
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-600">Limite disponível</p>
                    <p className="text-lg font-medium text-gray-900">
                      {formatCurrency(
                        (
                          parseFloat(conta.ctlimite) + parseFloat(conta.ctsaldo)
                        ).toString()
                      )}
                    </p>
                  </div>
                )}

                {conta.ctdescricao && (
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-600">{conta.ctdescricao}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      conta.ctativo
                        ? 'text-green-700 bg-green-100'
                        : 'text-red-700 bg-red-100'
                    }`}>
                    {conta.ctativo ? 'Ativa' : 'Inativa'}
                  </span>
                  <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                    <Eye size={14} />
                    <span>Ver detalhes</span>
                  </button>
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

        {/* Modal */}
        {showModal && (
          <ModalCadastroConta
            conta={contaEditando}
            onSave={handleSalvarConta}
            onClose={() => {
              setShowModal(false)
              setContaEditando(null)
            }}
          />
        )}
      </div>
    </BaseLayout>
  )
}
