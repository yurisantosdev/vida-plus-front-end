import React from 'react'
import { cn } from '@/utils/cn'

interface ProgressProps {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'success' | 'warning' | 'danger'
  showLabel?: boolean
  animated?: boolean
  className?: string
}

export function Progress({
  value,
  max = 100,
  size = 'md',
  variant = 'default',
  showLabel = false,
  animated = false,
  className
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  }

  const variantClasses = {
    default: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500'
  }

  const labelSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span
            className={cn('font-medium text-gray-700', labelSizeClasses[size])}>
            Progresso
          </span>
          <span className={cn('text-gray-500', labelSizeClasses[size])}>
            {Math.round(percentage)}%
          </span>
        </div>
      )}

      <div
        className={cn(
          'w-full bg-gray-200 rounded-full overflow-hidden',
          sizeClasses[size]
        )}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300 ease-out',
            variantClasses[variant],
            animated && 'animate-pulse'
          )}
          style={{
            width: `${percentage}%`,
            transition: animated
              ? 'width 0.5s ease-in-out'
              : 'width 0.3s ease-out'
          }}
        />
      </div>
    </div>
  )
}

// Componente de progresso circular
interface CircularProgressProps {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'success' | 'warning' | 'danger'
  showLabel?: boolean
  strokeWidth?: number
  className?: string
}

export function CircularProgress({
  value,
  max = 100,
  size = 'md',
  variant = 'default',
  showLabel = false,
  strokeWidth = 4,
  className
}: CircularProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  const radius = 50 - strokeWidth / 2
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  }

  const variantClasses = {
    default: 'text-blue-500',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    danger: 'text-red-500'
  }

  const labelSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-lg'
  }

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center',
        className
      )}>
      <svg
        className={cn('transform -rotate-90', sizeClasses[size])}
        viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-200"
        />

        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn(
            'transition-all duration-300 ease-out',
            variantClasses[variant]
          )}
        />
      </svg>

      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={cn(
              'font-semibold text-gray-700',
              labelSizeClasses[size]
            )}>
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  )
}

// Componente de status com ícones
interface StatusProgressProps {
  steps: Array<{
    id: string
    label: string
    status: 'pending' | 'current' | 'completed' | 'error'
    icon?: React.ReactNode
  }>
  currentStep?: number
  className?: string
}

export function StatusProgress({
  steps,
  currentStep = 0,
  className
}: StatusProgressProps) {
  const getStepStatus = (index: number) => {
    if (index < currentStep) return 'completed'
    if (index === currentStep) return 'current'
    return 'pending'
  }

  const statusClasses = {
    pending: 'text-gray-400 border-gray-200',
    current: 'text-blue-600 border-blue-600 bg-blue-50',
    completed: 'text-green-600 border-green-600 bg-green-50',
    error: 'text-red-600 border-red-600 bg-red-50'
  }

  return (
    <div className={cn('flex items-center space-x-4', className)}>
      {steps.map((step, index) => {
        const status = getStepStatus(index)

        return (
          <React.Fragment key={step.id}>
            <div
              className={cn(
                'flex items-center space-x-2 px-3 py-2 rounded-lg border-2 transition-all duration-200',
                statusClasses[status]
              )}>
              {step.icon && <span>{step.icon}</span>}
              <span className="font-medium text-sm">{step.label}</span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={cn(
                  'w-8 h-0.5 transition-colors duration-200',
                  status === 'completed' ? 'bg-green-600' : 'bg-gray-200'
                )}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
