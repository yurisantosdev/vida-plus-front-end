'use client'
import React, { useState, useEffect } from 'react'
import { Moon, Sun, Monitor } from '@phosphor-icons/react'
import { ButtonIcon } from './Button'

type Theme = 'light' | 'dark' | 'system'

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'light'
    setTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement

    if (
      newTheme === 'dark' ||
      (newTheme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  if (!mounted) {
    return <div className="w-10 h-10 bg-gray-100 rounded-lg animate-pulse" />
  }

  return (
    <div className="flex items-center bg-gray-100 rounded-lg p-1">
      <ButtonIcon
        icon={<Sun size={16} />}
        variant={theme === 'light' ? 'primary' : 'ghost'}
        size="sm"
        onClick={() => handleThemeChange('light')}
        className={theme === 'light' ? 'bg-white shadow-sm' : ''}
      />
      <ButtonIcon
        icon={<Monitor size={16} />}
        variant={theme === 'system' ? 'primary' : 'ghost'}
        size="sm"
        onClick={() => handleThemeChange('system')}
        className={theme === 'system' ? 'bg-white shadow-sm' : ''}
      />
      <ButtonIcon
        icon={<Moon size={16} />}
        variant={theme === 'dark' ? 'primary' : 'ghost'}
        size="sm"
        onClick={() => handleThemeChange('dark')}
        className={theme === 'dark' ? 'bg-white shadow-sm' : ''}
      />
    </div>
  )
}
