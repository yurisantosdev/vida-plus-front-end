'use client'
import React from 'react'
import { SpinnerGap } from '@phosphor-icons/react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'white' | 'gray'
  text?: string
  className?: string
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12'
}

const colorClasses = {
  primary: 'text-blue-600',
  white: 'text-white',
  gray: 'text-gray-600'
}

export default function LoadingSpinner({
  size = 'md',
  color = 'primary',
  text,
  className = ''
}: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <SpinnerGap 
        className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
        weight="bold"
      />
      {text && (
        <span className={`text-sm font-medium ${colorClasses[color]}`}>
          {text}
        </span>
      )}
    </div>
  )
}

export function LoadingOverlay({ 
  isLoading, 
  children, 
  text = 'Carregando...' 
}: { 
  isLoading: boolean
  children: React.ReactNode
  text?: string 
}) {
  if (!isLoading) return <>{children}</>

  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 shadow-xl">
          <LoadingSpinner size="lg" text={text} />
        </div>
      </div>
    </div>
  )
}

export function LoadingPage({ text = 'Carregando...' }: { text?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <LoadingSpinner size="xl" text={text} />
      </div>
    </div>
  )
} 