'use client'
import { AuthUser } from '@/services/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UsuarioType } from '@/types/UsuariosType'
import { useRouter } from 'next/navigation'
import BaseLayout from '@/templates/BaseLayout'
import { ContasType } from '@/types/ContasType'
import {
  Plus,
  Bank,
  Pencil,
  Trash,
  Eye,
  CreditCard,
  PiggyBank,
  Wallet,
  Coins,
  CurrencyDollar,
  Building,
  TrendUp
} from '@phosphor-icons/react'
import Modal from '@/components/Modal'
import Input from '@/components/Input'
import Select from '@/components/Select'
import { Button } from '@/components/Button'

export default function ContasPage() {
  AuthUser()
  const router = useRouter()
  const dispatch = useDispatch()
  const user: UsuarioType = useSelector((state: any) => state.userReducer)

  const [contas, setContas] = useState<ContasType[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingConta, setEditingConta] = useState<ContasType | null>(null)
  const [formData, setFormData] = useState({
    ctconta: '',
    cttipoconta: 'CORRENTE',
    ctsaldo: 0,
    ctsaldoInicial: 0,
    ctlimiteCredito: 0,
    ctobservacao: '',
    ctcor: '#3B82F6'
  })

  const tiposConta = [
    { value: 'CORRENTE', label: 'Conta Corrente' },
    { value: 'POUPANCA', label: 'Poupança' },
    { value: 'SALARIO', label: 'Conta Salário' },
    { value: 'INVESTIMENTO', label: 'Investimento' },
    { value: 'CARTAO_CREDITO', label: 'Cartão de Crédito' },
    { value: 'CARTAO_DEBITO', label: 'Cartão de Débito' },
    { value: 'DINHEIRO', label: 'Dinheiro' },
    { value: 'OUTRO', label: 'Outro' }
  ]

  const cores = [
    { value: '#3B82F6', label: 'Azul' },
    { value: '#EF4444', label: 'Vermelho' },
    { value: '#10B981', label: 'Verde' },
    { value: '#F59E0B', label: 'Amarelo' },
    { value: '#8B5CF6', label: 'Roxo' },
    { value: '#EC4899', label: 'Rosa' },
    { value: '#6B7280', label: 'Cinza' },
    { value: '#F97316', label: 'Laranja' }
  ]

  const getIconeTipoConta = (tipo: string) => {
    switch (tipo) {
      case 'CORRENTE':
        return <Bank size={20} />
      case 'POUPANCA':
        return <PiggyBank size={20} />
      case 'SALARIO':
        return <Wallet size={20} />
      case 'INVESTIMENTO':
        return <TrendUp size={20} />
      case 'CARTAO_CREDITO':
      case 'CARTAO_DEBITO':
        return <CreditCard size={20} />
      case 'DINHEIRO':
        return <Coins size={20} />
      default:
        return <Building size={20} />
    }
  }

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const loadContas = async () => {
    try {
      setLoading(true)
      // const response = await FinanceService.getContas()
      // setContas(response.data || [])
    } catch (error) {
      console.error('Erro ao carregar contas:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadContas()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingConta) {
        // await FinanceService.updateConta({
        //   ...editingConta,
        //   ...formData
        // })
      } else {
        // await FinanceService.createConta(formData)
      }

      setShowModal(false)
      setEditingConta(null)
      setFormData({
        ctconta: '',
        cttipoconta: 'CORRENTE',
        ctsaldo: 0,
        ctsaldoInicial: 0,
        ctlimiteCredito: 0,
        ctobservacao: '',
        ctcor: '#3B82F6'
      })
      loadContas()
    } catch (error) {
      console.error('Erro ao salvar conta:', error)
    }
  }

  const handleEdit = (conta: ContasType) => {
    setEditingConta(conta)
    setFormData({
      ctconta: conta.ctconta,
      cttipoconta: conta.cttipoconta,
      ctsaldo: conta.ctsaldo || 0,
      ctsaldoInicial: conta.ctsaldoInicial || 0,
      ctlimiteCredito: conta.ctlimiteCredito || 0,
      ctobservacao: conta.ctobservacao || '',
      ctcor: conta.ctcor || '#3B82F6'
    })
    setShowModal(true)
  }

  const handleDelete = async (codigo: string) => {
    if (confirm('Tem certeza que deseja desativar esta conta?')) {
      try {
        // await FinanceService.deleteConta(codigo)
        loadContas()
      } catch (error) {
        console.error('Erro ao deletar conta:', error)
      }
    }
  }

  const saldoTotal = contas.reduce(
    (total, conta) => total + (conta.ctsaldo || 0),
    0
  )

  return (
    <BaseLayout title="Contas">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Minhas Contas</h1>
            <p className="text-gray-600">Gerencie suas contas bancárias</p>
          </div>
          <Button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus size={20} />
            Nova Conta
          </Button>
        </div>

        {/* Resumo */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Saldo Total</p>
              <p className="text-3xl font-bold">{formatCurrency(saldoTotal)}</p>
              <p className="text-blue-100 text-sm">
                {contas.length} conta{contas.length !== 1 ? 's' : ''}
              </p>
            </div>
            <Bank size={48} className="text-blue-200" />
          </div>
        </div>

        {/* Lista de Contas */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-6 shadow-md animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contas.map((conta) => (
              <div
                key={conta.ctcodigo}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        backgroundColor: conta.ctcor || '#3B82F6'
                      }}></div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {conta.ctconta}
                      </h3>
                      <div className="flex items-center space-x-2 text-gray-500">
                        {getIconeTipoConta(conta.cttipoconta)}
                        <span className="text-sm">
                          {
                            tiposConta.find(
                              (t) => t.value === conta.cttipoconta
                            )?.label
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(conta)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(conta.ctcodigo!)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                      <Trash size={16} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saldo:</span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(conta.ctsaldo || 0)}
                    </span>
                  </div>
                  {conta.ctlimiteCredito && conta.ctlimiteCredito > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Limite:</span>
                      <span className="text-gray-900">
                        {formatCurrency(conta.ctlimiteCredito)}
                      </span>
                    </div>
                  )}
                  {conta.ctobservacao && (
                    <div className="text-sm text-gray-500 mt-2">
                      {conta.ctobservacao}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && contas.length === 0 && (
          <div className="text-center py-12">
            <Bank size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma conta encontrada
            </h3>
            <p className="text-gray-600 mb-4">
              Comece criando sua primeira conta bancária
            </p>
            <Button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus size={20} />
              Criar Primeira Conta
            </Button>
          </div>
        )}
      </div>

      {/* Modal de Criação/Edição */}
      <Modal
        title={editingConta ? 'Editar Conta' : 'Nova Conta'}
        htmlFor={''}
        name={''}
        loading={false}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={formData.ctconta}
            onChange={(e) =>
              setFormData({ ...formData, ctconta: e.target.value })
            }
            required
          />

          <Select
            value={formData.cttipoconta}
            onChange={(e) =>
              setFormData({ ...formData, cttipoconta: e.target.value })
            }
            options={tiposConta}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              step="0.01"
              value={formData.ctsaldo}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  ctsaldo: parseFloat(e.target.value) || 0
                })
              }
              required
            />

            <Input
              type="number"
              step="0.01"
              value={formData.ctsaldoInicial}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  ctsaldoInicial: parseFloat(e.target.value) || 0
                })
              }
            />
          </div>

          <Input
            type="number"
            step="0.01"
            value={formData.ctlimiteCredito}
            onChange={(e) =>
              setFormData({
                ...formData,
                ctlimiteCredito: parseFloat(e.target.value) || 0
              })
            }
          />

          <Select
            value={formData.ctcor}
            onChange={(e) =>
              setFormData({ ...formData, ctcor: e.target.value })
            }
            options={cores}
          />

          <Input
            value={formData.ctobservacao}
            onChange={(e) =>
              setFormData({ ...formData, ctobservacao: e.target.value })
            }
            placeholder="Ex: Conta principal do banco"
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              onClick={() => setShowModal(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700">
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white">
              {editingConta ? 'Atualizar' : 'Criar'} Conta
            </Button>
          </div>
        </form>
      </Modal>
    </BaseLayout>
  )
}
