'use client'
import { AuthUser } from '@/services/auth'
import React, { useState, useEffect } from 'react'
import BaseLayout from '@/templates/BaseLayout'
import { TransacoesType } from '@/types/TransacoesType'
import { TipoTransacoesEnum } from '@/enums/TipoTransacoesEnum'
import { ContasType } from '@/types/ContasType'
import { categoriasPadrao } from '@/types/CategoriasType'
import {
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Pencil,
  Trash,
  Receipt,
  Repeat,
  MagnifyingGlass,
  Faders
} from '@phosphor-icons/react'
import ModalTransacao from './_components/ModalTransacao'

/**
 * Página de gerenciamento de transações financeiras
 * @description Interface completa para CRUD de transações (receitas e despesas)
 * @author Sistema
 */
export default function Transacoes() {
  AuthUser()
  const [transacoes, setTransacoes] = useState<TransacoesType[]>([])
  const [contas, setContas] = useState<ContasType[]>([])
  const [showModal, setShowModal] = useState(false)
  const [transacaoEditando, setTransacaoEditando] =
    useState<TransacoesType | null>(null)
  const [filtroTipo, setFiltroTipo] = useState<'TODAS' | 'RECEITA' | 'DESPESA'>(
    'TODAS'
  )
  const [filtroConta, setFiltroConta] = useState<string>('TODAS')
  const [busca, setBusca] = useState('')

  // Dados mockados para demonstração
  useEffect(() => {
    const contasMockadas: ContasType[] = [
      {
        ctcodigo: '1',
        ctnome: 'Conta Corrente Principal',
        cttitular: 'user1',
        ctsaldo: '5420.50',
        cttipoconta: 'CORRENTE' as any
      },
      {
        ctcodigo: '2',
        ctnome: 'Poupança',
        cttitular: 'user1',
        ctsaldo: '8500.00',
        cttipoconta: 'POUPANCA' as any
      }
    ]
    setContas(contasMockadas)

    const transacoesMockadas: TransacoesType[] = [
      {
        trcodigo: '1',
        trdata: '2024-01-15',
        trvalor: '8500.00',
        trdescricao: 'Salário Janeiro',
        trcategoria: 'Salário',
        trconta: '1',
        trusuario: 'user1',
        trtipo: 'RECEITA',
        trrecorrente: false,
        trtags: ['salário', 'receita']
      },
      {
        trcodigo: '2',
        trdata: '2024-01-14',
        trvalor: '320.50',
        trdescricao: 'Supermercado Extra',
        trcategoria: 'Alimentação',
        trconta: '1',
        trusuario: 'user1',
        trtipo: 'DESPESA',
        trrecorrente: false,
        trtags: ['alimentação', 'supermercado']
      },
      {
        trcodigo: '3',
        trdata: '2024-01-13',
        trvalor: '180.00',
        trdescricao: 'Combustível Shell',
        trcategoria: 'Transporte',
        trconta: '1',
        trusuario: 'user1',
        trtipo: 'DESPESA',
        trrecorrente: false,
        trtags: ['transporte', 'combustível']
      },
      {
        trcodigo: '4',
        trdata: '2024-01-12',
        trvalor: '1200.00',
        trdescricao: 'Freelance Design',
        trcategoria: 'Freelance',
        trconta: '1',
        trusuario: 'user1',
        trtipo: 'RECEITA',
        trrecorrente: false,
        trtags: ['freelance', 'trabalho']
      },
      {
        trcodigo: '5',
        trdata: '2024-01-10',
        trvalor: '45.90',
        trdescricao: 'Netflix',
        trcategoria: 'Lazer',
        trconta: '1',
        trusuario: 'user1',
        trtipo: 'DESPESA',
        trrecorrente: true,
        trtags: ['streaming', 'lazer']
      },
      {
        trcodigo: '6',
        trdata: '2024-01-08',
        trvalor: '2200.00',
        trdescricao: 'Aluguel',
        trcategoria: 'Moradia',
        trconta: '1',
        trusuario: 'user1',
        trtipo: 'DESPESA',
        trrecorrente: true,
        trtags: ['moradia', 'aluguel']
      }
    ]
    setTransacoes(transacoesMockadas)
  }, [])

  const formatCurrency = (value: string) => {
    const numValue = parseFloat(value)
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numValue)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const getTipoIcon = (tipo: TipoTransacoesEnum) => {
    if (tipo === 'RECEITA') {
      return <ArrowUpRight size={20} className="text-green-600" />
    }
    return <ArrowDownLeft size={20} className="text-red-600" />
  }

  const getTipoColor = (tipo: TipoTransacoesEnum) => {
    if (tipo === 'RECEITA') {
      return 'text-green-600 bg-green-50'
    }
    return 'text-red-600 bg-red-50'
  }

  const getCategoriaCor = (categoria: string) => {
    const categoriaObj = categoriasPadrao.find((c) => c.cgnome === categoria)
    return categoriaObj?.cgcor || '#6B7280'
  }

  const getContaNome = (contaId: string) => {
    const conta = contas.find((c) => c.ctcodigo === contaId)
    return conta?.ctnome || 'Conta não encontrada'
  }

  const handleNovaTransacao = () => {
    setTransacaoEditando(null)
    setShowModal(true)
  }

  const handleEditarTransacao = (transacao: TransacoesType) => {
    setTransacaoEditando(transacao)
    setShowModal(true)
  }

  const handleExcluirTransacao = (transacao: TransacoesType) => {
    if (
      confirm(
        `Tem certeza que deseja excluir a transação "${transacao.trdescricao}"?`
      )
    ) {
      setTransacoes(transacoes.filter((t) => t.trcodigo !== transacao.trcodigo))
    }
  }

  const handleSalvarTransacao = (novaTransacao: TransacoesType) => {
    if (transacaoEditando) {
      // Editar transação existente
      setTransacoes(
        transacoes.map((t) =>
          t.trcodigo === transacaoEditando.trcodigo
            ? { ...novaTransacao, trcodigo: transacaoEditando.trcodigo }
            : t
        )
      )
    } else {
      // Nova transação
      const transacaoComId = {
        ...novaTransacao,
        trcodigo: Date.now().toString()
      }
      setTransacoes([...transacoes, transacaoComId])
    }
    setShowModal(false)
    setTransacaoEditando(null)
  }

  // Filtrar transações
  const transacoesFiltradas = transacoes.filter((transacao) => {
    const passaFiltroTipo =
      filtroTipo === 'TODAS' || transacao.trtipo === filtroTipo
    const passaFiltroConta =
      filtroConta === 'TODAS' || transacao.trconta === filtroConta
    const passaBusca =
      !busca ||
      transacao.trdescricao?.toLowerCase().includes(busca.toLowerCase()) ||
      transacao.trcategoria?.toLowerCase().includes(busca.toLowerCase()) ||
      false

    return passaFiltroTipo && passaFiltroConta && passaBusca
  })

  // Calcular totais
  const totalReceitas = transacoesFiltradas
    .filter((t) => t.trtipo === 'RECEITA')
    .reduce((total, t) => total + parseFloat(t.trvalor), 0)

  const totalDespesas = transacoesFiltradas
    .filter((t) => t.trtipo === 'DESPESA')
    .reduce((total, t) => total + parseFloat(t.trvalor), 0)

  return (
    <BaseLayout title="Transações Financeiras">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="md:flex md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Transações 💰
              </h1>
              <p className="text-gray-600 text-lg">
                Gerencie suas receitas e despesas
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={handleNovaTransacao}
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
                <Plus size={20} />
                <span>Nova Transação</span>
              </button>
            </div>
          </div>
        </div>

        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium mb-1">Total Receitas</h3>
                <p className="text-3xl font-bold">
                  {formatCurrency(totalReceitas.toString())}
                </p>
              </div>
              <div className="p-2 bg-white bg-opacity-20 rounded-xl">
                <ArrowUpRight size={32} className="text-black" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium mb-1">Total Despesas</h3>
                <p className="text-3xl font-bold">
                  {formatCurrency(totalDespesas.toString())}
                </p>
              </div>
              <div className="p-2 bg-white bg-opacity-20 rounded-xl">
                <ArrowDownLeft size={32} className="text-black" />
              </div>
            </div>
          </div>

          <div
            className={`rounded-2xl p-6 text-white ${
              totalReceitas - totalDespesas >= 0
                ? 'bg-gradient-to-r from-blue-600 to-blue-700'
                : 'bg-gradient-to-r from-orange-600 to-orange-700'
            }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium mb-1">Saldo</h3>
                <p className="text-3xl font-bold">
                  {formatCurrency((totalReceitas - totalDespesas).toString())}
                </p>
              </div>
              <div className="p-2 bg-white bg-opacity-20 rounded-xl">
                <Receipt size={32} className="text-black" />
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <MagnifyingGlass
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Buscar transações..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Faders size={20} className="text-gray-400" />
                <select
                  value={filtroTipo}
                  onChange={(e) => setFiltroTipo(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400 text-gray-400">
                  <option value="TODAS">Todas</option>
                  <option value="RECEITA">Receitas</option>
                  <option value="DESPESA">Despesas</option>
                </select>
              </div>

              <select
                value={filtroConta}
                onChange={(e) => setFiltroConta(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400 text-gray-400">
                <option value="TODAS">Todas as contas</option>
                {contas.map((conta) => (
                  <option key={conta.ctcodigo} value={conta.ctcodigo}>
                    {conta.ctnome}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Lista de Transações */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {transacoesFiltradas.length} transação
              {transacoesFiltradas.length !== 1 ? 'ões' : ''} encontrada
              {transacoesFiltradas.length !== 1 ? 's' : ''}
            </h3>
          </div>

          <div className="divide-y divide-gray-200">
            {transacoesFiltradas.map((transacao) => (
              <div
                key={transacao.trcodigo}
                className="p-6 hover:bg-gray-50 transition-colors group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`p-3 rounded-xl ${getTipoColor(
                        transacao.trtipo
                      )}`}>
                      {getTipoIcon(transacao.trtipo)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 group-hover:text-gray-700">
                        {transacao.trdescricao}
                      </h4>
                      <div className="flex items-center space-x-3 mt-1">
                        <span
                          className="text-xs px-2 py-1 rounded-full text-white font-medium"
                          style={{
                            backgroundColor: getCategoriaCor(
                              transacao.trcategoria || ''
                            )
                          }}>
                          {transacao.trcategoria}
                        </span>
                        <span className="text-sm text-gray-500">
                          {getContaNome(transacao.trconta)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatDate(transacao.trdata)}
                        </span>
                        {transacao.trrecorrente && (
                          <span className="flex items-center space-x-1 text-xs text-blue-600">
                            <Repeat size={12} />
                            <span>Recorrente</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p
                        className={`text-lg font-bold ${
                          transacao.trtipo === 'RECEITA'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}>
                        {transacao.trtipo === 'RECEITA' ? '+' : '-'}
                        {formatCurrency(transacao.trvalor)}
                      </p>
                    </div>

                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEditarTransacao(transacao)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer">
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleExcluirTransacao(transacao)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors cursor-pointer">
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {transacoesFiltradas.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Receipt size={24} className="text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">
                Nenhuma transação encontrada
              </p>
              <p className="text-sm text-gray-400 mt-1">
                {busca || filtroTipo !== 'TODAS' || filtroConta !== 'TODAS'
                  ? 'Tente ajustar os filtros de busca'
                  : 'Comece adicionando sua primeira transação'}
              </p>
              {!busca && filtroTipo === 'TODAS' && filtroConta === 'TODAS' && (
                <button
                  onClick={handleNovaTransacao}
                  className="mt-4 inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
                  <Plus size={20} />
                  <span>Adicionar Transação</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <ModalTransacao
            transacao={transacaoEditando}
            contas={contas}
            onSave={handleSalvarTransacao}
            onClose={() => {
              setShowModal(false)
              setTransacaoEditando(null)
            }}
          />
        )}
      </div>
    </BaseLayout>
  )
}
