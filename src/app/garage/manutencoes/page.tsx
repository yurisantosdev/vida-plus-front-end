'use client'
import { AuthUser } from '@/services/auth'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UsuarioType } from '@/types/UsuariosType'
import { useRouter } from 'next/navigation'
import BaseLayout from '@/templates/BaseLayout'

export default function Manutencoes() {
  AuthUser()
  const router = useRouter()
  const dispatch = useDispatch()
  const user: UsuarioType = useSelector((state: any) => state.userReducer)

  return (
    <BaseLayout title="Manutençoes" navbar={false} voltar>
      <p className="text-center text-black text-2xl">Em desenvolvimento</p>
    </BaseLayout>
  )
}
