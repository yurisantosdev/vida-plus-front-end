'use client'
import React from 'react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import {
  GraficoTransacoesType,
  GraficoCategoriasType
} from '@/types/DashboardType'

interface DashboardChartsProps {
  dadosTransacoes: GraficoTransacoesType[]
  dadosCategorias: GraficoCategoriasType[]
}

/**
 * Componente para exibir os gráficos do dashboard
 * @description Renderiza gráficos de linha para transações e pizza para categorias
 * @param {GraficoTransacoesType[]} dadosTransacoes - Dados para o gráfico de transações
 * @param {GraficoCategoriasType[]} dadosCategorias - Dados para o gráfico de categorias
 * @author Sistema
 */
export default function DashboardCharts({
  dadosTransacoes,
  dadosCategorias
}: DashboardChartsProps) {
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
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-2">{data.name}</p>
          <p className="text-sm text-gray-600">
            Valor: {formatCurrency(data.value)}
          </p>
          <p className="text-sm text-gray-600">
            Porcentagem: {data.payload.porcentagem.toFixed(1)}%
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Gráfico de Transações */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Evolução Financeira
          </h3>
          <p className="text-sm text-gray-600">
            Receitas e despesas dos últimos 6 meses
          </p>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={dadosTransacoes}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorReceitas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorDespesas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorSaldo" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="data"
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatCurrency}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="receitas"
              stroke="#10B981"
              fillOpacity={1}
              fill="url(#colorReceitas)"
              name="Receitas"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="despesas"
              stroke="#EF4444"
              fillOpacity={1}
              fill="url(#colorDespesas)"
              name="Despesas"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="saldo"
              stroke="#3B82F6"
              strokeWidth={3}
              name="Saldo"
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de Categorias */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Gastos por Categoria
          </h3>
          <p className="text-sm text-gray-600">
            Distribuição das despesas do mês atual
          </p>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={dadosCategorias}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, porcentagem }) =>
                `${name} (${porcentagem.toFixed(1)}%)`
              }
              outerRadius={100}
              fill="#8884d8"
              dataKey="valor">
              {dadosCategorias.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.cor} />
              ))}
            </Pie>
            <Tooltip content={<PieCustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
