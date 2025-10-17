'use client'
import { AuthUser } from '@/services/auth'
import React from 'react'
import { useSelector } from 'react-redux'
import BaseLayout from '@/templates/BaseLayout'
import DashboardMain from '@/components/Dashboard/DashboardMain'
import { UsuariosType } from '@/types/UsuairosType'

/**
 * Página principal do dashboard financeiro
 * @description Página inicial com dashboard completo das finanças pessoais
 * @author Sistema
 */
export default function HomePage() {
  AuthUser()
  const user: UsuariosType = useSelector((state: any) => state.userReducer)

  return (
    <BaseLayout>
      <DashboardMain />
    </BaseLayout>
  )
}
