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
  Gauge,
  Tag,
  Trash,
  Wrench
} from '@phosphor-icons/react'
import InputComponent from '@/components/Input'
import { useForm } from 'react-hook-form'
import TextRequired from '@/components/TextRequired'
import { Button } from '@/components/Button'
import toast from 'react-hot-toast'
import { setLoading } from '@/redux/loading/actions'
import { ManutencoesType } from '@/types/ManutencoesType'
import { VeiculosType } from '@/types/VeiculosType'
import {
  updateManutencao,
  findManutencao,
  deleteManutencao
} from '@/store/Manutencoes'
import { findVeiculo } from '@/store/Veiculos'
import Modal from '@/components/Modal'
import { CLickLabel } from '@/services/clickLabel'
import CardVeiculo from '../../_components/CardVeiculo'

interface PageProps {
  params: Promise<{ mtcodigo: string }>
}

export default function EditarManutencao({ params }: PageProps) {
  AuthUser()
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<ManutencoesType>({
    defaultValues: {
      mtcodigo: '',
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
  const user: UsuarioType = useSelector((state: any) => state.userReducer)
  const [mtcodigo, setMtcodigo] = useState<string>('')
  const [veiculo, setVeiculo] = useState<VeiculosType | null>(null)

  async function onSalvarManutencao(data: ManutencoesType) {
    if (user.uscodigo && mtcodigo) {
      dispatch(setLoading(true))

      data.mtcodigo = mtcodigo
      data.mtusuario = user.uscodigo
      data.mtvalor = parseFloat(data.mtvalor.toString())
      data.mthodometro = parseFloat(data.mthodometro.toString())

      if (data.mtquando) {
        data.mtquando = new Date(data.mtquando).toISOString()
      }

      const response = await updateManutencao(data)

      if (response != undefined) {
        toast.success('Manutenção atualizada com sucesso!')
        router.back()
      }

      dispatch(setLoading(false))
    }
  }

  async function carregarManutencao() {
    if (mtcodigo) {
      dispatch(setLoading(true))
      const response = await findManutencao(mtcodigo)

      if (response != undefined) {
        const manutencao = response.manutencao

        const dataFormatada = manutencao.mtquando
          ? new Date(manutencao.mtquando).toISOString().split('T')[0]
          : ''

        reset({
          mtcodigo: manutencao.mtcodigo,
          mtveiculo: manutencao.mtveiculo,
          mttitle: manutencao.mttitle,
          mtdescricao: manutencao.mtdescricao,
          mtvalor: manutencao.mtvalor,
          mtquando: dataFormatada,
          mtusuario: manutencao.mtusuario,
          mthodometro: manutencao.mthodometro
        })

        // Carregar informações do veículo
        if (manutencao.mtveiculo) {
          const veiculoResponse = await findVeiculo(manutencao.mtveiculo)
          if (veiculoResponse != undefined) {
            setVeiculo(veiculoResponse.veiculo)
          }
        }
      } else {
        toast.error('Erro ao carregar dados da manutenção')
      }

      dispatch(setLoading(false))
    }
  }

  async function onDeletarManutencao() {
    if (mtcodigo) {
      dispatch(setLoading(true))
      const response = await deleteManutencao(mtcodigo)

      if (response != undefined) {
        CLickLabel('modalDeletarManutencao')
        toast.success('Manutenção excluída com sucesso!')
        router.back()
      }

      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setMtcodigo(resolvedParams.mtcodigo)
    }
    getParams()
  }, [params])

  useEffect(() => {
    if (mtcodigo) {
      carregarManutencao()
    }
  }, [mtcodigo])

  if (!mtcodigo) {
    return (
      <BaseLayout title="Editar Manutenção" navbar={false} voltar>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Carregando...</p>
        </div>
      </BaseLayout>
    )
  }

  return (
    <span>
      <BaseLayout title="Editar Manutenção" navbar={false} voltar>
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
            title="Informações da Manutenção"
            icon={<Wrench size={20} className="text-black" />}
          />

          {/* Título */}
          <div className="mt-1">
            <InputComponent
              id="mttitle"
              placeholder="Informe um título"
              className="w-full bg-gray-50 text-gray-900 transition-all duration-300 focus:ring-2 focus:ring-orange-1000/50 mb-4"
              icon={<Wrench size={22} className="text-gray-500" />}
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
              step="0.01"
              placeholder="Informe o valor"
              className="w-full bg-gray-50 text-gray-900 transition-all duration-300 focus:ring-2 focus:ring-orange-1000/50 mb-4"
              icon={<Tag size={22} className="text-gray-500" />}
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

          {/* Hodômetro */}
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

          {/* Data */}
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

        {/* Botões */}
        <div className="mt-5 transition-all animate-slide-up flex justify-center items-center gap-2">
          <Button
            title="Excluir"
            className="bg-red-600 hover:bg-red-500 active:bg-red-600 w-full"
            iconRight={<Trash size={20} />}
            onClick={() => {
              CLickLabel('modalDeletarManutencao')
            }}
          />
          <Button
            title="Salvar"
            onClick={handleSubmit(onSalvarManutencao)}
            className="bg-green-600 hover:bg-green-500 active:bg-green-600 w-full"
          />
        </div>
      </BaseLayout>

      {/* Modal de Confirmação de Exclusão */}
      <Modal
        htmlFor="modalDeletarManutencao"
        name="Excluir Manutenção"
        loading={false}
        functioReset={() => {
          CLickLabel('modalDeletarManutencao')
        }}
        descricao="">
        <div className="flex flex-col gap-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <Wrench size={24} className="text-red-600" />
              </div>
              <div>
                <h4 className="text-red-800 font-semibold mb-2">
                  Atenção: Exclusão Permanente
                </h4>
                <p className="text-red-700 text-sm leading-relaxed">
                  Ao excluir esta manutenção,{' '}
                  <strong>
                    todos os dados relacionados serão permanentemente removidos
                  </strong>
                  , incluindo:
                </p>
                <ul className="text-red-700 text-sm mt-2 space-y-1 list-disc list-inside">
                  <li>Título da manutenção</li>
                  <li>Descrição detalhada</li>
                  <li>Valor gasto</li>
                  <li>Data da manutenção</li>
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
                CLickLabel('modalDeletarManutencao')
              }}
            />
            <Button
              title="Sim"
              className="bg-red-600 hover:bg-red-500 active:bg-red-600 w-full"
              onClick={onDeletarManutencao}
            />
          </div>
        </div>
      </Modal>
    </span>
  )
}
