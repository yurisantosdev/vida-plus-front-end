'use client'
import React from 'react'
import { UsuarioType } from '@/types/UsuariosType'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { AuthUser } from '@/services/auth'
import BaseLayout from '@/templates/BaseLayout'

export default function Checklists() {
  const user: UsuarioType = useSelector((state: any) => state.userReducer)
  const router = useRouter()
  AuthUser()

  return (
    <BaseLayout title="Checklists">
      <p className="text-center text-black text-2xl">Em desenvolvimento</p>
    </BaseLayout>
  )
}
