import React, { useState, useRef } from 'react'
import { Camera, X, Upload } from '@phosphor-icons/react'
import { cn } from '@/utils/cn'

interface ImageUploadProps {
  onImageSelect: (file: File) => void
  onImageRemove: () => void
  selectedFile: File | null
  previewUrl: string | null
  className?: string
  size?: 'sm' | 'md' | 'lg'
  accept?: string
  maxSize?: number // em MB
  label?: string
  description?: string
  required?: boolean
}

export function ImageUpload({
  onImageSelect,
  onImageRemove,
  selectedFile,
  previewUrl,
  className,
  size = 'md',
  accept = 'image/*',
  maxSize = 5,
  label = 'Foto do Perfil',
  description = 'Adicione uma foto para personalizar seu perfil',
  required = false
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-40 h-40'
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      validateAndSetFile(file)
    }
  }

  const validateAndSetFile = (file: File) => {
    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      alert(`Por favor, selecione apenas arquivos de imagem.`)
      return
    }

    // Validar tamanho
    if (file.size > maxSize * 1024 * 1024) {
      alert(`A imagem deve ter no máximo ${maxSize}MB.`)
      return
    }

    onImageSelect(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      validateAndSetFile(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Camera size={24} className="text-purple-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>

      {/* Upload Area */}
      <div className="flex flex-col items-center space-y-4">
        {/* Preview/Upload Area */}
        <div
          className={cn(
            'relative rounded-full border-2 border-dashed transition-all duration-200 cursor-pointer',
            sizeClasses[size],
            isDragOver
              ? 'border-blue-400 bg-blue-50'
              : previewUrl
              ? 'border-blue-200'
              : 'border-gray-300 hover:border-gray-400'
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}>
          {previewUrl ? (
            <>
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full rounded-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 rounded-full transition-all duration-200 flex items-center justify-center">
                <Upload
                  size={24}
                  className="text-white opacity-0 hover:opacity-100 transition-opacity"
                />
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onImageRemove()
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg">
                <X size={16} />
              </button>
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <Camera size={32} className="text-gray-400 mb-2" />
              <p className="text-xs text-gray-500 text-center px-2">
                Clique ou arraste uma imagem
              </p>
            </div>
          )}
        </div>

        {/* File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* File Info */}
        {selectedFile && (
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900">
              {selectedFile.name}
            </p>
            <p className="text-xs text-gray-500">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        )}

        {/* Instructions */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Formatos aceitos: JPG, PNG, GIF • Máximo: {maxSize}MB
          </p>
          {!selectedFile && (
            <p className="text-xs text-gray-400 mt-1">
              Clique na área acima para selecionar uma imagem
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// Componente para upload de múltiplas imagens
interface MultipleImageUploadProps {
  onImagesSelect: (files: File[]) => void
  onImageRemove: (index: number) => void
  selectedFiles: File[]
  previewUrls: string[]
  maxFiles?: number
  className?: string
}

export function MultipleImageUpload({
  onImagesSelect,
  onImageRemove,
  selectedFiles,
  previewUrls,
  maxFiles = 5,
  className
}: MultipleImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const validFiles = files.filter((file) => {
      if (!file.type.startsWith('image/')) {
        alert(`Por favor, selecione apenas arquivos de imagem.`)
        return false
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`A imagem deve ter no máximo 5MB.`)
        return false
      }
      return true
    })

    if (selectedFiles.length + validFiles.length > maxFiles) {
      alert(`Você pode selecionar no máximo ${maxFiles} imagens.`)
      return
    }

    onImagesSelect(validFiles)
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Imagens</h3>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={selectedFiles.length >= maxFiles}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          Adicionar Imagem
        </button>
      </div>

      {/* Preview Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {previewUrls.map((url, index) => (
          <div key={index} className="relative group">
            <img
              src={url}
              alt={`Preview ${index + 1}`}
              className="w-full h-24 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => onImageRemove(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <X size={12} />
            </button>
          </div>
        ))}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      <p className="text-xs text-gray-500">
        {selectedFiles.length}/{maxFiles} imagens selecionadas
      </p>
    </div>
  )
}
