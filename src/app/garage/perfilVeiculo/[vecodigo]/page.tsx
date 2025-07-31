'use client'
import { AuthUser } from '@/services/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UsuarioType } from '@/types/UsuariosType'
import { useRouter } from 'next/navigation'
import BaseLayout from '@/templates/BaseLayout'
import Subtitle from '@/components/Subtitle'
import {
  Car,
  Gauge,
  Tag,
  User,
  Calendar,
  Trash,
  PencilSimple,
  Info,
  X
} from '@phosphor-icons/react'
import InputComponent from '@/components/Input'
import { useForm } from 'react-hook-form'
import TextRequired from '@/components/TextRequired'
import { Button } from '@/components/Button'
import toast from 'react-hot-toast'
import { setLoading } from '@/redux/loading/actions'
import { deleteVeiculo, findVeiculo, updateVeiculo } from '@/store/Veiculos'
import { VeiculosType } from '@/types/VeiculosType'
import Modal from '@/components/Modal'
import { CLickLabel } from '@/services/clickLabel'

interface PageProps {
  params: Promise<{ vecodigo: string }>
}

export default function PerfilVeiculo({ params }: PageProps) {
  AuthUser()
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<VeiculosType>({
    defaultValues: {
      vecodigo: '',
      veplaca: '',
      venome: '',
      vehodometro: 0,
      veusuario: ''
    }
  })
  const router = useRouter()
  const dispatch = useDispatch()
  const user: UsuarioType = useSelector((state: any) => state.userReducer)
  const [veiculo, setVeiculo] = useState<VeiculosType | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [vecodigo, setVecodigo] = useState<string>('')

  async function onSalvarVeiculo(data: VeiculosType) {
    if (user.uscodigo && vecodigo) {
      dispatch(setLoading(true))

      data.vecodigo = vecodigo
      data.veusuario = user.uscodigo
      data.vehodometro = parseFloat(data.vehodometro.toString())

      const response = await updateVeiculo(data)

      if (response != undefined) {
        toast.success('Veículo atualizado com sucesso!')
        setIsEditing(false)
        await carregarVeiculo()
      }

      dispatch(setLoading(false))
    }
  }

  async function carregarVeiculo() {
    if (vecodigo) {
      dispatch(setLoading(true))
      const response = await findVeiculo(vecodigo)

      if (response != undefined) {
        setVeiculo(response.veiculo)
        reset({
          vecodigo: response.veiculo.vecodigo,
          veplaca: response.veiculo.veplaca,
          venome: response.veiculo.venome,
          vehodometro: response.veiculo.vehodometro,
          veusuario: response.veiculo.veusuario
        })
      }

      dispatch(setLoading(false))
    }
  }

  async function onDeletarVeiculo() {
    if (vecodigo) {
      dispatch(setLoading(true))
      const response = await deleteVeiculo(vecodigo)

      if (response != undefined) {
        reset()
        router.push('/garage')
        toast.success('Veículo excluído com sucesso!')
        CLickLabel('modalDeletarVeiculo')
      }
    }
  }

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setVecodigo(resolvedParams.vecodigo)
    }
    getParams()
  }, [params])

  useEffect(() => {
    if (vecodigo) {
      carregarVeiculo()
    }
  }, [vecodigo])

  if (!vecodigo) {
    return (
      <BaseLayout title="Perfil do Veículo" navbar={false} voltar>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Carregando...</p>
        </div>
      </BaseLayout>
    )
  }

  if (!veiculo) {
    return (
      <BaseLayout title="Perfil do Veículo" navbar={false} voltar>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Carregando...</p>
        </div>
      </BaseLayout>
    )
  }

  return (
    <span>
      <BaseLayout title="Perfil do Veículo" navbar={false} voltar>
        {/* Informações do Veículo */}
        <div className="transition-all animate-slide-up">
          <Subtitle
            title="Informações do Veículo"
            icon={<Car size={20} className="text-black" />}
          />

          <div className="border rounded-2xl p-4 shadow-sm border-gray-200 bg-white mb-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full w-16 h-16 flex justify-center items-center shadow-inner bg-blue-100">
                <Car size={28} className="text-blue-600" />
              </div>

              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <span>{veiculo.venome}</span>
                  <span className="text-gray-400">-</span>
                  <span>{veiculo.veplaca}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <Gauge size={16} className="text-blue-500" />
                  <span className="font-medium">{veiculo.vehodometro} Km</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  title=""
                  className="bg-blue-600 hover:bg-blue-500 active:bg-blue-600 p-2"
                  iconRight={
                    isEditing ? <X size={20} /> : <PencilSimple size={20} />
                  }
                  onClick={() => setIsEditing(!isEditing)}
                />
                <Button
                  title=""
                  className="bg-red-600 hover:bg-red-500 active:bg-red-600 p-2"
                  iconRight={<Trash size={20} />}
                  onClick={() => {
                    CLickLabel('modalDeletarVeiculo')
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Formulário de Edição */}
        {isEditing && (
          <div className="transition-all animate-slide-up">
            <Subtitle
              title="Editar Veículo"
              icon={<PencilSimple size={20} className="text-black" />}
            />

            <form onSubmit={handleSubmit(onSalvarVeiculo)}>
              {/* Nome do Veículo */}
              <div className="mt-1">
                <InputComponent
                  id="venome"
                  placeholder="Informe o nome do veículo"
                  className="w-full bg-gray-50 text-gray-900 transition-all duration-300 focus:ring-2 focus:ring-orange-1000/50 mb-4"
                  icon={<Car size={22} className="text-gray-500" />}
                  textLabel="Nome do Veículo"
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
                  icon={<Tag size={22} className="text-gray-500" />}
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

              {/* Hodômetro */}
              <div className="mt-1">
                <InputComponent
                  id="vehodometro"
                  type="number"
                  placeholder="Informe o hodômetro"
                  className="w-full bg-gray-50 text-gray-900 transition-all duration-300 focus:ring-2 focus:ring-orange-1000/50 mb-4"
                  icon={<Gauge size={22} className="text-gray-500" />}
                  textLabel="Hodômetro (Km)"
                  styleLabel="text-gray-700 font-medium"
                  requiredItem
                  {...register('vehodometro', {
                    required: true
                  })}
                  textError={errors.vehodometro && <TextRequired />}
                  error={errors.vehodometro}
                />
              </div>

              {/* Botões */}
              <div className="mt-5 flex justify-center items-center gap-2">
                <Button
                  title="Cancelar"
                  className="bg-red-600 hover:bg-red-500 active:bg-red-600 w-full"
                  onClick={() => {
                    setIsEditing(false)
                    carregarVeiculo()
                  }}
                />
                <Button
                  title="Salvar"
                  type="submit"
                  className="bg-green-600 hover:bg-green-500 active:bg-green-600 w-full"
                />
              </div>
            </form>
          </div>
        )}

        {/* Informações Adicionais */}
        {!isEditing && (
          <div className="transition-all animate-slide-up">
            <Subtitle
              title="Informações Adicionais"
              icon={<Info size={20} className="text-black" />}
            />

            <div className="border rounded-2xl p-4 shadow-sm border-gray-200 bg-white">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User size={20} className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Proprietário</p>
                    <p className="font-medium text-gray-800">
                      {veiculo.usuario?.usnome || 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Data de Cadastro</p>
                    <p className="font-medium text-gray-800">
                      {veiculo.createdAt
                        ? new Date(veiculo.createdAt).toLocaleDateString(
                            'pt-BR'
                          )
                        : 'N/A'}
                    </p>
                  </div>
                </div>

                {veiculo.updatedAt && (
                  <div className="flex items-center gap-3">
                    <PencilSimple size={20} className="text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">
                        Última Atualização
                      </p>
                      <p className="font-medium text-gray-800">
                        {new Date(veiculo.updatedAt).toLocaleDateString(
                          'pt-BR'
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </BaseLayout>

      {/* Modal de Confirmação de Exclusão */}
      <Modal
        htmlFor="modalDeletarVeiculo"
        name="Excluir Veículo"
        loading={false}
        functioReset={() => {
          CLickLabel('modalDeletarVeiculo')
        }}
        descricao="">
        <div className="flex flex-col gap-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <Trash size={24} className="text-red-600" />
              </div>
              <div>
                <h4 className="text-red-800 font-semibold mb-2">
                  Atenção: Exclusão Permanente
                </h4>
                <p className="text-red-700 text-sm leading-relaxed">
                  Ao excluir este veículo,{' '}
                  <strong>
                    todos os dados relacionados serão permanentemente removidos
                  </strong>
                  , incluindo:
                </p>
                <ul className="text-red-700 text-sm mt-2 space-y-1 list-disc list-inside">
                  <li>Histórico de abastecimentos</li>
                  <li>Registros de manutenções</li>
                  <li>Despesas associadas</li>
                  <li>Dados do hodômetro</li>
                  <li>Todas as informações do veículo</li>
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
                CLickLabel('modalDeletarVeiculo')
              }}
            />
            <Button
              title="Sim, Excluir Veículo"
              className="bg-red-600 hover:bg-red-500 active:bg-red-600 w-full"
              onClick={onDeletarVeiculo}
            />
          </div>
        </div>
      </Modal>
    </span>
  )
}
