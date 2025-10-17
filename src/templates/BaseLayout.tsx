'use client'
import BaseApp from '@/components/BaseApp'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  House,
  CreditCard,
  Receipt,
  User,
  ChartLine,
  Bell,
  SignOut,
  List,
  X
} from '@phosphor-icons/react'
import { useSelector, useDispatch } from 'react-redux'
import { BaseLayoutInterface } from '@/Interfaces/BaseLayoutInterface'
import { logoutUser } from '@/redux/user/actions'
import toast from 'react-hot-toast'

/**
 * Layout base profissional para o aplicativo financeiro
 * @description Layout principal com navegação lateral e header moderno
 * @param {BaseLayoutInterface} props - Propriedades do layout
 * @author Sistema
 */
export default function BaseLayout({
  children,
  title,
  styleBase = true,
  navbar = true,
  voltar = false,
  extraComponent,
  description
}: BaseLayoutInterface) {
  const router = useRouter()
  const dispatch = useDispatch()
  const loading = useSelector((state: any) => state.loadingReducer.loading)
  const user = useSelector((state: any) => state.userReducer)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/home',
      icon: <House size={20} />,
      active: title === 'Dashboard' || title === undefined
    },
    {
      name: 'Contas',
      href: '/finance/contas',
      icon: <CreditCard size={20} />,
      active: title === 'Contas Bancárias'
    },
    {
      name: 'Transações',
      href: '/finance/transacoes',
      icon: <Receipt size={20} />,
      active: title === 'Transações Financeiras'
    },
    {
      name: 'Relatórios',
      href: '/finance/relatorios',
      icon: <ChartLine size={20} />,
      active: title === 'Relatórios'
    }
  ]

  const handleLogout = () => {
    dispatch(logoutUser())
    router.push('/')
  }

  const handleNavigation = (href: string): void => {
    router.push(href)
    setSidebarOpen(false)
  }

  return (
    <BaseApp loading={loading} styleBase={styleBase} navbar={navbar}>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">V+</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Vida+</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600 cursor-pointer">
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="mt-8 px-4">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors cursor-pointer ${
                    item.active
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}>
                  <div
                    className={`${
                      item.active ? 'text-blue-600' : 'text-gray-400'
                    }`}>
                    {item.icon}
                  </div>
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </div>

            {/* User Section */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center space-x-3 px-4 py-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.usnome}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.usemail}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-1">
                <button
                  onClick={() => handleNavigation('/perfil')}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                  <User size={16} className="text-gray-400" />
                  <span className="text-sm">Meu Perfil</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                  <SignOut size={16} className="text-red-600" />
                  <span className="text-sm">Sair</span>
                </button>
              </div>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="flex items-center justify-between h-16 px-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                  <List size={20} />
                </button>

                {voltar && (
                  <button
                    onClick={() => router.back()}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                    <ArrowLeft size={20} />
                    <span className="text-sm font-medium">Voltar</span>
                  </button>
                )}

                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    {title}
                  </h1>
                  {description && (
                    <p className="text-sm text-gray-500">{description}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    toast('Em desenvolvimento')
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative cursor-pointer">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">
                      {user.usnome?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-6">{children}</div>
          </main>
        </div>

        {/* Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>

      {extraComponent}

      <style jsx global>{`
        .animate-slide-up {
          animation: slideUp 0.7s cubic-bezier(0.4, 2, 0.6, 1);
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </BaseApp>
  )
}
