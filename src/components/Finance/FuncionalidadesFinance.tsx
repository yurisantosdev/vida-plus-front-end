import { Bank, Minus, Plus, Receipt } from '@phosphor-icons/react'
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
      bgColor: 'bg-emerald-500/10',
      hoverColor: 'hover:bg-emerald-500/20',
      iconColor: 'text-emerald-600',
      borderColor: 'border-emerald-200'
    },
    {
      icon: Minus,
      color: 'red',
      tooltip: 'Nova Despesa',
      onClick: () => router.push('/finance/despesas/nova'),
      bgColor: 'bg-red-500/10',
      hoverColor: 'hover:bg-red-500/20',
      iconColor: 'text-red-600',
      borderColor: 'border-red-200'
    },
    {
      icon: Bank,
      color: 'slate',
      tooltip: 'Contas',
      onClick: () => router.push('/finance/contas'),
      bgColor: 'bg-slate-500/10',
      hoverColor: 'hover:bg-slate-500/20',
      iconColor: 'text-slate-600',
      borderColor: 'border-slate-200'
    },
    {
      icon: Receipt,
      color: 'purple',
      tooltip: 'Transações',
      onClick: () => router.push('/finance/transacoes'),
      bgColor: 'bg-violet-500/10',
      hoverColor: 'hover:bg-violet-500/20',
      iconColor: 'text-violet-600',
      borderColor: 'border-violet-200'
    }
  ]

  return (
    <div className="mt-6 transition-all animate-slide-up">
      <h3 className="text-lg font-semibold text-slate-700 mb-4">
        Ações Rápidas
      </h3>

      <div className="grid grid-cols-4 gap-4">
        {funcionalidades.map((func, index) => (
          <div
            key={index}
            onClick={func.onClick}
            className={`
              ${func.bgColor} ${func.hoverColor} ${func.borderColor}
              rounded-xl h-20 flex flex-col items-center justify-center 
              transition-all duration-300 hover:scale-105 active:scale-95 
              cursor-pointer shadow-md hover:shadow-lg border
              group
            `}>
            <func.icon
              size={28}
              className={`${func.iconColor} group-hover:scale-110 transition-transform duration-200`}
            />
            <span className="text-xs font-medium text-slate-600 mt-1">
              {func.tooltip}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
