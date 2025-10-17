import React from 'react'
import { Wallet, ArrowUpRight, ArrowDownRight } from '@phosphor-icons/react'

export default function CardSaldos() {
  const saldoTotal = 15750.5
  const entradas = 8500.0
  const saidas = 3200.75
  const contas = [
    {
      ctcodigo: 1,
      ctconta: 'Conta Corrente',
      ctsaldo: 8750.5,
      ctcor: '#3B82F6'
    },
    { ctcodigo: 2, ctconta: 'Poupança', ctsaldo: 5200.0, ctcor: '#10B981' },
    {
      ctcodigo: 3,
      ctconta: 'Cartão Crédito',
      ctsaldo: -1200.0,
      ctcor: '#EF4444'
    },
    { ctcodigo: 4, ctconta: 'Investimentos', ctsaldo: 3000.0, ctcor: '#8B5CF6' }
  ]

  function formatCurrency(value: number) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  return (
    <div className="w-full transition-all animate-slide-up">
      {/* Card Principal */}
      <div className="w-full rounded-xl bg-gradient-to-r from-slate-700 to-slate-800 p-6 shadow-lg border border-slate-600/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-lg font-medium text-white/90">Saldo Total</p>
            <p className="mt-1 text-4xl font-extrabold text-white">
              {formatCurrency(saldoTotal)}
            </p>
          </div>
          <div className="bg-slate-600/30 rounded-full p-3">
            <Wallet size={32} className="text-slate-200" />
          </div>
        </div>

        {/* Resumo do Mês */}
        <div className="bg-slate-600/20 rounded-lg p-4 mb-4 border border-slate-500/20">
          <p className="text-sm font-medium text-slate-200 mb-3">
            Resumo do Mês
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <div className="bg-emerald-500/20 rounded-full p-2">
                <ArrowUpRight size={16} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-slate-300">Entradas</p>
                <p className="text-sm font-bold text-emerald-400">
                  {formatCurrency(entradas)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-red-500/20 rounded-full p-2">
                <ArrowDownRight size={16} className="text-red-400" />
              </div>
              <div>
                <p className="text-xs text-slate-300">Saídas</p>
                <p className="text-sm font-bold text-red-400">
                  {formatCurrency(saidas)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contas Rápidas */}
        {contas.length > 0 && (
          <div>
            <p className="text-sm font-medium text-slate-200 mb-2">
              Suas Contas
            </p>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {contas.slice(0, 3).map((conta) => (
                <div
                  key={conta.ctcodigo}
                  className="flex-shrink-0 bg-slate-600/20 rounded-lg p-3 min-w-[120px] border border-slate-500/20">
                  <div className="flex items-center space-x-2 mb-1">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: conta.ctcor || '#64748B'
                      }}></div>
                    <p className="text-xs text-slate-200 truncate">
                      {conta.ctconta}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-white">
                    {formatCurrency(conta.ctsaldo || 0)}
                  </p>
                </div>
              ))}
              {contas.length > 3 && (
                <div className="flex-shrink-0 bg-slate-600/20 rounded-lg p-3 min-w-[120px] flex items-center justify-center border border-slate-500/20">
                  <p className="text-xs text-slate-300">
                    +{contas.length - 3} mais
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg p-4 shadow-lg border border-emerald-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-100">Entradas</p>
              <p className="text-xl font-bold text-white">
                {formatCurrency(entradas)}
              </p>
            </div>
            <ArrowUpRight size={24} className="text-emerald-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-4 shadow-lg border border-red-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-100">Saídas</p>
              <p className="text-xl font-bold text-white">
                {formatCurrency(saidas)}
              </p>
            </div>
            <ArrowDownRight size={24} className="text-red-200" />
          </div>
        </div>
      </div>
    </div>
  )
}
