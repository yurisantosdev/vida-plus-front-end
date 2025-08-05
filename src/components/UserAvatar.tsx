import React from 'react'
import { User } from '@phosphor-icons/react'
import { cn } from '@/utils/cn'

interface UserAvatarProps {
  src?: string | null
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  fallback?: React.ReactNode
}

export function UserAvatar({
  src,
  alt = 'Avatar do usuário',
  size = 'md',
  className,
  fallback
}: UserAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32
  }

  // Verificar se a imagem é base64 ou URL
  const isBase64 = src?.startsWith('data:image')
  const hasValidImage = src && (isBase64 || src.startsWith('http'))

  if (hasValidImage) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn(
          'rounded-full object-cover',
          sizeClasses[size],
          className
        )}
      />
    )
  }

  // Fallback padrão ou customizado
  if (fallback) {
    return (
      <div
        className={cn(
          'rounded-full bg-gray-100 flex items-center justify-center',
          sizeClasses[size],
          className
        )}>
        {fallback}
      </div>
    )
  }

  // Fallback padrão com ícone
  return (
    <div
      className={cn(
        'rounded-full bg-gray-100 flex items-center justify-center text-gray-500',
        sizeClasses[size],
        className
      )}>
      <User size={iconSizes[size]} />
    </div>
  )
}

// Componente para avatar com inicial do nome
interface UserAvatarWithInitialsProps {
  name: string
  src?: string | null
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function UserAvatarWithInitials({
  name,
  src,
  size = 'md',
  className
}: UserAvatarWithInitialsProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg'
  }

  // Gerar iniciais do nome
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const initials = getInitials(name)

  // Se tem imagem, usar o componente de avatar normal
  if (src) {
    return <UserAvatar src={src} alt={name} size={size} className={className} />
  }

  // Fallback com iniciais
  return (
    <div
      className={cn(
        'rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold',
        sizeClasses[size],
        className
      )}>
      {initials}
    </div>
  )
}

// Componente para avatar com status online/offline
interface UserAvatarWithStatusProps {
  src?: string | null
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isOnline?: boolean
  className?: string
}

export function UserAvatarWithStatus({
  src,
  alt,
  size = 'md',
  isOnline = false,
  className
}: UserAvatarWithStatusProps) {
  const statusSizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4'
  }

  return (
    <div className="relative inline-block">
      <UserAvatar src={src} alt={alt} size={size} className={className} />

      {/* Indicador de status */}
      <div
        className={cn(
          'absolute bottom-0 right-0 rounded-full border-2 border-white',
          statusSizeClasses[size],
          isOnline ? 'bg-green-500' : 'bg-gray-400'
        )}
      />
    </div>
  )
}
