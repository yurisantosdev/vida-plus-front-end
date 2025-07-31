import React from 'react'
import CardFuncionalidade from './CardFuncionalidade'
import {
  CurrencyCircleDollar,
  GasPump,
  GearSix,
  Wrench
} from '@phosphor-icons/react'
import Subtitle from '@/components/Subtitle'
import { useRouter } from 'next/navigation'

export default function FuncionalidadesGarage() {
  const router = useRouter()

  return (
    <div className="transition-all animate-slide-up">
      <Subtitle
        title="Funcionalidades"
        icon={<GearSix size={20} className="text-black" />}
      />

      <div className="grid grid-cols-3 gap-3 transition-all animate-slide-up">
        {/* Cadastrar abastecimento */}
        <CardFuncionalidade
          className="bg-red-200 hover:bg-red-300 active:bg-red-200"
          onClick={() => {
            router.push('/garage/abastecimentos')
          }}
          icon={<GasPump size={40} className="text-red-600" />}
        />

        {/* Cadastrar manutenções */}
        <CardFuncionalidade
          className="bg-blue-200 hover:bg-blue-300 active:bg-blue-200"
          onClick={() => {
            router.push('/garage/manutencoes')
          }}
          icon={<Wrench size={40} className="text-blue-600" />}
        />

        {/* Cadastrar despesas */}
        <CardFuncionalidade
          className="bg-green-200 hover:bg-green-300 active:bg-green-200"
          onClick={() => {
            router.push('/garage/despesas')
          }}
          icon={<CurrencyCircleDollar size={40} className="text-green-600" />}
        />
      </div>
    </div>
  )
}
