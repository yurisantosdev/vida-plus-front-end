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
  CurrencyCircleDollar,
  GasPump,
  Gauge,
  ListBullets,
  Tag
} from '@phosphor-icons/react'
import CardVeiculo from '../_components/CardVeiculo'
import InputComponent from '@/components/Input'
import { useForm } from 'react-hook-form'
import { AbastecimentosType } from '@/types/AbastecimentosType'
import TextRequired from '@/components/TextRequired'
import { Button } from '@/components/Button'
import toast from 'react-hot-toast'
import { setLoading } from '@/redux/loading/actions'
import { FormatarValorEmReais } from '@/services/formatters'

export default function Abastecimentos() {
  AuthUser()
  const {
    handleSubmit,
    register,
    setValue,
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
      abquando: ''
    }
  })
  const router = useRouter()
  const dispatch = useDispatch()
  const [veiculoSelecionado, setVeiculoSelecionado] = useState<string>('')
  const [valorTotal, setValorTotal] = useState<number>(0)
  const user: UsuarioType = useSelector((state: any) => state.userReducer)

  async function onSalvarAbastecimento(data: AbastecimentosType) {
    dispatch(setLoading(true))

    if (veiculoSelecionado.length <= 0) {
      toast('Selecione um veículo!')
      dispatch(setLoading(false))
      return
    }

    data.abveiculo = veiculoSelecionado
    data.abvalortotal = parseFloat(valorTotal.toFixed(2))

    toast.success('Abastecimento registrado com sucesso!')

    console.log(data)

    setTimeout(() => {
      dispatch(setLoading(false))
    }, 1000)
  }

  useEffect(() => {
    setValorTotal(watch('ablitros') * watch('abvalorlitro'))
  }, [watch('abvalorlitro'), watch('ablitros')])

  return (
    <BaseLayout title="Abastecimentos" navbar={false} voltar>
      <div className="max-h-[250px] overflow-x-scroll transition-all animate-slide-up">
        <Subtitle
          title="Selecione um Veículo"
          icon={<ListBullets size={20} className="text-black" />}
        />

        <CardVeiculo
          placa="SXA2F08"
          veiculo="Onix LTZ"
          hodometro="11.022"
          acess={false}
          select={veiculoSelecionado == 'SXA2F08'}
          onClick={() => {
            setVeiculoSelecionado('SXA2F08')
          }}
        />
      </div>

      <div className="mt-5 transition-all animate-slide-up">
        <Subtitle
          title="Informações do Abastecimento"
          icon={<GasPump size={20} className="text-black" />}
        />

        {/* Valor total */}
        <div className="mt-1 mb-3 text-center bg-gray-100 rounded-md border border-gray-200">
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
              required: true,
              min: {
                value: 0.01,
                message: 'Informe um valor maior que zero'
              }
            })}
            textError={
              errors.ablitros && (
                <span className="text-red-600 text-sm">
                  {errors.ablitros.message ? (
                    <TextRequired title={errors.ablitros.message} />
                  ) : (
                    <TextRequired />
                  )}
                </span>
              )
            }
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
              required: true,
              min: {
                value: 0.01,
                message: 'Informe um valor maior que zero'
              }
            })}
            textError={
              errors.abvalorlitro && (
                <span className="text-red-600 text-sm">
                  {errors.abvalorlitro.message ? (
                    <TextRequired title={errors.abvalorlitro.message} />
                  ) : (
                    <TextRequired />
                  )}
                </span>
              )
            }
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
              required: true,
              min: {
                value: 0.01,
                message: 'Informe um valor maior que zero'
              }
            })}
            textError={
              errors.abhodometro && (
                <span className="text-red-600 text-sm">
                  {errors.abhodometro.message ? (
                    <TextRequired title={errors.abhodometro.message} />
                  ) : (
                    <TextRequired />
                  )}
                </span>
              )
            }
            error={errors.abhodometro}
          />
        </div>

        {/* Quando */}
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
          onClick={handleSubmit(onSalvarAbastecimento)}
          className="bg-green-600 hover:bg-green-500 active:bg-green-600 w-full"
        />
      </div>
    </BaseLayout>
  )
}
