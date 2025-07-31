'use client'
import { AuthUser } from '@/services/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UsuarioType } from '@/types/UsuariosType'
import { useRouter } from 'next/navigation'
import BaseLayout from '@/templates/BaseLayout'
import Subtitle from '@/components/Subtitle'
import {
  CalendarDots,
  GasPump,
  Gauge,
  Tag,
  PencilSimple
} from '@phosphor-icons/react'
import InputComponent from '@/components/Input'
import { useForm } from 'react-hook-form'
import { AbastecimentosType } from '@/types/AbastecimentosType'
import TextRequired from '@/components/TextRequired'
import { Button } from '@/components/Button'
import toast from 'react-hot-toast'
import { setLoading } from '@/redux/loading/actions'
import { FormatarValorEmReais } from '@/services/formatters'
import {
  findVeiculo,
  updateAbastecimento,
  deleteAbastecimento
} from '@/store/Abastecimentos'
import { VeiculosType } from '@/types/VeiculosType'
import { findVeiculo as findVeiculoById } from '@/store/Veiculos'
import CardVeiculo from '../../_components/CardVeiculo'

interface PageProps {
  params: Promise<{ abcodigo: string }>
}

export default function EditarAbastecimento({ params }: PageProps) {
  AuthUser()
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors }
  } = useForm<AbastecimentosType>({
    defaultValues: {
      abvalortotal: 0,
      ablitros: 0,
      abvalorlitro: 0,
      abveiculo: '',
      abhodometro: 0,
      abquando: '',
      abusuario: ''
    }
  })
  const router = useRouter()
  const dispatch = useDispatch()
  const [valorTotal, setValorTotal] = useState<number>(0)
  const [isEditing, setIsEditing] = useState(false)
  const [abcodigo, setAbcodigo] = useState<string>('')
  const [veiculo, setVeiculo] = useState<VeiculosType | null>(null)
  const user: UsuarioType = useSelector((state: any) => state.userReducer)

  async function onSalvarAbastecimento(data: AbastecimentosType) {
    if (user.uscodigo && abcodigo) {
      dispatch(setLoading(true))

      data.abcodigo = abcodigo
      data.abusuario = user.uscodigo
      data.abvalortotal = parseFloat(valorTotal.toFixed(2))
      data.abhodometro = parseInt(data.abhodometro, 10)
      data.abvalorlitro = parseFloat(data.abvalorlitro)
      data.ablitros = parseFloat(data.ablitros)

      const response = await updateAbastecimento(data)

      if (response != undefined) {
        reset()
        router.back()
        toast.success('Abastecimento atualizado com sucesso!')
        setIsEditing(false)
        await carregarAbastecimento()
      }

      dispatch(setLoading(false))
    }
  }

  async function carregarAbastecimento() {
    if (abcodigo) {
      dispatch(setLoading(true))
      const response = await findVeiculo(abcodigo)

      if (response != undefined && response.abastecimento) {
        const abastecimento = response.abastecimento
        reset({
          abvalortotal: abastecimento.abvalortotal,
          ablitros: abastecimento.ablitros,
          abvalorlitro: abastecimento.abvalorlitro,
          abveiculo: abastecimento.abveiculo,
          abhodometro: abastecimento.abhodometro,
          abquando: abastecimento.abquando,
          abusuario: abastecimento.abusuario
        })
        setValorTotal(abastecimento.abvalortotal)

        if (abastecimento.abveiculo) {
          const veiculoResponse = await findVeiculoById(abastecimento.abveiculo)
          if (veiculoResponse != undefined) {
            setVeiculo(veiculoResponse.veiculo)
          }
        }
      }

      dispatch(setLoading(false))
    }
  }

  async function onDeletarAbastecimento() {
    if (abcodigo) {
      dispatch(setLoading(true))
      const response = await deleteAbastecimento(abcodigo)

      if (response != undefined) {
        toast.success('Abastecimento excluído com sucesso!')
        router.back()
      }

      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setAbcodigo(resolvedParams.abcodigo)
    }
    getParams()
  }, [params])

  useEffect(() => {
    if (abcodigo) {
      carregarAbastecimento()
    }
  }, [abcodigo])

  useEffect(() => {
    setValorTotal(watch('ablitros') * watch('abvalorlitro'))
  }, [watch('abvalorlitro'), watch('ablitros')])

  if (!abcodigo) {
    return (
      <BaseLayout title="Editar Abastecimento" navbar={false} voltar>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Carregando...</p>
        </div>
      </BaseLayout>
    )
  }

  if (!veiculo) {
    return (
      <BaseLayout title="Editar Abastecimento" navbar={false} voltar>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Carregando...</p>
        </div>
      </BaseLayout>
    )
  }

  return (
    <BaseLayout title="Editar Abastecimento" navbar={false} voltar>
      {/* Informações do Veículo */}
      <div className="transition-all animate-slide-up">
        <Subtitle
          title="Veículo"
          icon={<GasPump size={20} className="text-black" />}
        />

        <CardVeiculo
          veiculo={veiculo.venome}
          placa={veiculo.veplaca}
          hodometro={veiculo.vehodometro}
          select={true}
          acess={false}
        />
      </div>

      {/* Formulário de Edição */}
      <div className="transition-all animate-slide-up">
        <Subtitle
          title="Editar Abastecimento"
          icon={<PencilSimple size={20} className="text-black" />}
        />

        {/* Valor total */}
        <div className="mt-1 mb-3 text-center bg-gray-100 rounded-2xl border border-gray-200">
          <p className="text-black font-bold">Valor Total</p>
          <p className="text-black text-xl">
            {FormatarValorEmReais(valorTotal)}
          </p>
        </div>

        {/* Litragem */}
        <div className="mt-1">
          <InputComponent
            id="ablitros"
            type="number"
            placeholder="Informe a litragem"
            className="w-full bg-gray-50 text-gray-900 transition-all duration-300 focus:ring-2 focus:ring-orange-1000/50 mb-4"
            icon={<GasPump size={22} className="text-gray-500" />}
            textLabel="Litros (L)"
            styleLabel="text-gray-700 font-medium"
            requiredItem
            {...register('ablitros', {
              required: true
            })}
            textError={errors.ablitros && <TextRequired />}
            error={errors.ablitros}
          />
        </div>

        {/* Preço */}
        <div className="mt-1">
          <InputComponent
            id="abvalorlitro"
            type="number"
            placeholder="Informe o preço por litro"
            className="w-full bg-gray-50 text-gray-900 transition-all duration-300 focus:ring-2 focus:ring-orange-1000/50 mb-4"
            icon={<Tag size={22} className="text-gray-500" />}
            textLabel="Preço (R$/L)"
            styleLabel="text-gray-700 font-medium"
            requiredItem
            {...register('abvalorlitro', {
              required: true
            })}
            textError={errors.abvalorlitro && <TextRequired />}
            error={errors.abvalorlitro}
          />
        </div>

        {/* Hodômetro */}
        <div className="mt-1">
          <InputComponent
            id="abhodometro"
            type="number"
            placeholder="Informe o hodômetro"
            className="w-full bg-gray-50 text-gray-900 transition-all duration-300 focus:ring-2 focus:ring-orange-1000/50 mb-4"
            icon={<Gauge size={22} className="text-gray-500" />}
            textLabel="Hodômetro"
            styleLabel="text-gray-700 font-medium"
            requiredItem
            {...register('abhodometro', {
              required: true
            })}
            textError={errors.abhodometro && <TextRequired />}
            error={errors.abhodometro}
          />
        </div>

        {/* Data */}
        <div className="mt-1">
          <InputComponent
            id="abquando"
            type="date"
            placeholder="Informe a data"
            className="w-full bg-gray-50 text-gray-900 transition-all duration-300 focus:ring-2 focus:ring-orange-1000/50 mb-4"
            icon={<CalendarDots size={22} className="text-gray-500" />}
            textLabel="Data"
            styleLabel="text-gray-700 font-medium"
            requiredItem
            {...register('abquando', {
              required: true
            })}
            textError={errors.abquando && <TextRequired />}
            error={errors.abquando}
          />
        </div>

        {/* Botões */}
        <div className="mt-5 flex justify-center items-center gap-2">
          <Button
            title="Cancelar"
            className="bg-red-600 hover:bg-red-500 active:bg-red-600 w-full"
            onClick={() => {
              router.back()
            }}
          />
          <Button
            title="Atualizar"
            onClick={handleSubmit(onSalvarAbastecimento)}
            className="bg-green-600 hover:bg-green-500 active:bg-green-600 w-full"
          />
        </div>
      </div>
    </BaseLayout>
  )
}
