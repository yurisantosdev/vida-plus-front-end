'use client'
import React from 'react'
import { Warning, X, Check } from '@phosphor-icons/react'
import Modal from '@/components/Modal'
import { Button } from '@/components/Button'

interface ModalConfirmacaoProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  type?: 'warning' | 'danger' | 'info'
  loading?: boolean
}

/**
 * Modal de confirmação para ações sensíveis
 * @description Modal reutilizável para confirmar ações importantes
 * @param {boolean} isOpen - Se o modal está aberto
 * @param {Function} onClose - Função para fechar o modal
 * @param {Function} onConfirm - Função para confirmar a ação
 * @param {string} title - Título do modal
 * @param {string} message - Mensagem de confirmação
 * @param {string} confirmText - Texto do botão de confirmação
 * @param {string} cancelText - Texto do botão de cancelar
 * @param {string} type - Tipo do modal (warning, danger, info)
 * @param {boolean} loading - Se está carregando
 * @author Sistema
 */
export default function ModalConfirmacao({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'warning',
  loading = false
}: ModalConfirmacaoProps) {
  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          icon: <Warning size={24} className="text-red-600" />,
          iconBg: 'bg-red-100',
          buttonClass: 'bg-red-600 hover:bg-red-700'
        }
      case 'info':
        return {
          icon: <Warning size={24} className="text-blue-600" />,
          iconBg: 'bg-blue-100',
          buttonClass: 'bg-blue-600 hover:bg-blue-700'
        }
      default:
        return {
          icon: <Warning size={24} className="text-yellow-600" />,
          iconBg: 'bg-yellow-100',
          buttonClass: 'bg-yellow-600 hover:bg-yellow-700'
        }
    }
  }

  const styles = getTypeStyles()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${styles.iconBg}`}>
                {styles.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 leading-relaxed">{message}</p>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              onClick={onClose}
              title={cancelText}
              className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              disabled={loading}
            />
            <Button
              onClick={onConfirm}
              title={confirmText}
              className={`px-4 py-2 text-white rounded-lg transition-colors ${styles.buttonClass}`}
              disabled={loading}>
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processando...</span>
                </div>
              ) : (
                confirmText
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
