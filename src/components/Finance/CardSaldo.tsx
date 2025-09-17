import React, { useEffect, useState } from 'react'
import { ContasType } from '@/types/ContasType'
import { TransacoesType } from '@/types/TransacoesType'
import {
  Wallet,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight
} from '@phosphor-icons/react'

export default function CardSaldos() {
  const [contas, setContas] = useState<ContasType[]>([])
  const [transacoes, setTransacoes] = useState<TransacoesType[]>([])
  const [loading, setLoading] = useState(true)
  const [saldoTotal, setSaldoTotal] = useState(0)
  const [entradas, setEntradas] = useState(0)
  const [saidas, setSaidas] = useState(0)

  function formatCurrency(value: number) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  function animateValue(
    setter: (val: number) => void,
    end: number,
    duration = 1000
  ) {
    let start = 0
    const startTime = performance.now()

    function update(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const value = start + (end - start) * progress

      setter(parseFloat(value.toFixed(2)))

      if (progress < 1) {
        requestAnimationFrame(update)
      }
    }

    requestAnimationFrame(update)
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)

        // Carregar contas
        const contasResponse = await FinanceService.getContas()
        const contasData = contasResponse.data || []
        setContas(contasData)

        // Calcular saldo total
        const saldoTotal = contasData.reduce(
          (total: number, conta: ContasType) => {
            return total + (conta.ctsaldo || 0)
          },
          0
        )
        setSaldoTotal(saldoTotal)

        // Carregar transações do mês atual
        const hoje = new Date()
        const primeiroDiaMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1)
        const ultimoDiaMes = new Date(
          hoje.getFullYear(),
          hoje.getMonth() + 1,
          0
        )

        const transacoesResponse = await FinanceService.getTransacoes({
          dataInicio: primeiroDiaMes.toISOString(),
          dataFim: ultimoDiaMes.toISOString()
        })
        const transacoesData = transacoesResponse.data || []
        setTransacoes(transacoesData)

        // Calcular entradas e saídas do mês
        const entradasMes = transacoesData
          .filter((t: TransacoesType) => t.tstipo === 'RECEITA')
          .reduce((total: number, t: TransacoesType) => total + t.tsvalor, 0)

        const saidasMes = transacoesData
          .filter((t: TransacoesType) => t.tstipo === 'DESPESA')
          .reduce((total: number, t: TransacoesType) => total + t.tsvalor, 0)

        setEntradas(entradasMes)
        setSaidas(saidasMes)
      } catch (error) {
        console.error('Erro ao carregar dados financeiros:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    if (!loading) {
      animateValue(setSaldoTotal, saldoTotal)
      animateValue(setEntradas, entradas)
      animateValue(setSaidas, saidas)
    }
  }, [loading, saldoTotal, entradas, saidas])

  if (loading) {
    return (
      <div className="w-full transition-all animate-slide-up">
        <div className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-blue-400 rounded w-1/3 mb-2"></div>
            <div className="h-8 bg-blue-400 rounded w-1/2 mb-6"></div>
            <div className="flex justify-between">
              <div className="h-4 bg-blue-400 rounded w-1/4"></div>
              <div className="h-4 bg-blue-400 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full transition-all animate-slide-up">
      {/* Card Principal */}
      <div className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-lg font-medium text-white/90">Saldo Total</p>
            <p className="mt-1 text-4xl font-extrabold text-white">
              {formatCurrency(saldoTotal)}
            </p>
          </div>
          <div className="bg-white/20 rounded-full p-3">
            <Wallet size={32} className="text-white" />
          </div>
        </div>

        {/* Resumo do Mês */}
        <div className="bg-white/10 rounded-lg p-4 mb-4">
          <p className="text-sm font-medium text-white/80 mb-3">
            Resumo do Mês
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <div className="bg-green-400/20 rounded-full p-2">
                <ArrowUpRight size={16} className="text-green-300" />
              </div>
              <div>
                <p className="text-xs text-white/70">Entradas</p>
                <p className="text-sm font-bold text-green-300">
                  {formatCurrency(entradas)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-red-400/20 rounded-full p-2">
                <ArrowDownRight size={16} className="text-red-300" />
              </div>
              <div>
                <p className="text-xs text-white/70">Saídas</p>
                <p className="text-sm font-bold text-red-300">
                  {formatCurrency(saidas)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contas Rápidas */}
        {contas.length > 0 && (
          <div>
            <p className="text-sm font-medium text-white/80 mb-2">
              Suas Contas
            </p>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {contas.slice(0, 3).map((conta) => (
                <div
                  key={conta.ctcodigo}
                  className="flex-shrink-0 bg-white/10 rounded-lg p-3 min-w-[120px]">
                  <div className="flex items-center space-x-2 mb-1">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: conta.ctcor || '#3B82F6'
                      }}></div>
                    <p className="text-xs text-white/90 truncate">
                      {conta.ctconta}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-white">
                    {formatCurrency(conta.ctsaldo || 0)}
                  </p>
                </div>
              ))}
              {contas.length > 3 && (
                <div className="flex-shrink-0 bg-white/10 rounded-lg p-3 min-w-[120px] flex items-center justify-center">
                  <p className="text-xs text-white/70">
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
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80">Entradas</p>
              <p className="text-xl font-bold text-white">
                {formatCurrency(entradas)}
              </p>
            </div>
            <TrendingUp size={24} className="text-white/80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80">Saídas</p>
              <p className="text-xl font-bold text-white">
                {formatCurrency(saidas)}
              </p>
            </div>
            <TrendingDown size={24} className="text-white/80" />
          </div>
        </div>
      </div>
    </div>
  )
}
