'use client'
import { AuthUser } from '@/services/auth'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UsuarioType } from '@/types/UsuariosType'
import { useRouter } from 'next/navigation'
import BaseLayout from '@/templates/BaseLayout'
import CardSaldos from '@/components/Finance/CardSaldo'

export default function Finance() {
  AuthUser()
  const router = useRouter()
  const dispatch = useDispatch()
  const user: UsuarioType = useSelector((state: any) => state.userReducer)

  return (
    <BaseLayout title="Finance">
      <p className="text-center text-black text-2xl">Em desenvolvimento</p>
      <CardSaldos />
    </BaseLayout>
  )
}
