import React from 'react'
import { Button } from './Button'
import { cn } from '@/utils/cn'
import { Car, Wrench, GasPump, DollarSign, CheckCircle, MagnifyingGlass } from '@phosphor-icons/react'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary' | 'outline'
  }
  secondaryAction?: {
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary' | 'outline'
  }
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className,
  size = 'md'
}: EmptyStateProps) {
  const sizeClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16'
  }

  const iconSizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  }

  return (
    <div className={cn(
      'flex flex-col items-center justify-center text-center',
      sizeClasses[size],
      className
    )}>
      {icon && (
        <div className={cn(
          'flex items-center justify-center rounded-full bg-gray-100 mb-4',
          iconSizeClasses[size]
        )}>
          <div className="text-gray-400">
            {icon}
          </div>
        </div>
      )}
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-500 max-w-sm mb-6">
        {description}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        {action && (
          <Button
            title={action.label}
            onClick={action.onClick}
            variant={action.variant || 'primary'}
            size="md"
          />
        )}
        
        {secondaryAction && (
          <Button
            title={secondaryAction.label}
            onClick={secondaryAction.onClick}
            variant={secondaryAction.variant || 'outline'}
            size="md"
          />
        )}
      </div>
    </div>
  )
}

// Estados vazios pré-definidos para casos comuns
export function EmptyVehicles() {
  return (
    <EmptyState
      icon={<Car size={32} />}
      title="Nenhum veículo cadastrado"
      description="Comece cadastrando seu primeiro veículo para gerenciar manutenções, abastecimentos e despesas."
      action={{
        label: 'Cadastrar Veículo',
        onClick: () => window.location.href = '/garage/cadastro',
        variant: 'primary'
      }}
    />
  )
}

export function EmptyMaintenance() {
  return (
    <EmptyState
      icon={<Wrench size={32} />}
      title="Nenhuma manutenção registrada"
      description="Registre manutenções para acompanhar o histórico de serviços dos seus veículos."
      action={{
        label: 'Registrar Manutenção',
        onClick: () => window.location.href = '/garage/manutencoes',
        variant: 'primary'
      }}
    />
  )
}

export function EmptyFueling() {
  return (
    <EmptyState
      icon={<GasPump size={32} />}
      title="Nenhum abastecimento registrado"
      description="Registre abastecimentos para controlar gastos com combustível e acompanhar o consumo."
      action={{
        label: 'Registrar Abastecimento',
        onClick: () => window.location.href = '/garage/abastecimentos',
        variant: 'primary'
      }}
    />
  )
}

export function EmptyExpenses() {
  return (
    <EmptyState
      icon={<DollarSign size={32} />}
      title="Nenhuma despesa registrada"
      description="Registre despesas para manter o controle financeiro da sua frota."
      action={{
        label: 'Registrar Despesa',
        onClick: () => window.location.href = '/garage/despesas',
        variant: 'primary'
      }}
    />
  )
}

export function EmptyChecklists() {
  return (
    <EmptyState
      icon={<CheckCircle size={32} />}
      title="Nenhum checklist criado"
      description="Crie checklists para verificar itens importantes dos seus veículos."
      action={{
        label: 'Criar Checklist',
        onClick: () => window.location.href = '/checklists',
        variant: 'primary'
      }}
    />
  )
}

export function EmptySearch({ searchTerm }: { searchTerm: string }) {
  return (
    <EmptyState
      icon={<MagnifyingGlass size={32} />}
      title="Nenhum resultado encontrado"
      description={`Não encontramos resultados para "${searchTerm}". Tente ajustar os termos de busca.`}
      action={{
        label: 'Limpar Busca',
        onClick: () => window.location.reload(),
        variant: 'outline'
      }}
    />
  )
} 