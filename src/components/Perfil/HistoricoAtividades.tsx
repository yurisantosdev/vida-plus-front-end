'use client'
import React, { useState } from 'react'
import {
  Clock,
  Plus,
  Minus,
  Edit,
  Trash,
  User,
  CreditCard,
  Receipt,
  ChartLine,
  Settings,
  Calendar
} from '@phosphor-icons/react'
import { Card } from '@/components/Card'

interface Atividade {
  id: string
  tipo: 'transacao' | 'conta' | 'perfil' | 'configuracao'
  acao: string
  descricao: string
  data: string
  valor?: string
}

/**
 * Componente de histórico de atividades do usuário
 * @description Exibe o histórico de ações realizadas pelo usuário
 * @author Sistema
 */
export default function HistoricoAtividades() {
  const [filtro, setFiltro] = useState<
    'todas' | 'transacao' | 'conta' | 'perfil' | 'configuracao'
  >('todas')

  // Dados mockados para demonstração
  const atividades: Atividade[] = [
    {
      id: '1',
      tipo: 'transacao',
      acao: 'criou',
      descricao: 'Nova transação: Salário Janeiro',
      data: '2024-01-15T09:30:00',
      valor: 'R$ 8.500,00'
    },
    {
      id: '2',
      tipo: 'conta',
      acao: 'adicionou',
      descricao: 'Nova conta: Conta Corrente Principal',
      data: '2024-01-14T14:20:00'
    },
    {
      id: '3',
      tipo: 'transacao',
      acao: 'criou',
      descricao: 'Nova transação: Supermercado Extra',
      data: '2024-01-14T16:45:00',
      valor: 'R$ 320,50'
    },
    {
      id: '4',
      tipo: 'perfil',
      acao: 'atualizou',
      descricao: 'Informações pessoais atualizadas',
      data: '2024-01-13T11:15:00'
    },
    {
      id: '5',
      tipo: 'transacao',
      acao: 'editou',
      descricao: 'Transação editada: Combustível Shell',
      data: '2024-01-12T08:30:00',
      valor: 'R$ 180,00'
    },
    {
      id: '6',
      tipo: 'configuracao',
      acao: 'alterou',
      descricao: 'Configurações de tema alteradas',
      data: '2024-01-11T19:45:00'
    },
    {
      id: '7',
      tipo: 'conta',
      acao: 'adicionou',
      descricao: 'Nova conta: Poupança',
      data: '2024-01-10T10:20:00'
    },
    {
      id: '8',
      tipo: 'transacao',
      acao: 'criou',
      descricao: 'Nova transação: Netflix',
      data: '2024-01-09T20:00:00',
      valor: 'R$ 45,90'
    }
  ]

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'transacao':
        return <Receipt size={16} className="text-green-600" />
      case 'conta':
        return <CreditCard size={16} className="text-blue-600" />
      case 'perfil':
        return <User size={16} className="text-purple-600" />
      case 'configuracao':
        return <Settings size={16} className="text-orange-600" />
      default:
        return <Clock size={16} className="text-gray-600" />
    }
  }

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'transacao':
        return 'bg-green-50 border-green-200'
      case 'conta':
        return 'bg-blue-50 border-blue-200'
      case 'perfil':
        return 'bg-purple-50 border-purple-200'
      case 'configuracao':
        return 'bg-orange-50 border-orange-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  const getAcaoIcon = (acao: string) => {
    switch (acao) {
      case 'criou':
      case 'adicionou':
        return <Plus size={14} className="text-green-600" />
      case 'editou':
      case 'atualizou':
      case 'alterou':
        return <Edit size={14} className="text-blue-600" />
      case 'removeu':
      case 'excluiu':
        return <Trash size={14} className="text-red-600" />
      default:
        return <Clock size={14} className="text-gray-600" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    )

    if (diffInHours < 1) {
      return 'Agora mesmo'
    } else if (diffInHours < 24) {
      return `${diffInHours}h atrás`
    } else if (diffInHours < 48) {
      return 'Ontem'
    } else {
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    }
  }

  const atividadesFiltradas =
    filtro === 'todas'
      ? atividades
      : atividades.filter((atividade) => atividade.tipo === filtro)

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gray-100 rounded-xl">
            <Clock size={24} className="text-gray-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Histórico de Atividades
            </h3>
            <p className="text-gray-600">Suas ações recentes no sistema</p>
          </div>
        </div>

        <div className="flex space-x-2">
          {[
            { id: 'todas', label: 'Todas', count: atividades.length },
            {
              id: 'transacao',
              label: 'Transações',
              count: atividades.filter((a) => a.tipo === 'transacao').length
            },
            {
              id: 'conta',
              label: 'Contas',
              count: atividades.filter((a) => a.tipo === 'conta').length
            },
            {
              id: 'perfil',
              label: 'Perfil',
              count: atividades.filter((a) => a.tipo === 'perfil').length
            }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFiltro(item.id as any)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filtro === item.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}>
              {item.label} ({item.count})
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {atividadesFiltradas.length > 0 ? (
          atividadesFiltradas.map((atividade) => (
            <div
              key={atividade.id}
              className={`flex items-center space-x-4 p-4 rounded-xl border ${getTipoColor(
                atividade.tipo
              )}`}>
              <div className="flex-shrink-0">{getTipoIcon(atividade.tipo)}</div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  {getAcaoIcon(atividade.acao)}
                  <span className="text-sm font-medium text-gray-900">
                    {atividade.acao.charAt(0).toUpperCase() +
                      atividade.acao.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-1">
                  {atividade.descricao}
                </p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar size={12} />
                    <span>{formatDate(atividade.data)}</span>
                  </div>
                  {atividade.valor && (
                    <span className="font-medium text-green-600">
                      {atividade.valor}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Clock size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">
              Nenhuma atividade encontrada
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Suas atividades aparecerão aqui
            </p>
          </div>
        )}
      </div>

      {atividadesFiltradas.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
            Ver histórico completo
          </button>
        </div>
      )}
    </Card>
  )
}

