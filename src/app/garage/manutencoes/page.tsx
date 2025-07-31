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
  Info,
  ListBullets,
  Plus,
  Tag
} from '@phosphor-icons/react'
import CardVeiculo from '../_components/CardVeiculo'
import InputComponent from '@/components/Input'
import { useForm } from 'react-hook-form'
import TextRequired from '@/components/TextRequired'
import { Button } from '@/components/Button'
import toast from 'react-hot-toast'
import { setLoading } from '@/redux/loading/actions'
import { findAllVeiculos } from '@/store/Veiculos'
import { VeiculosType } from '@/types/VeiculosType'
import { ManutencoesType } from '@/types/ManutencoesType'
import { createManutencao } from '@/store/Manutencoes'

export default function Manutencoes() {
  AuthUser()
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<ManutencoesType>({
    defaultValues: {
      mtveiculo: '',
      mttitle: '',
      mtdescricao: '',
      mtvalor: 0,
      mtquando: '',
      mtusuario: '',
      mthodometro: 0
    }
  })
  const router = useRouter()
  const dispatch = useDispatch()
  const [veiculoSelecionado, setVeiculoSelecionado] = useState<string>('')
  const user: UsuarioType = useSelector((state: any) => state.userReducer)
  const [veiculos, setVeiculos] = useState<VeiculosType[]>([])

  async function onSalvarManutencao(data: ManutencoesType) {
    if (user.uscodigo) {
      dispatch(setLoading(true))

      if (veiculoSelecionado.length <= 0) {
        toast('Selecione um veículo!')
        dispatch(setLoading(false))
        return
      }

      data.mtveiculo = veiculoSelecionado
      data.mtusuario = user.uscodigo
      data.mtvalor = parseFloat(data.mtvalor)
      data.mthodometro = parseFloat(data.mthodometro)

      const response = await createManutencao(data)

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

  return (
    <BaseLayout title="Manutenções" navbar={false} voltar>
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

      <div className="mt-5 transition-all animate-slide-up">
        <Subtitle
          title="Informações da Manutenção"
          icon={<GasPump size={20} className="text-black" />}
        />

        {/* Título */}
        <div className="mt-1">
          <InputComponent
            id="mttitle"
            placeholder="Informe um título"
            className="w-full bg-gray-50 text-gray-900 transition-all duration-300 focus:ring-2 focus:ring-orange-1000/50 mb-4"
            icon={<GasPump size={22} className="text-gray-500" />}
            textLabel="Título"
            styleLabel="text-gray-700 font-medium"
            requiredItem
            {...register('mttitle', {
              required: true
            })}
            textError={errors.mttitle && <TextRequired />}
            error={errors.mttitle}
          />
        </div>

        {/* Descrição */}
        <div className="mt-1">
          <InputComponent
            id="mtdescricao"
            placeholder="Informe uma descrição"
            className="w-full bg-gray-50 text-gray-900 transition-all duration-300 focus:ring-2 focus:ring-orange-1000/50 mb-4"
            icon={<Tag size={22} className="text-gray-500" />}
            textLabel="Descrição"
            styleLabel="text-gray-700 font-medium"
            requiredItem
            {...register('mtdescricao', {
              required: true
            })}
            textError={errors.mtdescricao && <TextRequired />}
            error={errors.mtdescricao}
          />
        </div>

        {/* Valor */}
        <div className="mt-1">
          <InputComponent
            id="mtvalor"
            type="number"
            placeholder="Informe o valor"
            className="w-full bg-gray-50 text-gray-900 transition-all duration-300 focus:ring-2 focus:ring-orange-1000/50 mb-4"
            icon={<Gauge size={22} className="text-gray-500" />}
            textLabel="Valor"
            styleLabel="text-gray-700 font-medium"
            requiredItem
            {...register('mtvalor', {
              required: true
            })}
            textError={errors.mtvalor && <TextRequired />}
            error={errors.mtvalor}
          />
        </div>

        {/* HODÔMETRO */}
        <div className="mt-1">
          <InputComponent
            id="mthodometro"
            type="number"
            placeholder="Informe o hodômetro"
            className="w-full bg-gray-50 text-gray-900 transition-all duration-300 focus:ring-2 focus:ring-orange-1000/50 mb-4"
            icon={<Gauge size={22} className="text-gray-500" />}
            textLabel="Hodômetro"
            styleLabel="text-gray-700 font-medium"
            requiredItem
            {...register('mthodometro', {
              required: true
            })}
            textError={errors.mthodometro && <TextRequired />}
            error={errors.mthodometro}
          />
        </div>

        {/* Quando */}
        <div className="mt-1">
          <InputComponent
            id="mtquando"
            type="date"
            placeholder="Informe a data"
            className="w-full bg-gray-50 text-gray-900 transition-all duration-300 focus:ring-2 focus:ring-orange-1000/50 mb-4"
            icon={<CalendarDots size={22} className="text-gray-500" />}
            textLabel="Data"
            styleLabel="text-gray-700 font-medium"
            requiredItem
            {...register('mtquando', {
              required: true
            })}
            textError={errors.mtquando && <TextRequired />}
            error={errors.mtquando}
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
          onClick={handleSubmit(onSalvarManutencao)}
          className="bg-green-600 hover:bg-green-500 active:bg-green-600 w-full"
        />
      </div>
    </BaseLayout>
  )
}
