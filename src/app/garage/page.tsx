'use client'
import { AuthUser } from '@/services/auth'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UsuarioType } from '@/types/UsuariosType'
import { useRouter } from 'next/navigation'
import BaseLayout from '@/templates/BaseLayout'
import Subtitle from '@/components/Subtitle'
import {
  GasPump,
  ListBullets,
  Wrench,
  CurrencyCircleDollar,
  GearSix
} from '@phosphor-icons/react'
import CardVeiculo from './_components/CardVeiculo'
import CardFuncionalidade from './_components/CardFuncionalidade'
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts'

export default function Garage() {
  AuthUser()
  const router = useRouter()
  const dispatch = useDispatch()
  const user: UsuarioType = useSelector((state: any) => state.userReducer)
  const data = [
    { name: 'Jan', value: 350 },
    { name: 'Fev', value: 420 },
    { name: 'Mar', value: 300 },
    { name: 'Abr', value: 500 },
    { name: 'Mai', value: 470 }
  ]

  return (
    <BaseLayout title="Garage">
      {/* Veículos */}
      <div className="max-h-[250px] overflow-x-scroll transition-all animate-slide-up">
        <Subtitle
          title="Meu Veículos"
          icon={<ListBullets size={20} className="text-black" />}
        />

        <CardVeiculo placa="SXA2F08" veiculo="Onix LTZ" hodometro="11.022" />
      </div>

      {/* Funcionalidades */}
      <div className="mt-5 transition-all animate-slide-up">
        <Subtitle
          title="Funcionalidades"
          icon={<GearSix size={20} className="text-black" />}
        />

        <div className="grid grid-cols-3 gap-3 transition-all animate-slide-up">
          <CardFuncionalidade
            className="bg-red-200 hover:bg-red-300 active:bg-red-200"
            onClick={() => {
              router.push('/garage/abastecimentos')
            }}
            icon={<GasPump size={40} className="text-red-600" />}
          />

          <CardFuncionalidade
            className="bg-blue-200 hover:bg-blue-300 active:bg-blue-200"
            onClick={() => {
              router.push('/garage/manutencoes')
            }}
            icon={<Wrench size={40} className="text-blue-600" />}
          />

          <CardFuncionalidade
            className="bg-green-200 hover:bg-green-300 active:bg-green-200"
            onClick={() => {
              router.push('/garage/despesas')
            }}
            icon={<CurrencyCircleDollar size={40} className="text-green-600" />}
          />
        </div>
      </div>

      {/* Gastos */}
      <div className="mt-5 transition-all animate-slide-up">
        <Subtitle
          title="Gastos"
          icon={<CurrencyCircleDollar size={20} className="text-black" />}
        />

        {/* Gastos com Abastecimentos */}
        <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 mb-3">
          {/* Topo com ícone e título */}
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-full w-16 h-16 flex justify-center items-center shadow-inner">
              <GasPump size={28} className="text-red-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-800">
                Abastecimentos
              </span>
              <span className="text-sm text-gray-500 mt-1">
                Total gasto:{' '}
                <strong className="text-red-600">R$ 2.040,00</strong>
              </span>
            </div>
          </div>

          {/* Gráfico de barras */}
          <div className="w-full h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <Bar dataKey="value" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gastos com Manutenções */}
        <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 mb-3">
          {/* Topo com ícone e título */}
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex justify-center items-center shadow-inner">
              <Wrench size={28} className="text-blue-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-800">
                Manutenções
              </span>
              <span className="text-sm text-gray-500 mt-1">
                Total gasto:{' '}
                <strong className="text-blue-600">R$ 2.040,00</strong>
              </span>
            </div>
          </div>

          {/* Gráfico de barras */}
          <div className="w-full h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <Bar dataKey="value" fill="#155dfc" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gastos com Despesas */}
        <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 mb-3">
          {/* Topo com ícone e título */}
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full w-16 h-16 flex justify-center items-center shadow-inner">
              <CurrencyCircleDollar size={28} className="text-green-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-800">
                Despesas
              </span>
              <span className="text-sm text-gray-500 mt-1">
                Total gasto:{' '}
                <strong className="text-green-600">R$ 2.040,00</strong>
              </span>
            </div>
          </div>

          {/* Gráfico de barras */}
          <div className="w-full h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <Bar dataKey="value" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}
