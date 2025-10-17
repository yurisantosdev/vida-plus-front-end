'use client'
import React, { useState, useEffect } from 'react'
import { DashboardDataType } from '@/types/DashboardType'
import DashboardCards from './DashboardCards'
import DashboardCharts from './DashboardCharts'
import TransacoesRecentes from './TransacoesRecentes'
import MetasFinanceiras from './MetasFinanceiras'
import { categoriasPadrao } from '@/types/CategoriasType'

/**
 * Componente principal do dashboard financeiro
 * @description Dashboard completo com métricas, gráficos e funcionalidades
 * @author Sistema
 */
export default function DashboardMain() {
  const [dashboardData, setDashboardData] = useState<DashboardDataType>({
    metricas: {
      saldoTotal: 15420.5,
      receitasMes: 8500.0,
      despesasMes: 6230.75,
      saldoMes: 2269.25,
      contasAtivas: 3,
      transacoesMes: 47,
      tendenciaReceitas: 12.5,
      tendenciaDespesas: -8.2,
      tendenciaSaldo: 15.3
    },
    graficoTransacoes: [
      { data: 'Jul', receitas: 7200, despesas: 5800, saldo: 1400 },
      { data: 'Ago', receitas: 7800, despesas: 6200, saldo: 1600 },
      { data: 'Set', receitas: 8200, despesas: 5900, saldo: 2300 },
      { data: 'Out', receitas: 7900, despesas: 6100, saldo: 1800 },
      { data: 'Nov', receitas: 8600, despesas: 6500, saldo: 2100 },
      { data: 'Dez', receitas: 8500, despesas: 6230, saldo: 2270 }
    ],
    graficoCategorias: [
      {
        categoria: 'Alimentação',
        valor: 1850,
        cor: '#DC2626',
        porcentagem: 29.7
      },
      {
        categoria: 'Transporte',
        valor: 980,
        cor: '#EA580C',
        porcentagem: 15.7
      },
      { categoria: 'Moradia', valor: 2200, cor: '#C2410C', porcentagem: 35.3 },
      { categoria: 'Saúde', valor: 650, cor: '#BE123C', porcentagem: 10.4 },
      { categoria: 'Lazer', valor: 550, cor: '#7C3AED', porcentagem: 8.9 }
    ],
    transacoesRecentes: [
      {
        trcodigo: '1',
        trdescricao: 'Salário Janeiro',
        trvalor: 8500,
        trtipo: 'RECEITA',
        trdata: '2024-01-05T09:00:00',
        categoria: 'Salário',
        corCategoria: '#10B981'
      },
      {
        trcodigo: '2',
        trdescricao: 'Supermercado Extra',
        trvalor: 320.5,
        trtipo: 'DESPESA',
        trdata: '2024-01-15T14:30:00',
        categoria: 'Alimentação',
        corCategoria: '#DC2626'
      },
      {
        trcodigo: '3',
        trdescricao: 'Combustível Shell',
        trvalor: 180.0,
        trtipo: 'DESPESA',
        trdata: '2024-01-14T16:45:00',
        categoria: 'Transporte',
        corCategoria: '#EA580C'
      },
      {
        trcodigo: '4',
        trdescricao: 'Freelance Design',
        trvalor: 1200.0,
        trtipo: 'RECEITA',
        trdata: '2024-01-12T11:20:00',
        categoria: 'Freelance',
        corCategoria: '#059669'
      },
      {
        trcodigo: '5',
        trdescricao: 'Netflix',
        trvalor: 45.9,
        trtipo: 'DESPESA',
        trdata: '2024-01-10T00:00:00',
        categoria: 'Lazer',
        corCategoria: '#7C3AED'
      }
    ],
    metas: [
      {
        mccodigo: '1',
        mcnome: 'Reserva de Emergência',
        mcvalor: 10000,
        mcvalorAtual: 7500,
        mcdataLimite: '2024-06-30',
        mcdescricao: 'Meta de 6 meses de despesas',
        mcprogresso: 75
      },
      {
        mccodigo: '2',
        mcnome: 'Viagem Europa',
        mcvalor: 15000,
        mcvalorAtual: 4200,
        mcdataLimite: '2024-12-31',
        mcdescricao: 'Viagem dos sonhos para Paris',
        mcprogresso: 28
      },
      {
        mccodigo: '3',
        mcnome: 'Carro Novo',
        mcvalor: 45000,
        mcvalorAtual: 18000,
        mcdataLimite: '2025-06-30',
        mcdescricao: 'Entrada para financiamento',
        mcprogresso: 40
      }
    ],
    alertas: [
      'Você gastou 15% mais em alimentação este mês',
      'Meta de reserva de emergência 75% concluída!',
      'Lembre-se de pagar o cartão até dia 25'
    ]
  })

  useEffect(() => {
    // Aqui você pode carregar dados reais da API
    // Por enquanto estamos usando dados mockados
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header do Dashboard */}
      <div className="mb-8">
        <div className="md:flex md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard Financeiro 💰
            </h1>
            <p className="text-gray-600 text-lg">
              Visão geral das suas finanças pessoais
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="text-right">
              <p className="text-sm text-gray-500">Última atualização</p>
              <p className="text-sm font-medium text-gray-900">
                {new Date().toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cards de Métricas */}
      <DashboardCards metricas={dashboardData.metricas} />

      {/* Gráficos */}
      <DashboardCharts
        dadosTransacoes={dashboardData.graficoTransacoes}
        dadosCategorias={dashboardData.graficoCategorias}
      />

      {/* Transações e Metas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TransacoesRecentes transacoes={dashboardData.transacoesRecentes} />
        <MetasFinanceiras metas={dashboardData.metas} />
      </div>

      {/* Alertas */}
      {dashboardData.alertas.length > 0 && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            Alertas e Lembretes
          </h3>
          <div className="space-y-3">
            {dashboardData.alertas.map((alerta, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-blue-800 text-sm">{alerta}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
