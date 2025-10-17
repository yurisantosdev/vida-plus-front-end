'use client'
import React from 'react'
import { Target, Plus, ArrowUp } from '@phosphor-icons/react'
import { MetaType } from '@/types/DashboardType'

interface MetasFinanceirasProps {
  metas: MetaType[]
}

/**
 * Componente para exibir as metas financeiras
 * @description Renderiza as metas financeiras com progresso visual
 * @param {MetaType[]} metas - Lista de metas financeiras
 * @author Sistema
 */
export default function MetasFinanceiras({ metas }: MetasFinanceirasProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const getProgressColor = (progresso: number) => {
    if (progresso >= 100) return 'bg-green-500'
    if (progresso >= 75) return 'bg-blue-500'
    if (progresso >= 50) return 'bg-yellow-500'
    if (progresso >= 25) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const getStatusText = (progresso: number) => {
    if (progresso >= 100) return 'Concluída'
    if (progresso >= 75) return 'Quase lá!'
    if (progresso >= 50) return 'Bom progresso'
    if (progresso >= 25) return 'Em andamento'
    return 'Iniciando'
  }

  const getStatusColor = (progresso: number) => {
    if (progresso >= 100) return 'text-green-600 bg-green-50'
    if (progresso >= 75) return 'text-blue-600 bg-blue-50'
    if (progresso >= 50) return 'text-yellow-600 bg-yellow-50'
    if (progresso >= 25) return 'text-orange-600 bg-orange-50'
    return 'text-red-600 bg-red-50'
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Metas Financeiras
          </h3>
          <p className="text-sm text-gray-600">
            Acompanhe seu progresso nas metas
          </p>
        </div>
        <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
          <Plus size={16} />
          <span className="text-sm font-medium">Nova meta</span>
        </button>
      </div>

      <div className="space-y-6">
        {metas.length > 0 ? (
          metas.map((meta, index) => (
            <div key={meta.mccodigo} className="group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                    <Target size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 group-hover:text-gray-700">
                      {meta.mcnome}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Meta: {formatCurrency(meta.mcvalor)} •{' '}
                      {formatDate(meta.mcdataLimite)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(
                      meta.mcprogresso
                    )}`}>
                    {getStatusText(meta.mcprogresso)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {formatCurrency(meta.mcvalorAtual)} de{' '}
                    {formatCurrency(meta.mcvalor)}
                  </span>
                  <span className="font-medium text-gray-900">
                    {meta.mcprogresso.toFixed(1)}%
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(
                      meta.mcprogresso
                    )}`}
                    style={{ width: `${Math.min(meta.mcprogresso, 100)}%` }}
                  />
                </div>

                {meta.mcdescricao && (
                  <p className="text-xs text-gray-500 mt-2">
                    {meta.mcdescricao}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">Nenhuma meta definida</p>
            <p className="text-sm text-gray-400 mt-1">
              Crie sua primeira meta financeira
            </p>
            <button className="mt-4 inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
              <Plus size={16} />
              <span>Criar meta</span>
            </button>
          </div>
        )}
      </div>

      {metas.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-green-600">
              <ArrowUp size={16} />
              <span className="text-sm font-medium">
                {metas.filter((m) => m.mcprogresso >= 100).length} de{' '}
                {metas.length} metas concluídas
              </span>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
              Gerenciar metas
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
