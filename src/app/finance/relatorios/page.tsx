'use client'
import { AuthUser } from '@/services/auth'
import React, { useState } from 'react'
import BaseLayout from '@/templates/BaseLayout'
import {
  ChartBar,
  Download,
  ArrowUp,
  ArrowDown,
  Faders,
  ChartPieSlice
} from '@phosphor-icons/react'
import {
  AreaChart,
  Area,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar
} from 'recharts'

/**
 * Página de relatórios financeiros
 * @description Interface completa para visualização de relatórios e análises financeiras
 * @author Sistema
 */
export default function Relatorios() {
  AuthUser()
  const [periodo, setPeriodo] = useState('30')
  const [tipoRelatorio, setTipoRelatorio] = useState('resumo')

  // Dados mockados para demonstração
  const dadosResumo = [
    { mes: 'Jan', receitas: 8500, despesas: 6230, saldo: 2270 },
    { mes: 'Fev', receitas: 9200, despesas: 5800, saldo: 3400 },
    { mes: 'Mar', receitas: 7800, despesas: 7200, saldo: 600 },
    { mes: 'Abr', receitas: 8800, despesas: 6500, saldo: 2300 },
    { mes: 'Mai', receitas: 9500, despesas: 7100, saldo: 2400 },
    { mes: 'Jun', receitas: 8200, despesas: 6800, saldo: 1400 }
  ]

  const dadosCategorias = [
    { categoria: 'Alimentação', valor: 1850, cor: '#DC2626' },
    { categoria: 'Transporte', valor: 980, cor: '#EA580C' },
    { categoria: 'Moradia', valor: 2200, cor: '#C2410C' },
    { categoria: 'Saúde', valor: 650, cor: '#BE123C' },
    { categoria: 'Lazer', valor: 550, cor: '#7C3AED' },
    { categoria: 'Educação', valor: 400, cor: '#9333EA' },
    { categoria: 'Outros', valor: 320, cor: '#6B7280' }
  ]

  const dadosComparativo = [
    { mes: 'Jan', orcado: 6000, realizado: 6230, diferenca: -230 },
    { mes: 'Fev', orcado: 6200, realizado: 5800, diferenca: 400 },
    { mes: 'Mar', orcado: 6500, realizado: 7200, diferenca: -700 },
    { mes: 'Abr', orcado: 6300, realizado: 6500, diferenca: -200 },
    { mes: 'Mai', orcado: 6800, realizado: 7100, diferenca: -300 },
    { mes: 'Jun', orcado: 6500, realizado: 6800, diferenca: -300 }
  ]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-600">{entry.name}:</span>
              <span className="font-medium text-gray-900">
                {formatCurrency(entry.value)}
              </span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  const PieCustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0]
      const total = dadosCategorias.reduce((sum, item) => sum + item.valor, 0)
      const percentage = ((data.value / total) * 100).toFixed(1)
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-2">{data.name}</p>
          <p className="text-sm text-gray-600">
            Valor: {formatCurrency(data.value)}
          </p>
          <p className="text-sm text-gray-600">Porcentagem: {percentage}%</p>
        </div>
      )
    }
    return null
  }

  return (
    <BaseLayout title="Relatórios Financeiros">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="md:flex md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Relatórios 📊
              </h1>
              <p className="text-gray-600 text-lg">
                Análises detalhadas das suas finanças
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <select
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="7">Últimos 7 dias</option>
                <option value="30">Últimos 30 dias</option>
                <option value="90">Últimos 3 meses</option>
                <option value="365">Último ano</option>
              </select>

              <button className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                <Download size={16} />
                <span>Exportar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filtros de Relatório */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-4">
            <Faders size={20} className="text-gray-400" />
            <div className="flex space-x-2">
              {[
                {
                  id: 'resumo',
                  label: 'Resumo Geral',
                  icon: <ChartBar size={16} />
                },
                {
                  id: 'categorias',
                  label: 'Por Categoria',
                  icon: <ChartPieSlice size={16} />
                },
                {
                  id: 'comparativo',
                  label: 'Orçado vs Realizado',
                  icon: <ChartBar size={16} />
                },
                {
                  id: 'tendencias',
                  label: 'Tendências',
                  icon: <ArrowUp size={16} />
                }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTipoRelatorio(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    tipoRelatorio === item.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}>
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Relatório de Resumo */}
        {tipoRelatorio === 'resumo' && (
          <div className="space-y-8">
            {/* Métricas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium mb-1">Total Receitas</h3>
                    <p className="text-3xl font-bold">
                      {formatCurrency(51800)}
                    </p>
                    <p className="text-green-100 text-sm">
                      +12% vs período anterior
                    </p>
                  </div>
                  <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                    <ArrowUp size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium mb-1">Total Despesas</h3>
                    <p className="text-3xl font-bold">
                      {formatCurrency(39630)}
                    </p>
                    <p className="text-red-100 text-sm">
                      +8% vs período anterior
                    </p>
                  </div>
                  <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                    <ArrowDown size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium mb-1">Saldo Total</h3>
                    <p className="text-3xl font-bold">
                      {formatCurrency(12170)}
                    </p>
                    <p className="text-blue-100 text-sm">
                      +15% vs período anterior
                    </p>
                  </div>
                  <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                    <ChartBar size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium mb-1">
                      Margem de Lucro
                    </h3>
                    <p className="text-3xl font-bold">23.5%</p>
                    <p className="text-purple-100 text-sm">
                      +2.1% vs período anterior
                    </p>
                  </div>
                  <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                    <ChartPieSlice size={24} />
                  </div>
                </div>
              </div>
            </div>

            {/* Gráfico de Evolução */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Evolução Financeira
                </h3>
                <p className="text-sm text-gray-600">
                  Receitas e despesas dos últimos 6 meses
                </p>
              </div>

              <ResponsiveContainer width="100%" height={400}>
                <AreaChart
                  data={dadosResumo}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient
                      id="colorReceitas"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#10B981"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorDespesas"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#EF4444"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="mes" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" tickFormatter={formatCurrency} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="receitas"
                    stroke="#10B981"
                    fillOpacity={1}
                    fill="url(#colorReceitas)"
                    name="Receitas"
                  />
                  <Area
                    type="monotone"
                    dataKey="despesas"
                    stroke="#EF4444"
                    fillOpacity={1}
                    fill="url(#colorDespesas)"
                    name="Despesas"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Relatório por Categorias */}
        {tipoRelatorio === 'categorias' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Distribuição por Categoria
                </h3>
                <p className="text-sm text-gray-600">
                  Gastos por categoria no período selecionado
                </p>
              </div>

              <ResponsiveContainer width="100%" height={400}>
                <RechartsPieChart>
                  <Pie
                    data={dadosCategorias}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${
                        percent !== undefined ? (percent * 100).toFixed(0) : '0'
                      }%`
                    }
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="valor">
                    {dadosCategorias.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.cor} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieCustomTooltip />} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Ranking de Categorias
                </h3>
                <p className="text-sm text-gray-600">
                  Categorias com maior gasto
                </p>
              </div>

              <div className="space-y-4">
                {dadosCategorias
                  .sort((a, b) => b.valor - a.valor)
                  .map((categoria, index) => (
                    <div
                      key={categoria.categoria}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-gray-600">
                            {index + 1}
                          </span>
                        </div>
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: categoria.cor }}
                        />
                        <span className="font-medium text-gray-900">
                          {categoria.categoria}
                        </span>
                      </div>
                      <span className="font-bold text-gray-900">
                        {formatCurrency(categoria.valor)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Relatório Comparativo */}
        {tipoRelatorio === 'comparativo' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Orçado vs Realizado
              </h3>
              <p className="text-sm text-gray-600">
                Comparação entre valores orçados e gastos reais
              </p>
            </div>

            <ResponsiveContainer width="100%" height={400}>
              <RechartsBarChart
                data={dadosComparativo}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis tickFormatter={formatCurrency} />
                <Tooltip
                  formatter={(value) => formatCurrency(value as number)}
                />
                <Legend />
                <Bar dataKey="orcado" fill="#3B82F6" name="Orçado" />
                <Bar dataKey="realizado" fill="#EF4444" name="Realizado" />
              </RechartsBarChart>
            </ResponsiveContainer>

            {/* Resumo do Comparativo */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-xl p-4">
                <h4 className="font-medium text-blue-900 mb-2">
                  Economia Total
                </h4>
                <p className="text-2xl font-bold text-blue-700">
                  {formatCurrency(
                    dadosComparativo.reduce(
                      (sum, item) => sum + item.diferenca,
                      0
                    )
                  )}
                </p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <h4 className="font-medium text-green-900 mb-2">
                  Meses com Economia
                </h4>
                <p className="text-2xl font-bold text-green-700">
                  {dadosComparativo.filter((item) => item.diferenca > 0).length}
                </p>
              </div>
              <div className="bg-red-50 rounded-xl p-4">
                <h4 className="font-medium text-red-900 mb-2">
                  Meses com Excesso
                </h4>
                <p className="text-2xl font-bold text-red-700">
                  {dadosComparativo.filter((item) => item.diferenca < 0).length}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Relatório de Tendências */}
        {tipoRelatorio === 'tendencias' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Tendência de Receitas
                </h3>
                <div className="flex items-center space-x-2 mb-2">
                  <ArrowUp size={20} className="text-green-600" />
                  <span className="text-green-600 font-medium">
                    Crescimento
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900">+12.5%</p>
                <p className="text-sm text-gray-600 mt-2">
                  Média de crescimento mensal
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Tendência de Despesas
                </h3>
                <div className="flex items-center space-x-2 mb-2">
                  <ArrowUp size={20} className="text-red-600" />
                  <span className="text-red-600 font-medium">Aumento</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">+8.2%</p>
                <p className="text-sm text-gray-600 mt-2">
                  Média de crescimento mensal
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Projeções
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Próximo Mês</p>
                  <p className="text-xl font-bold text-gray-900">R$ 9.850</p>
                  <p className="text-xs text-green-600">Receita projetada</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Próximo Mês</p>
                  <p className="text-xl font-bold text-gray-900">R$ 7.680</p>
                  <p className="text-xs text-red-600">Despesa projetada</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Próximo Mês</p>
                  <p className="text-xl font-bold text-green-600">R$ 2.170</p>
                  <p className="text-xs text-green-600">Saldo projetado</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </BaseLayout>
  )
}
