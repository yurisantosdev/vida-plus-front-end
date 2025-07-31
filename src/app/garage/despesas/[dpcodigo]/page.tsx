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
  Car,
  CurrencyDollar,
  Gauge,
  Tag,
  Trash
} from '@phosphor-icons/react'
import InputComponent from '@/components/Input'
import { useForm } from 'react-hook-form'
import TextRequired from '@/components/TextRequired'
import { Button } from '@/components/Button'
import toast from 'react-hot-toast'
import { setLoading } from '@/redux/loading/actions'
import { DespesasType } from '@/types/DespesasType'
import { VeiculosType } from '@/types/VeiculosType'
import { updateDespesa, findDespesa, deleteDespesa } from '@/store/Despesas'
import { findVeiculo } from '@/store/Veiculos'
import Modal from '@/components/Modal'
import { CLickLabel } from '@/services/clickLabel'
import CardVeiculo from '../../_components/CardVeiculo'
import SelectComponent from '@/components/Select'

interface PageProps {
  params: Promise<{ dpcodigo: string }>
}

export default function EditarDespesa({ params }: PageProps) {
  AuthUser()
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<DespesasType>({
    defaultValues: {
      dpcodigo: '',
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
  const user: UsuarioType = useSelector((state: any) => state.userReducer)
  const [dpcodigo, setDpcodigo] = useState<string>('')
  const [veiculo, setVeiculo] = useState<VeiculosType | null>(null)

  const categoriasDespesas = [
    { value: 'ESTACIONAMENTO', label: 'Estacionamento' },
    { value: 'MULTA', label: 'Multa' },
    { value: 'LAVAGEM', label: 'Lavagem' },
    { value: 'SEGURO', label: 'Seguro' },
    { value: 'OUTRO', label: 'Outro' }
  ]

  async function onSalvarDespesa(data: DespesasType) {
    if (user.uscodigo && dpcodigo) {
      dispatch(setLoading(true))

      data.dpcodigo = dpcodigo
      data.dpusuario = user.uscodigo
      data.dpvalor = parseFloat(data.dpvalor.toString())
      data.dphodometro = parseFloat(data.dphodometro.toString())

      if (data.dpquando) {
        data.dpquando = new Date(data.dpquando).toISOString()
      }

      const response = await updateDespesa(data)

      if (response != undefined) {
        toast.success('Despesa atualizada com sucesso!')
        router.back()
      }

      dispatch(setLoading(false))
    }
  }

  async function carregarDespesa() {
    if (dpcodigo) {
      dispatch(setLoading(true))
      const response = await findDespesa(dpcodigo)

      if (response != undefined) {
        const despesa = response.despesa

        const dataFormatada = despesa.dpquando
          ? new Date(despesa.dpquando).toISOString().split('T')[0]
          : ''

        reset({
          dpcodigo: despesa.dpcodigo || '',
          dpveiculo: despesa.dpveiculo || '',
          dpdescricao: despesa.dpdescricao || '',
          dpcategoria: despesa.dpcategoria || '',
          dpvalor: despesa.dpvalor || 0,
          dpquando: dataFormatada,
          dpusuario: despesa.dpusuario || '',
          dphodometro: despesa.dphodometro || 0
        })

        // Carregar informações do veículo
        if (despesa.dpveiculo) {
          const veiculoResponse = await findVeiculo(despesa.dpveiculo)
          if (veiculoResponse != undefined && veiculoResponse.veiculo) {
            setVeiculo(veiculoResponse.veiculo)
          }
        }
      } else {
        toast.error('Erro ao carregar dados da despesa')
      }

      dispatch(setLoading(false))
    }
  }

  async function onDeletarDespesa() {
    if (dpcodigo) {
      dispatch(setLoading(true))
      const response = await deleteDespesa(dpcodigo)

      if (response != undefined) {
        CLickLabel('modalDeletarDespesa')
        toast.success('Despesa excluída com sucesso!')
        router.back()
      }

      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setDpcodigo(resolvedParams.dpcodigo)
    }
    getParams()
  }, [params])

  useEffect(() => {
    if (dpcodigo) {
      carregarDespesa()
    }
  }, [dpcodigo])

  if (!dpcodigo) {
    return (
      <BaseLayout title="Editar Despesa" navbar={false} voltar>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Carregando...</p>
        </div>
      </BaseLayout>
    )
  }

  return (
    <span>
      <BaseLayout title="Editar Despesa" navbar={false} voltar>
        {/* Informações do Veículo */}
        {veiculo && (
          <div className="transition-all animate-slide-up mb-5">
            <Subtitle
              title="Veículo"
              icon={<Car size={20} className="text-black" />}
            />
            <CardVeiculo
              placa={veiculo.veplaca}
              veiculo={veiculo.venome}
              hodometro={veiculo.vehodometro}
              acess={false}
              select={true}
            />
          </div>
        )}

        {/* Formulário de Edição */}
        <div className="transition-all animate-slide-up">
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

        {/* Botões */}
        <div className="mt-5 transition-all animate-slide-up flex justify-center items-center gap-2">
          <Button
            title="Excluir"
            className="bg-red-600 hover:bg-red-500 active:bg-red-600 w-full"
            iconRight={<Trash size={20} />}
            onClick={() => {
              CLickLabel('modalDeletarDespesa')
            }}
          />
          <Button
            title="Salvar"
            onClick={handleSubmit(onSalvarDespesa)}
            className="bg-green-600 hover:bg-green-500 active:bg-green-600 w-full"
          />
        </div>
      </BaseLayout>

      {/* Modal de Confirmação de Exclusão */}
      <Modal
        htmlFor="modalDeletarDespesa"
        name="Excluir Despesa"
        loading={false}
        functioReset={() => {
          CLickLabel('modalDeletarDespesa')
        }}
        descricao="">
        <div className="flex flex-col gap-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <CurrencyDollar size={24} className="text-red-600" />
              </div>
              <div>
                <h4 className="text-red-800 font-semibold mb-2">
                  Atenção: Exclusão Permanente
                </h4>
                <p className="text-red-700 text-sm leading-relaxed">
                  Ao excluir esta despesa,{' '}
                  <strong>
                    todos os dados relacionados serão permanentemente removidos
                  </strong>
                  , incluindo:
                </p>
                <ul className="text-red-700 text-sm mt-2 space-y-1 list-disc list-inside">
                  <li>Descrição da despesa</li>
                  <li>Categoria</li>
                  <li>Valor gasto</li>
                  <li>Data da despesa</li>
                  <li>Hodômetro registrado</li>
                </ul>
                <p className="text-red-700 text-sm mt-3 font-medium">
                  <strong>Esta ação não pode ser desfeita.</strong> Você tem
                  certeza que deseja continuar?
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-3">
            <Button
              title="Cancelar"
              className="bg-gray-600 hover:bg-gray-500 active:bg-gray-600 w-full"
              onClick={() => {
                CLickLabel('modalDeletarDespesa')
              }}
            />
            <Button
              title="Sim"
              className="bg-red-600 hover:bg-red-500 active:bg-red-600 w-full"
              onClick={onDeletarDespesa}
            />
          </div>
        </div>
      </Modal>
    </span>
  )
}
