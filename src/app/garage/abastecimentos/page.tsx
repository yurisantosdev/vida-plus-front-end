'use client'
import { AuthUser } from '@/services/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UsuarioType } from '@/types/UsuariosType'
import { useRouter } from 'next/navigation'
import BaseLayout from '@/templates/BaseLayout'
import Subtitle from '@/components/Subtitle'
import {
  GasPump,
  Gauge,
  Info,
  ListBullets,
  Plus,
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
import { findAllVeiculos } from '@/store/Veiculos'
import { VeiculosType } from '@/types/VeiculosType'
import { createAbastecimento } from '@/store/Abastecimentos'
import DatePicker from '@/components/DatePicker'

export default function Abastecimentos() {
  AuthUser()
  const {
    handleSubmit,
    register,
    watch,
    setValue,
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
  const [veiculoSelecionado, setVeiculoSelecionado] = useState<string>('')
  const [valorTotal, setValorTotal] = useState<number>(0)
  const user: UsuarioType = useSelector((state: any) => state.userReducer)
  const [veiculos, setVeiculos] = useState<VeiculosType[]>([])

  async function onSalvarAbastecimento(data: AbastecimentosType) {
    if (user.uscodigo) {
      dispatch(setLoading(true))

      if (veiculoSelecionado.length <= 0) {
        toast('Selecione um veículo!')
        dispatch(setLoading(false))
        return
      }

      data.abveiculo = veiculoSelecionado
      data.abusuario = user.uscodigo
      data.abvalortotal = parseFloat(valorTotal.toFixed(2))
      data.abhodometro = parseInt(data.abhodometro, 10)
      data.abvalorlitro = parseFloat(data.abvalorlitro)
      data.ablitros = parseFloat(data.ablitros)

      const response = await createAbastecimento(data)

      if (response != undefined) {
        toast.success('Abastecimento registrado com sucesso!')
        reset()
        router.back()
      }

      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    const consultaDados = async () => {
      if (user.uscodigo) {
        dispatch(setLoading(true))
        const response = await findAllVeiculos(user.uscodigo)

        if (response != undefined) {
          setVeiculos(response.veiculos)
        }

        dispatch(setLoading(false))
      }
    }

    consultaDados()
  }, [])

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

        <div className="max-h-[250px] overflow-x-scroll mt-5">
          {veiculos.length > 0 ? (
            veiculos.map((veiculo: VeiculosType, index: number) => {
              const isSelect = veiculoSelecionado == veiculo.vecodigo

              return (
                <CardVeiculo
                  key={index}
                  placa={veiculo.veplaca}
                  veiculo={veiculo.venome}
                  hodometro={veiculo.vehodometro}
                  acess={false}
                  select={isSelect}
                  onClick={() => {
                    if (veiculo.vecodigo) {
                      if (veiculoSelecionado == veiculo.vecodigo) {
                        setVeiculoSelecionado('')
                      } else {
                        setVeiculoSelecionado(veiculo.vecodigo)
                      }
                    }
                  }}
                />
              )
            })
          ) : (
            <div>
              <div className="flex items-center justify-center mb-4">
                <Button
                  title="Cadastrar novo veículo"
                  className="bg-black"
                  iconRight={<Plus size={20} />}
                  onClick={() => {
                    router.push('/garage/cadastro')
                  }}
                />
              </div>

              <div className="border rounded-2xl p-4 shadow-sm border-gray-200 bg-white">
                <Info
                  size={40}
                  className="text-black text-center w-full m-auto"
                />
                <p className="text-center text-black">
                  Nenhum veículo cadastrado
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 transition-all animate-slide-up w-full">
        <Subtitle
          title="Informações do Abastecimento"
          icon={<GasPump size={20} className="text-black" />}
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
          <div className="mb-2">
            <label className="text-gray-700 font-medium">
              Data <span className="text-red-500">*</span>
            </label>
          </div>
          <DatePicker
            value={watch('abquando') || ''}
            onChange={(date) => setValue('abquando', date)}
            placeholder="Selecione a data do abastecimento"
            className="w-full"
            required
          />
          {errors.abquando && (
            <div className="mt-1 text-red-500 text-sm">
              <TextRequired />
            </div>
          )}
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
