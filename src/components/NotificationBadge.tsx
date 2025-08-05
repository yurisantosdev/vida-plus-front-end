import React from 'react'
import { Bell } from '@phosphor-icons/react'
import { cn } from '@/utils/cn'

interface NotificationBadgeProps {
  count?: number
  variant?: 'default' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
}

export function NotificationBadge({
  count = 0,
  variant = 'default',
  size = 'md',
  className,
  onClick
}: NotificationBadgeProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  }

  const badgeSizeClasses = {
    sm: 'w-4 h-4 text-xs',
    md: 'w-5 h-5 text-xs',
    lg: 'w-6 h-6 text-sm'
  }

  const variantClasses = {
    default: 'bg-blue-500 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-white',
    danger: 'bg-red-500 text-white'
  }

  const iconSize = {
    sm: 16,
    md: 20,
    lg: 24
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={onClick}
        className={cn(
          'relative flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200',
          sizeClasses[size],
          className
        )}>
        <Bell size={iconSize[size]} className="text-gray-600" />

        {count > 0 && (
          <span
            className={cn(
              'absolute -top-1 -right-1 flex items-center justify-center rounded-full font-medium',
              badgeSizeClasses[size],
              variantClasses[variant]
            )}>
            {count > 99 ? '99+' : count}
          </span>
        )}
      </button>
    </div>
  )
}

// Componente para notificações em tempo real
export function LiveNotificationBadge({
  isLive = false,
  count = 0,
  ...props
}: NotificationBadgeProps & { isLive?: boolean }) {
  return (
    <div className="relative">
      <NotificationBadge count={count} {...props} />

      {isLive && (
        <div className="absolute -top-1 -right-1 w-3 h-3">
          <div className="w-full h-full bg-red-500 rounded-full animate-ping" />
          <div className="absolute top-0 left-0 w-full h-full bg-red-500 rounded-full" />
        </div>
      )}
    </div>
  )
}
