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
  CurrencyDollar,
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
import { DespesasType } from '@/types/DespesasType'
import { createDespesa } from '@/store/Despesas'
import SelectComponent from '@/components/Select'

export default function Despesas() {
  AuthUser()
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<DespesasType>({
    defaultValues: {
      dpveiculo: '',
      dpdescricao: '',
      dpcategoria: '',
      dpvalor: 0,
      dpquando: '',
      dphodometro: 0,
      dpusuario: ''
    }
  })
  const router = useRouter()
  const dispatch = useDispatch()
  const [veiculoSelecionado, setVeiculoSelecionado] = useState<string>('')
  const user: UsuarioType = useSelector((state: any) => state.userReducer)
  const [veiculos, setVeiculos] = useState<VeiculosType[]>([])

  const categoriasDespesas = [
    { value: 'ESTACIONAMENTO', label: 'Estacionamento' },
    { value: 'MULTA', label: 'Multa' },
    { value: 'LAVAGEM', label: 'Lavagem' },
    { value: 'SEGURO', label: 'Seguro' },
    { value: 'OUTRO', label: 'Outro' }
  ]

  async function onSalvarDespesa(data: DespesasType) {
    if (user.uscodigo) {
      dispatch(setLoading(true))

      if (veiculoSelecionado.length <= 0) {
        toast('Selecione um veículo!')
        dispatch(setLoading(false))
        return
      }

      data.dpveiculo = veiculoSelecionado
      data.dpusuario = user.uscodigo
      data.dpvalor = parseFloat(data.dpvalor.toString())
      data.dphodometro = parseFloat(data.dphodometro.toString())

      const response = await createDespesa(data)

      if (response != undefined) {
        toast.success('Despesa registrada com sucesso!')
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
    <BaseLayout title="Despesas" navbar={false} voltar>
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
          title="Informações da Despesa"
          icon={<CurrencyDollar size={20} className="text-black" />}
        />

        {/* Descrição */}
        <div className="mt-1">
          <InputComponent
            id="dpdescricao"
            placeholder="Informe uma descrição"
            className="w-full bg-gray-50 text-gray-900 transition-all duration-300 focus:ring-2 focus:ring-orange-1000/50 mb-4"
            icon={<Tag size={22} className="text-gray-500" />}
            textLabel="Descrição"
            styleLabel="text-gray-700 font-medium"
            requiredItem
            {...register('dpdescricao', {
              required: true
            })}
            textError={errors.dpdescricao && <TextRequired />}
            error={errors.dpdescricao}
          />
        </div>

        {/* Categoria */}
        <div className="mt-1">
          <SelectComponent
            id="dpcategoria"
            className="w-full bg-gray-50 text-gray-900 transition-all duration-300 focus:ring-2 focus:ring-orange-1000/50 mb-4"
            icon={<Tag size={22} className="text-gray-500" />}
            textLabel="Categoria"
            styleLabel="text-gray-700 font-medium"
            requiredItem
            options={categoriasDespesas}
            {...register('dpcategoria', {
              required: true
            })}
            textError={errors.dpcategoria && <TextRequired />}
            error={errors.dpcategoria}
          />
        </div>

        {/* Valor */}
        <div className="mt-1">
          <InputComponent
            id="dpvalor"
            type="number"
            step="0.01"
            placeholder="Informe o valor"
            className="w-full bg-gray-50 text-gray-900 transition-all duration-300 focus:ring-2 focus:ring-orange-1000/50 mb-4"
            icon={<CurrencyDollar size={22} className="text-gray-500" />}
            textLabel="Valor"
            styleLabel="text-gray-700 font-medium"
            requiredItem
            {...register('dpvalor', {
              required: true
            })}
            textError={errors.dpvalor && <TextRequired />}
            error={errors.dpvalor}
          />
        </div>

        {/* Hodômetro */}
        <div className="mt-1">
          <InputComponent
            id="dphodometro"
            type="number"
            placeholder="Informe o hodômetro"
            className="w-full bg-gray-50 text-gray-900 transition-all duration-300 focus:ring-2 focus:ring-orange-1000/50 mb-4"
            icon={<Gauge size={22} className="text-gray-500" />}
            textLabel="Hodômetro"
            styleLabel="text-gray-700 font-medium"
            requiredItem
            {...register('dphodometro', {
              required: true
            })}
            textError={errors.dphodometro && <TextRequired />}
            error={errors.dphodometro}
          />
        </div>

        {/* Data */}
        <div className="mt-1">
          <InputComponent
            id="dpquando"
            type="date"
            placeholder="Informe a data"
            className="w-full bg-gray-50 text-gray-900 transition-all duration-300 focus:ring-2 focus:ring-orange-1000/50 mb-4"
            icon={<CalendarDots size={22} className="text-gray-500" />}
            textLabel="Data"
            styleLabel="text-gray-700 font-medium"
            requiredItem
            {...register('dpquando', {
              required: true
            })}
            textError={errors.dpquando && <TextRequired />}
            error={errors.dpquando}
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
          onClick={handleSubmit(onSalvarDespesa)}
          className="bg-green-600 hover:bg-green-500 active:bg-green-600 w-full"
        />
      </div>
    </BaseLayout>
  )
}
