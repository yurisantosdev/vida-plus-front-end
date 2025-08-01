'use client'
import React, { useState, useRef, useEffect } from 'react'
import { CalendarDots, CaretLeft, CaretRight } from '@phosphor-icons/react'

interface DatePickerProps {
  value: string
  onChange: (date: string) => void
  placeholder?: string
  className?: string
  required?: boolean
  disabled?: boolean
}

export default function DatePicker({
  value,
  onChange,
  placeholder = 'Selecione uma data',
  className = '',
  required = false,
  disabled = false
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  )
  const datePickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value))
    }
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()

    const days = []

    // Adicionar dias vazios no início
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null)
    }

    // Adicionar dias do mês
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    const formattedDate = date.toISOString().split('T')[0]
    onChange(formattedDate)
    setIsOpen(false)
  }

  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    )
  }

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    )
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const isSelected = (date: Date) => {
    if (!selectedDate) return false
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    )
  }

  const isPastDate = (date: Date) => {
    // Removendo a restrição de datas passadas
    return false
  }

  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ]

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

  return (
    <div className={`relative ${className}`} ref={datePickerRef}>
      {/* Input */}
      <div
        className={`relative cursor-pointer ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}>
        <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-orange-500 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 transition-all duration-300">
          <CalendarDots size={22} className="text-gray-500 flex-shrink-0" />
          <input
            type="text"
            value={selectedDate ? formatDate(selectedDate) : ''}
            placeholder={placeholder}
            readOnly
            className="flex-1 bg-transparent text-gray-900 placeholder-gray-500 outline-none cursor-pointer"
            required={required}
            disabled={disabled}
          />
        </div>
      </div>

      {/* Dropdown Calendar */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[280px]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <button
              onClick={handlePreviousMonth}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <CaretLeft size={20} className="text-gray-600" />
            </button>

            <h3 className="font-semibold text-gray-800">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>

            <button
              onClick={handleNextMonth}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <CaretRight size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Week Days */}
          <div className="grid grid-cols-7 gap-1 p-2">
            {weekDays.map((day) => (
              <div
                key={day}
                className="p-2 text-center text-xs font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 p-2">
            {getDaysInMonth(currentDate).map((date, index) => (
              <div key={index} className="p-1">
                {date ? (
                  <button
                    onClick={() => handleDateSelect(date)}
                    className={`w-full h-8 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isSelected(date)
                        ? 'bg-orange-500 text-white hover:bg-orange-600'
                        : isToday(date)
                        ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}>
                    {date.getDate()}
                  </button>
                ) : (
                  <div className="w-full h-8" />
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-100 bg-gray-50 rounded-b-lg">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>Selecionado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-100 rounded-full"></div>
                <span>Hoje</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
