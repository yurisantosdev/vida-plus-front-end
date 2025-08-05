'use client'
import { AuthUser } from '@/services/auth'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UsuarioType } from '@/types/UsuariosType'
import { useRouter } from 'next/navigation'
import BaseLayout from '@/templates/BaseLayout'
import CardSaldos from '@/components/Finance/CardSaldo'
import { Card, StatCard } from '@/components/Card'
import {
  Car,
  Wrench,
  GasPump,
  Calendar,
  CheckCircle,
  ArrowRight,
  Users,
  Clock,
  CurrencyDollar,
  CurrencyCircleDollar
} from '@phosphor-icons/react'

export default function HomePage() {
  AuthUser()
  const router = useRouter()
  const dispatch = useDispatch()
  const user: UsuarioType = useSelector((state: any) => state.userReducer)

  const quickActions = [
    {
      id: 1,
      title: 'Manutenções',
      subtitle: 'Controle de manutenções',
      icon: <Wrench size={24} className="text-blue-600" />,
      action: <ArrowRight size={16} className="text-gray-400" />,
      onClick: () => router.push('/garage/manutencoes')
    },
    {
      id: 2,
      title: 'Abastecimentos',
      subtitle: 'Controle combustível',
      icon: <GasPump size={24} className="text-orange-600" />,
      action: <ArrowRight size={16} className="text-gray-400" />,
      onClick: () => router.push('/garage/abastecimentos/0')
    },
    {
      id: 3,
      title: 'Despesas',
      subtitle: 'Controle de despesas',
      icon: <CurrencyCircleDollar size={24} className="text-green-600" />,
      action: <ArrowRight size={16} className="text-gray-400" />,
      onClick: () => router.push('/garage/despesas')
    }
  ]

  return (
    <BaseLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header com boas-vindas */}
        <div className="mb-8">
          <div className="md:flex md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-start text-center font-bold text-gray-900 mb-2">
                Olá, {user.usnome}! 👋
              </h1>
              <p className="text-gray-600 text-lg text-center md:text-start">
                Bem-vindo ao seu painel de controle. Aqui você tem uma visão
                geral da sua gestão.
              </p>
            </div>
            <div className="flex md:mt-0 mt-4 items-center justify-center space-x-2 text-sm text-gray-500">
              <Clock size={16} />
              <span>
                {new Date().toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total de Veículos"
            value="5"
            subtitle="Frota ativa"
            icon={<Car size={24} />}
            trend={{ value: 12, isPositive: true }}
            variant="primary"
          />
          <StatCard
            title="Gasto Mensal"
            value="R$ 2.450"
            subtitle="Janeiro 2024"
            icon={<CurrencyDollar size={24} />}
            trend={{ value: 8, isPositive: false }}
            variant="warning"
          />
          <StatCard
            title="Manutenções Pendentes"
            value="3"
            subtitle="Requer atenção"
            icon={<Wrench size={24} />}
            variant="danger"
          />
          <StatCard
            title="Eficiência"
            value="94%"
            subtitle="Meta: 90%"
            icon={<Users size={24} />}
            trend={{ value: 5, isPositive: true }}
            variant="success"
          />
        </div>

        {/* Layout em duas colunas */}
        <div>
          {/* Ações rápidas */}
          <div className="w-full">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Ações Rápidas
                </h2>
                <p className="text-sm text-gray-500">
                  Acesse rapidamente as principais funcionalidades
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action) => (
                  <div
                    key={action.id}
                    onClick={action.onClick}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer group">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-white transition-colors">
                        {action.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {action.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {action.action}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Seção financeira */}
        <div className="mt-8">
          <Card>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Resumo Financeiro
              </h2>
              <p className="text-sm text-gray-500">
                Visão geral dos seus gastos e receitas
              </p>
            </div>
            <CardSaldos />
          </Card>
        </div>
      </div>
    </BaseLayout>
  )
}
