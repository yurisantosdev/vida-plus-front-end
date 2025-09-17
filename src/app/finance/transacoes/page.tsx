'use client'
import { AuthUser } from '@/services/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UsuarioType } from '@/types/UsuarioType'
import { useRouter } from 'next/navigation'
import BaseLayout from '@/templates/BaseLayout'
import { FinanceService } from '@/services/finance'
import { TransacoesType } from '@/types/TransacoesType'
import {
  Plus,
  Receipt,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Bank,
  MagnifyingGlass,
  Funnel
} from '@phosphor-icons/react'
import { Button } from '@/components/Button'

export default function TransacoesPage() {
  AuthUser()
  const router = useRouter()
  const dispatch = useDispatch()
  const user: UsuarioType = useSelector((state: any) => state.userReducer)

  const [transacoes, setTransacoes] = useState<TransacoesType[]>([])
  const [loading, setLoading] = useState(true)
  const [filtros, setFiltros] = useState({
    tipo: '',
    dataInicio: '',
    dataFim: ''
  })

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const getTipoTransacao = (tipo: string) => {
    switch (tipo) {
      case 'RECEITA':
        return {
          label: 'Receita',
          color: 'text-green-600',
          bgColor: 'bg-green-100'
        }
      case 'DESPESA':
        return {
          label: 'Despesa',
          color: 'text-red-600',
          bgColor: 'bg-red-100'
        }
      case 'TRANSFERENCIA':
        return {
          label: 'Transferência',
          color: 'text-blue-600',
          bgColor: 'bg-blue-100'
        }
      case 'INVESTIMENTO':
        return {
          label: 'Investimento',
          color: 'text-purple-600',
          bgColor: 'bg-purple-100'
        }
      default:
        return {
          label: 'Outro',
          color: 'text-gray-600',
          bgColor: 'bg-gray-100'
        }
    }
  }

  const loadTransacoes = async () => {
    try {
      setLoading(true)
      const response = await FinanceService.getTransacoes(filtros)
      setTransacoes(response.data || [])
    } catch (error) {
      console.error('Erro ao carregar transações:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTransacoes()
  }, [filtros])

  const totalReceitas = transacoes
    .filter((t) => t.tstipo === 'RECEITA')
    .reduce((total, t) => total + t.tsvalor, 0)

  const totalDespesas = transacoes
    .filter((t) => t.tstipo === 'DESPESA')
    .reduce((total, t) => total + t.tsvalor, 0)

  const saldo = totalReceitas - totalDespesas

  return (
    <BaseLayout title="Transações">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Transações</h1>
            <p className="text-gray-600">
              Histórico de movimentações financeiras
            </p>
          </div>
          <Button
            onClick={() => router.push('/finance/transacoes/nova')}
            className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus size={20} />
            Nova Transação
          </Button>
        </div>

        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Receitas</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(totalReceitas)}
                </p>
              </div>
              <ArrowUpRight size={32} className="text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">Despesas</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(totalDespesas)}
                </p>
              </div>
              <ArrowDownRight size={32} className="text-red-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Saldo</p>
                <p className="text-2xl font-bold">{formatCurrency(saldo)}</p>
              </div>
              <Receipt size={32} className="text-blue-200" />
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg p-4 shadow-md">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Funnel size={20} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Filtros:
              </span>
            </div>

            <select
              value={filtros.tipo}
              onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option value="">Todos os tipos</option>
              <option value="RECEITA">Receitas</option>
              <option value="DESPESA">Despesas</option>
              <option value="TRANSFERENCIA">Transferências</option>
              <option value="INVESTIMENTO">Investimentos</option>
            </select>

            <input
              type="date"
              value={filtros.dataInicio}
              onChange={(e) =>
                setFiltros({ ...filtros, dataInicio: e.target.value })
              }
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              placeholder="Data início"
            />

            <input
              type="date"
              value={filtros.dataFim}
              onChange={(e) =>
                setFiltros({ ...filtros, dataFim: e.target.value })
              }
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              placeholder="Data fim"
            />
          </div>
        </div>

        {/* Lista de Transações */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-4 shadow-md animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {transacoes.map((transacao) => {
              const tipoInfo = getTipoTransacao(transacao.tstipo)
              return (
                <div
                  key={transacao.tscodigo}
                  className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${tipoInfo.bgColor}`}>
                        {transacao.tstipo === 'RECEITA' ? (
                          <ArrowUpRight size={20} className={tipoInfo.color} />
                        ) : (
                          <ArrowDownRight
                            size={20}
                            className={tipoInfo.color}
                          />
                        )}
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {transacao.tstitulo}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${tipoInfo.bgColor} ${tipoInfo.color}`}>
                            {tipoInfo.label}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>{formatDate(transacao.tsquando)}</span>
                          </div>
                          {transacao.conta && (
                            <div className="flex items-center space-x-1">
                              <Bank size={14} />
                              <span>{transacao.conta.ctconta}</span>
                            </div>
                          )}
                        </div>
                        {transacao.tsdescricao && (
                          <p className="text-sm text-gray-600 mt-1">
                            {transacao.tsdescricao}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <p className={`text-lg font-bold ${tipoInfo.color}`}>
                        {transacao.tstipo === 'RECEITA' ? '+' : '-'}
                        {formatCurrency(transacao.tsvalor)}
                      </p>
                      {transacao.tsstatus && (
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            transacao.tsstatus === 'CONFIRMADA'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                          {transacao.tsstatus}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {!loading && transacoes.length === 0 && (
          <div className="text-center py-12">
            <Receipt size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma transação encontrada
            </h3>
            <p className="text-gray-600 mb-4">
              {Object.values(filtros).some((f) => f)
                ? 'Tente ajustar os filtros ou criar uma nova transação'
                : 'Comece registrando sua primeira transação'}
            </p>
            <Button
              onClick={() => router.push('/finance/transacoes/nova')}
              className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus size={20} />
              Nova Transação
            </Button>
          </div>
        )}
      </div>
    </BaseLayout>
  )
}
