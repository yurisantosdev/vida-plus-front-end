'use client'
import { AuthUser } from '@/services/auth'
import React from 'react'
import BaseLayout from '@/templates/BaseLayout'
import CardSaldos from '@/components/Finance/CardSaldo'
import FuncionalidadesFinance from '@/components/Finance/FuncionalidadesFinance'

export default function Finance() {
  AuthUser()

  return (
    <BaseLayout title="Finance">
      <CardSaldos />
      <FuncionalidadesFinance />
    </BaseLayout>
  )
}
