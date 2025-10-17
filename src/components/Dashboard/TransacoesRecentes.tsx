'use client'
import React from 'react'
import { ArrowUpRight, ArrowDownLeft, Eye } from '@phosphor-icons/react'
import { TransacaoRecenteType } from '@/types/DashboardType'

interface TransacoesRecentesProps {
  transacoes: TransacaoRecenteType[]
}

/**
 * Componente para exibir as transações recentes
 * @description Renderiza uma lista das últimas transações realizadas
 * @param {TransacaoRecenteType[]} transacoes - Lista de transações recentes
 * @author Sistema
 */
export default function TransacoesRecentes({
  transacoes
}: TransacoesRecentesProps) {
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
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTipoIcon = (tipo: string) => {
    if (tipo === 'RECEITA') {
      return <ArrowUpRight size={16} className="text-green-600" />
    }
    return <ArrowDownLeft size={16} className="text-red-600" />
  }

  const getTipoColor = (tipo: string) => {
    if (tipo === 'RECEITA') {
      return 'text-green-600 bg-green-50'
    }
    return 'text-red-600 bg-red-50'
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Transações Recentes
          </h3>
          <p className="text-sm text-gray-600">
            Últimas movimentações das suas contas
          </p>
        </div>
        <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
          <Eye size={16} />
          <span className="text-sm font-medium">Ver todas</span>
        </button>
      </div>

      <div className="space-y-4">
        {transacoes.length > 0 ? (
          transacoes.map((transacao, index) => (
            <div
              key={transacao.trcodigo}
              className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200 group">
              <div className="flex items-center space-x-4">
                <div
                  className={`p-2 rounded-lg ${getTipoColor(
                    transacao.trtipo
                  )}`}>
                  {getTipoIcon(transacao.trtipo)}
                </div>
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-gray-700">
                    {transacao.trdescricao}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span
                      className="text-xs px-2 py-1 rounded-full text-white font-medium"
                      style={{ backgroundColor: transacao.corCategoria }}>
                      {transacao.categoria}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(transacao.trdata)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-semibold ${
                    transacao.trtipo === 'RECEITA'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}>
                  {transacao.trtipo === 'RECEITA' ? '+' : '-'}
                  {formatCurrency(transacao.trvalor)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ArrowUpRight size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">
              Nenhuma transação encontrada
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Suas transações aparecerão aqui
            </p>
          </div>
        )}
      </div>

      {transacoes.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <button className="w-full text-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
            Carregar mais transações
          </button>
        </div>
      )}
    </div>
  )
}
