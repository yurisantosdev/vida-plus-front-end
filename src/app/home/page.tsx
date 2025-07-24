'use client'
import { AuthUser } from '@/services/auth'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UsuarioType } from '@/types/UsuariosType'
import { useRouter } from 'next/navigation'
import BaseLayout from '@/templates/BaseLayout'
import CardSaldos from '@/components/Finance/CardSaldo'

export default function HomePage() {
  AuthUser()
  const router = useRouter()
  const dispatch = useDispatch()
  const user: UsuarioType = useSelector((state: any) => state.userReducer)

  return (
    <span>
      <BaseLayout>
        {/* Banner boas vindas ao usuário */}
        <div className="transition-all animate-slide-up mt-4 mb-2 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Olá, {user.usnome}!
          </h1>
          <p className="text-gray-600 text-center max-w-xl">
            Gestão de sua vida na palma da mão!
          </p>
        </div>

        <CardSaldos />
      </BaseLayout>
    </span>
  )
}
