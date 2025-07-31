'use client'
import { AuthUser } from '@/services/auth'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UsuarioType } from '@/types/UsuariosType'
import { useRouter } from 'next/navigation'
import BaseLayout from '@/templates/BaseLayout'
import Subtitle from '@/components/Subtitle'
import { Car, Gauge, IdentificationCard } from '@phosphor-icons/react'
import InputComponent from '@/components/Input'
import { useForm } from 'react-hook-form'
import TextRequired from '@/components/TextRequired'
import { Button } from '@/components/Button'
import toast from 'react-hot-toast'
import { setLoading } from '@/redux/loading/actions'
import { VeiculosType } from '@/types/VeiculosType'
import { createVeiculo } from '@/store/Veiculos'

export default function Cadastro() {
  AuthUser()
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<VeiculosType>({
    defaultValues: {
      veplaca: '',
      veusuario: '',
      venome: '',
      vehodometro: 0
    }
  })
  const router = useRouter()
  const dispatch = useDispatch()
  const user: UsuarioType = useSelector((state: any) => state.userReducer)

  async function onSalvarVeiculo(data: VeiculosType) {
    if (user.uscodigo) {
      dispatch(setLoading(true))
      data.veusuario = user.uscodigo
      data.vehodometro = parseInt(data.vehodometro, 10)

      const response = await createVeiculo(data)

      if (response != undefined) {
        toast.success('Veículo registrado com sucesso!')
        reset()
        router.back()
      }

      dispatch(setLoading(false))
    }
  }

  return (
    <BaseLayout title="Cadastro de Veículo" navbar={false} voltar>
      <div className="mt-5 transition-all animate-slide-up">
        <Subtitle
          title="Informações do Veículo"
          icon={<Car size={20} className="text-black" />}
        />

        {/* Nome */}
        <div className="mt-1">
          <InputComponent
            id="venome"
            placeholder="Informe o nome"
            className="w-full bg-gray-50 text-gray-900 transition-all duration-300 focus:ring-2 focus:ring-orange-1000/50 mb-4"
            icon={<IdentificationCard size={22} className="text-gray-500" />}
            textLabel="Nome"
            styleLabel="text-gray-700 font-medium"
            requiredItem
            {...register('venome', {
              required: true
            })}
            textError={errors.venome && <TextRequired />}
            error={errors.venome}
          />
        </div>

        {/* Placa */}
        <div className="mt-1">
          <InputComponent
            id="veplaca"
            placeholder="Informe a placa"
            className="w-full bg-gray-50 text-gray-900 transition-all duration-300 focus:ring-2 focus:ring-orange-1000/50 mb-4"
            icon={<Car size={22} className="text-gray-500" />}
            textLabel="Placa"
            styleLabel="text-gray-700 font-medium"
            requiredItem
            {...register('veplaca', {
              required: true
            })}
            textError={errors.veplaca && <TextRequired />}
            error={errors.veplaca}
          />
        </div>

        {/* Hodômetro Atual */}
        <div className="mt-1">
          <InputComponent
            id="vehodometro"
            type="number"
            placeholder="Informe o hodômetro atual"
            className="w-full bg-gray-50 text-gray-900 transition-all duration-300 focus:ring-2 focus:ring-orange-1000/50 mb-4"
            icon={<Gauge size={22} className="text-gray-500" />}
            textLabel="Hodômetro Atual"
            styleLabel="text-gray-700 font-medium"
            requiredItem
            {...register('vehodometro', {
              required: true
            })}
            textError={errors.vehodometro && <TextRequired />}
            error={errors.vehodometro}
          />
        </div>
      </div>

      <div className="mt-5 transition-all animate-slide-up flex justify-center items-center gap-2">
        <Button
          title="Cancelar"
          className="bg-red-600 hover:bg-red-500 active:bg-red-600 w-full"
          onClick={() => {
            reset()
            router.back()
          }}
        />
        <Button
          title="Salvar"
          onClick={handleSubmit(onSalvarVeiculo)}
          className="bg-green-600 hover:bg-green-500 active:bg-green-600 w-full"
        />
      </div>
    </BaseLayout>
  )
}
