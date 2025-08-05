'use client'
import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { BaseAppInterface } from '@/Interfaces/BaseAppInterface'
import Navbar from './Navbar'
import { LoadingPage } from './LoadingSpinner'

export default function BaseApp({
  children,
  loading,
  styleBase = true,
  navbar = true,
  extraComponentTitle
}: BaseAppInterface) {
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [loading])

  if (loading) {
    return <LoadingPage text="Carregando..." />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className={`${styleBase && 'max-w-5xl mx-auto min-h-screen'}`}>
        {navbar && <Navbar />}
        {extraComponentTitle && extraComponentTitle}
        <main className="flex-1">{children}</main>
      </div>

      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{ zIndex: 999999999999 }}
        toastOptions={{
          className:
            '!bg-gray-900 !text-white !border !border-gray-700 !rounded-xl !shadow-xl',
          duration: 3000,
          removeDelay: 500,
          style: {
            background: '#111827',
            color: '#ffffff',
            border: '1px solid #374151',
            borderRadius: '12px',
            boxShadow:
              '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
            fontSize: '14px',
            fontWeight: '500'
          },

          success: {
            duration: 2000,
            iconTheme: {
              primary: '#22c55e',
              secondary: '#ffffff'
            },
            style: {
              background: '#064e3b',
              border: '1px solid #059669'
            }
          },

          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff'
            },
            style: {
              background: '#7f1d1d',
              border: '1px solid #dc2626'
            }
          },

          loading: {
            style: {
              background: '#1e3a8a',
              border: '1px solid #3b82f6'
            }
          }
        }}
      />
    </div>
  )
}
