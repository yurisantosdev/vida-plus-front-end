import {
  ArrowsLeftRight,
  Bank,
  ChartBar,
  Minus,
  Plus,
  CreditCard,
  Target,
  PiggyBank,
  Receipt,
  Gear
} from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Funcionalidades() {
  const router = useRouter()

  const funcionalidades = [
    {
      icon: Plus,
      color: 'green',
      tooltip: 'Nova Receita',
      onClick: () => router.push('/finance/receitas/nova'),
      bgColor: 'bg-green-200',
      hoverColor: 'hover:bg-green-300',
      iconColor: 'text-green-600'
    },
    {
      icon: Minus,
      color: 'red',
      tooltip: 'Nova Despesa',
      onClick: () => router.push('/finance/despesas/nova'),
      bgColor: 'bg-red-200',
      hoverColor: 'hover:bg-red-300',
      iconColor: 'text-red-600'
    },
    {
      icon: ArrowsLeftRight,
      color: 'blue',
      tooltip: 'Transferência',
      onClick: () => router.push('/finance/transferencias/nova'),
      bgColor: 'bg-blue-200',
      hoverColor: 'hover:bg-blue-300',
      iconColor: 'text-blue-600'
    },
    {
      icon: Bank,
      color: 'yellow',
      tooltip: 'Contas',
      onClick: () => router.push('/finance/contas'),
      bgColor: 'bg-yellow-200',
      hoverColor: 'hover:bg-yellow-300',
      iconColor: 'text-yellow-600'
    },
    {
      icon: Receipt,
      color: 'purple',
      tooltip: 'Transações',
      onClick: () => router.push('/finance/transacoes'),
      bgColor: 'bg-purple-200',
      hoverColor: 'hover:bg-purple-300',
      iconColor: 'text-purple-600'
    },
    {
      icon: Target,
      color: 'indigo',
      tooltip: 'Metas',
      onClick: () => router.push('/finance/metas'),
      bgColor: 'bg-indigo-200',
      hoverColor: 'hover:bg-indigo-300',
      iconColor: 'text-indigo-600'
    },
    {
      icon: PiggyBank,
      color: 'pink',
      tooltip: 'Bens',
      onClick: () => router.push('/finance/bens'),
      bgColor: 'bg-pink-200',
      hoverColor: 'hover:bg-pink-300',
      iconColor: 'text-pink-600'
    },
    {
      icon: ChartBar,
      color: 'emerald',
      tooltip: 'Relatórios',
      onClick: () => router.push('/finance/relatorios'),
      bgColor: 'bg-emerald-200',
      hoverColor: 'hover:bg-emerald-300',
      iconColor: 'text-emerald-600'
    }
  ]

  return (
    <div className="mt-6 transition-all animate-slide-up">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Ações Rápidas
      </h3>

      <div className="grid grid-cols-4 gap-4">
        {funcionalidades.map((func, index) => (
          <div
            key={index}
            onClick={func.onClick}
            className={`
              ${func.bgColor} ${func.hoverColor}
              rounded-xl h-20 flex flex-col items-center justify-center 
              transition-all duration-300 hover:scale-105 active:scale-95 
              cursor-pointer shadow-md hover:shadow-lg
              group
            `}>
            <func.icon
              size={28}
              className={`${func.iconColor} group-hover:scale-110 transition-transform duration-200`}
            />
            <span className="text-xs font-medium text-gray-700 mt-1">
              {func.tooltip}
            </span>
          </div>
        ))}
      </div>

      {/* Seção de Atalhos Rápidos */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Atalhos Rápidos
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            onClick={() => router.push('/finance/transacoes')}
            className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 cursor-pointer hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-semibold">
                  Ver Todas Transações
                </h4>
                <p className="text-blue-100 text-sm">Histórico completo</p>
              </div>
              <Receipt size={24} className="text-white" />
            </div>
          </div>

          <div
            onClick={() => router.push('/finance/contas')}
            className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 cursor-pointer hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-semibold">Gerenciar Contas</h4>
                <p className="text-green-100 text-sm">Adicionar ou editar</p>
              </div>
              <Bank size={24} className="text-white" />
            </div>
          </div>

          <div
            onClick={() => router.push('/finance/relatorios')}
            className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 cursor-pointer hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-semibold">Relatórios</h4>
                <p className="text-purple-100 text-sm">Análises e gráficos</p>
              </div>
              <ChartBar size={24} className="text-white" />
            </div>
          </div>

          <div
            onClick={() => router.push('/finance/configuracoes')}
            className="bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg p-4 cursor-pointer hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-md hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-semibold">Configurações</h4>
                <p className="text-gray-100 text-sm">
                  Categorias e preferências
                </p>
              </div>
              <Gear size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
