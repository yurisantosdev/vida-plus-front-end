'use client'
import { AuthUser } from '@/services/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UsuarioType } from '@/types/UsuarioType'
import { useRouter } from 'next/navigation'
import BaseLayout from '@/templates/BaseLayout'
import { FinanceService } from '@/services/finance'
import { TransacoesType } from '@/types/TransacoesType'
import { ContasType } from '@/types/ContasType'
import {
  ChartBar,
  TrendingUp,
  TrendingDown,
  Calendar,
  Bank,
  PiggyBank,
  Wallet,
  Coins,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Eye
} from '@phosphor-icons/react'
import { Button } from '@/components/Button'

export default function RelatoriosPage() {
  AuthUser()
  const router = useRouter()
  const dispatch = useDispatch()
  const user: UsuarioType = useSelector((state: any) => state.userReducer)

  const [transacoes, setTransacoes] = useState<TransacoesType[]>([])
  const [contas, setContas] = useState<ContasType[]>([])
  const [loading, setLoading] = useState(true)
  const [periodo, setPeriodo] = useState('mes')

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const loadData = async () => {
    try {
      setLoading(true)

      // Carregar contas
      const contasResponse = await FinanceService.getContas()
      setContas(contasResponse.data || [])

      // Carregar transações do período
      const hoje = new Date()
      let dataInicio: Date

      switch (periodo) {
        case 'semana':
          dataInicio = new Date(hoje.getTime() - 7 * 24 * 60 * 60 * 1000)
          break
        case 'mes':
          dataInicio = new Date(hoje.getFullYear(), hoje.getMonth(), 1)
          break
        case 'trimestre':
          dataInicio = new Date(
            hoje.getFullYear(),
            Math.floor(hoje.getMonth() / 3) * 3,
            1
          )
          break
        case 'ano':
          dataInicio = new Date(hoje.getFullYear(), 0, 1)
          break
        default:
          dataInicio = new Date(hoje.getFullYear(), hoje.getMonth(), 1)
      }

      const transacoesResponse = await FinanceService.getTransacoes({
        dataInicio: dataInicio.toISOString(),
        dataFim: hoje.toISOString()
      })
      setTransacoes(transacoesResponse.data || [])
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [periodo])

  // Cálculos
  const totalReceitas = transacoes
    .filter((t) => t.tstipo === 'RECEITA')
    .reduce((total, t) => total + t.tsvalor, 0)

  const totalDespesas = transacoes
    .filter((t) => t.tstipo === 'DESPESA')
    .reduce((total, t) => total + t.tsvalor, 0)

  const saldo = totalReceitas - totalDespesas
  const saldoTotal = contas.reduce(
    (total, conta) => total + (conta.ctsaldo || 0),
    0
  )

  // Análise por categoria
  const analisePorCategoria = transacoes.reduce((acc, transacao) => {
    const categoria = transacao.categoria?.ctcategoria || 'Sem categoria'
    if (!acc[categoria]) {
      acc[categoria] = { receitas: 0, despesas: 0 }
    }

    if (transacao.tstipo === 'RECEITA') {
      acc[categoria].receitas += transacao.tsvalor
    } else if (transacao.tstipo === 'DESPESA') {
      acc[categoria].despesas += transacao.tsvalor
    }

    return acc
  }, {} as Record<string, { receitas: number; despesas: number }>)

  // Top 5 categorias de despesas
  const topDespesas = Object.entries(analisePorCategoria)
    .map(([categoria, dados]) => ({
      categoria,
      valor: dados.despesas
    }))
    .filter((item) => item.valor > 0)
    .sort((a, b) => b.valor - a.valor)
    .slice(0, 5)

  // Análise por conta
  const analisePorConta = contas.map((conta) => {
    const transacoesConta = transacoes.filter(
      (t) => t.tsconta === conta.ctcodigo
    )
    const receitas = transacoesConta
      .filter((t) => t.tstipo === 'RECEITA')
      .reduce((total, t) => total + t.tsvalor, 0)
    const despesas = transacoesConta
      .filter((t) => t.tstipo === 'DESPESA')
      .reduce((total, t) => total + t.tsvalor, 0)

    return {
      conta: conta.ctconta,
      saldo: conta.ctsaldo || 0,
      receitas,
      despesas,
      cor: conta.ctcor || '#3B82F6'
    }
  })

  return (
    <BaseLayout title="Relatórios">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Relatórios Financeiros
            </h1>
            <p className="text-gray-600">
              Análises e insights sobre suas finanças
            </p>
          </div>
          <div className="flex space-x-3">
            <select
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option value="semana">Última Semana</option>
              <option value="mes">Este Mês</option>
              <option value="trimestre">Este Trimestre</option>
              <option value="ano">Este Ano</option>
            </select>
            <Button
              onClick={() => window.print()}
              className="bg-green-600 hover:bg-green-700 text-white">
              <Download size={20} />
              Exportar
            </Button>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Saldo Total</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(saldoTotal)}
                </p>
              </div>
              <Bank size={32} className="text-blue-200" />
            </div>
          </div>

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

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Resultado</p>
                <p
                  className={`text-2xl font-bold ${
                    saldo >= 0 ? 'text-green-300' : 'text-red-300'
                  }`}>
                  {formatCurrency(saldo)}
                </p>
              </div>
              <ChartBar size={32} className="text-purple-200" />
            </div>
          </div>
        </div>

        {/* Gráficos e Análises */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Análise por Conta */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Análise por Conta
            </h3>
            <div className="space-y-4">
              {analisePorConta.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.cor }}></div>
                    <div>
                      <p className="font-medium text-gray-900">{item.conta}</p>
                      <p className="text-sm text-gray-500">
                        {formatCurrency(item.receitas)} /{' '}
                        {formatCurrency(item.despesas)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(item.saldo)}
                    </p>
                    <p
                      className={`text-sm ${
                        item.receitas > item.despesas
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}>
                      {item.receitas > item.despesas ? 'Positivo' : 'Negativo'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Despesas */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Top 5 Despesas por Categoria
            </h3>
            <div className="space-y-4">
              {topDespesas.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-semibold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {item.categoria}
                      </p>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{
                            width: `${
                              (item.valor /
                                Math.max(...topDespesas.map((d) => d.valor))) *
                              100
                            }%`
                          }}></div>
                      </div>
                    </div>
                  </div>
                  <p className="font-semibold text-red-600">
                    {formatCurrency(item.valor)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resumo de Transações */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Resumo de Transações
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Data
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Descrição
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Categoria
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Conta
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    Valor
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-700">
                    Tipo
                  </th>
                </tr>
              </thead>
              <tbody>
                {transacoes.slice(0, 10).map((transacao) => (
                  <tr
                    key={transacao.tscodigo}
                    className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {formatDate(transacao.tsquando)}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-900">
                        {transacao.tstitulo}
                      </p>
                      {transacao.tsdescricao && (
                        <p className="text-sm text-gray-500">
                          {transacao.tsdescricao}
                        </p>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {transacao.categoria?.ctcategoria || 'Sem categoria'}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {transacao.conta?.ctconta || 'N/A'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`font-semibold ${
                          transacao.tstipo === 'RECEITA'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}>
                        {transacao.tstipo === 'RECEITA' ? '+' : '-'}
                        {formatCurrency(transacao.tsvalor)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          transacao.tstipo === 'RECEITA'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                        {transacao.tstipo}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {transacoes.length > 10 && (
            <div className="mt-4 text-center">
              <Button
                onClick={() => router.push('/finance/transacoes')}
                className="bg-blue-600 hover:bg-blue-700 text-white">
                <Eye size={20} />
                Ver Todas as Transações
              </Button>
            </div>
          )}
        </div>

        {/* Insights */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">💡 Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-indigo-100 mb-2">
                📈 Maior categoria de receita:
              </p>
              <p className="font-semibold">
                {Object.entries(analisePorCategoria)
                  .map(([categoria, dados]) => ({
                    categoria,
                    valor: dados.receitas
                  }))
                  .filter((item) => item.valor > 0)
                  .sort((a, b) => b.valor - a.valor)[0]?.categoria || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-indigo-100 mb-2">
                📉 Maior categoria de despesa:
              </p>
              <p className="font-semibold">
                {topDespesas[0]?.categoria || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-indigo-100 mb-2">💰 Conta com maior saldo:</p>
              <p className="font-semibold">
                {analisePorConta.sort((a, b) => b.saldo - a.saldo)[0]?.conta ||
                  'N/A'}
              </p>
            </div>
            <div>
              <p className="text-indigo-100 mb-2">📊 Total de transações:</p>
              <p className="font-semibold">{transacoes.length}</p>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}
