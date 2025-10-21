'use client'
import { AuthUser } from '@/services/auth'
import React from 'react'
import BaseLayout from '@/templates/BaseLayout'
import DashboardMain from '@/components/Dashboard/DashboardMain'

export default function HomePage() {
  AuthUser()

  return (
    <BaseLayout>
      <DashboardMain />
    </BaseLayout>
  )
}
