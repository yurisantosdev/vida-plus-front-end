'use client'
import React from 'react'
import {
  CurrencyDollar,
  ArrowUp,
  ArrowDown,
  Wallet,
  CreditCard,
  ChartLine,
  AlertCircle
} from '@phosphor-icons/react'
import { DashboardMetricsType } from '@/types/DashboardType'

interface DashboardCardsProps {
  metricas: DashboardMetricsType
}

/**
 * Componente para exibir os cards principais do dashboard
 * @description Renderiza os principais indicadores financeiros em cards visuais
 * @param {DashboardMetricsType} metricas - Dados das métricas do dashboard
 * @author Sistema
 */
export default function DashboardCards({ metricas }: DashboardCardsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatPercent = (value: number) => {
    const signal = value >= 0 ? '+' : ''
    return `${signal}${value.toFixed(1)}%`
  }

  const cards = [
    {
      title: 'Saldo Total',
      value: formatCurrency(metricas.saldoTotal),
      icon: <Wallet size={24} className="text-blue-600" />,
      trend: metricas.tendenciaSaldo,
      trendLabel: 'vs mês anterior',
      variant: 'primary' as const,
      subtitle: 'Todas as contas'
    },
    {
      title: 'Receitas do Mês',
      value: formatCurrency(metricas.receitasMes),
      icon: <ArrowUp size={24} className="text-green-600" />,
      trend: metricas.tendenciaReceitas,
      trendLabel: 'vs mês anterior',
      variant: 'success' as const,
      subtitle: 'Janeiro 2024'
    },
    {
      title: 'Despesas do Mês',
      value: formatCurrency(metricas.despesasMes),
      icon: <ArrowDown size={24} className="text-red-600" />,
      trend: metricas.tendenciaDespesas,
      trendLabel: 'vs mês anterior',
      variant: 'danger' as const,
      subtitle: 'Janeiro 2024'
    },
    {
      title: 'Saldo do Mês',
      value: formatCurrency(metricas.saldoMes),
      icon: <CurrencyDollar size={24} className="text-purple-600" />,
      trend: metricas.saldoMes > 0 ? 15.2 : -8.5,
      trendLabel: 'vs mês anterior',
      variant: metricas.saldoMes > 0 ? 'success' : ('danger' as const),
      subtitle: 'Receitas - Despesas'
    },
    {
      title: 'Contas Ativas',
      value: metricas.contasAtivas.toString(),
      icon: <CreditCard size={24} className="text-orange-600" />,
      trend: 0,
      trendLabel: 'total',
      variant: 'info' as const,
      subtitle: 'Contas bancárias'
    },
    {
      title: 'Transações',
      value: metricas.transacoesMes.toString(),
      icon: <ChartLine size={24} className="text-indigo-600" />,
      trend: 12.5,
      trendLabel: 'vs mês anterior',
      variant: 'warning' as const,
      subtitle: 'Este mês'
    }
  ]

  const getVariantStyles = (variant: string) => {
    const styles = {
      primary: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
      success: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200',
      danger: 'bg-gradient-to-br from-red-50 to-red-100 border-red-200',
      warning:
        'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200',
      info: 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200'
    }
    return styles[variant as keyof typeof styles] || styles.primary
  }

  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'text-green-600'
    if (trend < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${getVariantStyles(
            card.variant
          )} rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group`}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-white shadow-sm group-hover:shadow-md transition-shadow">
              {card.icon}
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1">
                {card.trend !== 0 && (
                  <>
                    {card.trend > 0 ? (
                      <ArrowUp size={16} className="text-green-600" />
                    ) : (
                      <ArrowDown size={16} className="text-red-600" />
                    )}
                    <span
                      className={`text-sm font-medium ${getTrendColor(
                        card.trend
                      )}`}>
                      {formatPercent(card.trend)}
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs text-gray-600 mt-1">{card.trendLabel}</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {card.value}
            </h3>
            <p className="text-sm font-medium text-gray-700 mb-1">
              {card.title}
            </p>
            <p className="text-xs text-gray-600">{card.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
