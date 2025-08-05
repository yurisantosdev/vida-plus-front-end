import React from 'react'
import { cn } from '@/utils/cn'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'outlined' | 'filled'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
  onClick?: () => void
}

export function Card({
  children,
  className,
  variant = 'default',
  padding = 'md',
  hover = false,
  onClick,
  ...props
}: CardProps) {
  const baseClasses = 'rounded-xl transition-all duration-200'

  const variantClasses = {
    default: 'bg-white border border-gray-200 shadow-sm',
    elevated: 'bg-white shadow-lg border border-gray-100',
    outlined: 'bg-transparent border-2 border-gray-200',
    filled: 'bg-gray-50 border border-gray-200'
  }

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  const hoverClasses = hover ? 'hover:shadow-lg hover:scale-[1.02]' : ''
  const clickableClasses = onClick ? 'cursor-pointer' : ''

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        paddingClasses[padding],
        hoverClasses,
        clickableClasses,
        className
      )}
      onClick={onClick}
      {...props}>
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
  title?: string
  subtitle?: string
  action?: React.ReactNode
}

export function CardHeader({
  children,
  className,
  title,
  subtitle,
  action
}: CardHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between mb-4', className)}>
      <div className="flex-1">
        {title && (
          <h3 className="text-lg md:text-start text-center font-semibold text-gray-900 mb-1">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="text-sm md:text-start text-center text-gray-600">
            {subtitle}
          </p>
        )}
        {children}
      </div>
      {action && <div className="flex-shrink-0 ml-4">{action}</div>}
    </div>
  )
}

interface CardContentProps {
  children: React.ReactNode
  className?: string
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn('', className)}>{children}</div>
}

interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between pt-4 mt-4 border-t border-gray-100',
        className
      )}>
      {children}
    </div>
  )
}

// Card especializado para estatísticas
interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  variant?: 'primary' | 'success' | 'warning' | 'danger'
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  variant = 'primary'
}: StatCardProps) {
  const variantClasses = {
    primary: 'bg-blue-50 border-blue-200 text-blue-700',
    success: 'bg-green-50 border-green-200 text-green-700',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    danger: 'bg-red-50 border-red-200 text-red-700'
  }

  return (
    <Card variant="elevated" hover className="relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          {trend && (
            <div
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                trend.isPositive
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
              <span
                className={
                  trend.isPositive ? 'text-green-600' : 'text-red-600'
                }>
                {trend.isPositive ? '↗' : '↘'}
              </span>
              <span className="ml-1">{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        {icon && (
          <div className={`p-3 rounded-lg ${variantClasses[variant]}`}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  )
}

// Card para listas
interface ListCardProps {
  title?: string
  items: Array<{
    id: string | number
    title: string
    subtitle?: string
    action?: React.ReactNode
    icon?: React.ReactNode
  }>
  emptyMessage?: string
}

export function ListCard({
  title,
  items,
  emptyMessage = 'Nenhum item encontrado'
}: ListCardProps) {
  return (
    <Card>
      {title && <CardHeader title={title} children={undefined} />}
      <CardContent>
        {items.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">{emptyMessage}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  {item.icon && (
                    <div className="text-gray-400">{item.icon}</div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{item.title}</p>
                    {item.subtitle && (
                      <p className="text-sm text-gray-500">{item.subtitle}</p>
                    )}
                  </div>
                </div>
                {item.action && <div>{item.action}</div>}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
