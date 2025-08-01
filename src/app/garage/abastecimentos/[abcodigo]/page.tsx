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
  PencilSimple,
  Info,
  Plus
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
  createAbastecimento
} from '@/store/Abastecimentos'
import { VeiculosType } from '@/types/VeiculosType'
import {
  findAllVeiculos,
  findVeiculo as findVeiculoById
} from '@/store/Veiculos'
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
  const [abcodigo, setAbcodigo] = useState<string>('')
  const [veiculoSelecionado, setVeiculoSelecionado] = useState<string>('')
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

      data.abusuario = user.uscodigo
      data.abvalortotal = parseFloat(valorTotal.toFixed(2))
      data.abhodometro = parseInt(data.abhodometro, 10)
      data.abvalorlitro = parseFloat(data.abvalorlitro)
      data.ablitros = parseFloat(data.ablitros)
      data.abveiculo = veiculoSelecionado

      if (abcodigo != '0') {
        data.abcodigo = abcodigo

        const response = await updateAbastecimento(data)

        if (response != undefined) {
          toast.success('Abastecimento atualizado com sucesso!')
          reset()
          router.back()
          await carregarAbastecimento()
        }

        dispatch(setLoading(false))
      } else {
        const response = await createAbastecimento(data)

        if (response != undefined) {
          toast.success('Abastecimento registrado com sucesso!')
          reset()
          router.back()
        }
      }
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
            setVeiculoSelecionado(veiculoResponse.veiculo.vecodigo)
          }
        }
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
    <BaseLayout
      title={
        abcodigo == '0' ? 'Cadastro de Abastecimento' : 'Editar Abastecimento'
      }
      navbar={false}
      voltar>
      {/* Informações do Veículo */}
      <div className="transition-all animate-slide-up">
        <Subtitle
          title="Veículo"
          icon={<GasPump size={20} className="text-black" />}
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
            title={abcodigo == '0' ? 'Cadastrar' : 'Atualizar'}
            onClick={handleSubmit(onSalvarAbastecimento)}
            className="bg-green-600 hover:bg-green-500 active:bg-green-600 w-full"
          />
        </div>
      </div>
    </BaseLayout>
  )
}
