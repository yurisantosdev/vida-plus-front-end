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
  X,
  GasPump,
  Wrench,
  CurrencyDollar,
  Plus
} from '@phosphor-icons/react'
import InputComponent from '@/components/Input'
import { useForm } from 'react-hook-form'
import TextRequired from '@/components/TextRequired'
import { Button } from '@/components/Button'
import toast from 'react-hot-toast'
import { setLoading } from '@/redux/loading/actions'
import { deleteVeiculo, findVeiculo, updateVeiculo } from '@/store/Veiculos'
import { deleteAbastecimento } from '@/store/Abastecimentos'
import { deleteManutencao } from '@/store/Manutencoes'
import { deleteDespesa } from '@/store/Despesas'
import { VeiculosType } from '@/types/VeiculosType'
import { AbastecimentosType } from '@/types/AbastecimentosType'
import { ManutencoesType } from '@/types/ManutencoesType'
import { DespesasType } from '@/types/DespesasType'
import { findAllAbastecimentosVeiculo } from '@/store/Abastecimentos'
import { findAllManutencoesVeiculo } from '@/store/Manutencoes'
import { findAllDespesasVeiculo } from '@/store/Despesas'
import Modal from '@/components/Modal'
import { CLickLabel } from '@/services/clickLabel'
import FuncionalidadesGarage from '../../_components/FuncionalidadesGarage'
import CardVeiculo from '../../_components/CardVeiculo'
import { FormatarValorEmReais } from '@/services/formatters'

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
  const [abastecimentos, setAbastecimentos] = useState<AbastecimentosType[]>([])
  const [manutencoes, setManutencoes] = useState<ManutencoesType[]>([])
  const [despesas, setDespesas] = useState<DespesasType[]>([])
  const [activeTab, setActiveTab] = useState<
    'abastecimentos' | 'manutencoes' | 'despesas'
  >('abastecimentos')
  const [abastecimentoParaDeletar, setAbastecimentoParaDeletar] =
    useState<AbastecimentosType | null>(null)
  const [manutencaoParaDeletar, setManutencaoParaDeletar] =
    useState<ManutencoesType | null>(null)
  const [despesaParaDeletar, setDespesaParaDeletar] =
    useState<DespesasType | null>(null)

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

  async function carregarDadosVeiculo() {
    if (vecodigo) {
      dispatch(setLoading(true))

      const abastecimentosResponse = await findAllAbastecimentosVeiculo(
        vecodigo
      )
      if (abastecimentosResponse != undefined) {
        setAbastecimentos(abastecimentosResponse.abastecimentos || [])
      }

      const manutencoesResponse = await findAllManutencoesVeiculo(vecodigo)
      if (manutencoesResponse != undefined) {
        setManutencoes(manutencoesResponse.manutencoes || [])
      }

      // Carregar despesas
      const despesasResponse = await findAllDespesasVeiculo(vecodigo)
      if (despesasResponse != undefined) {
        setDespesas(despesasResponse.despesas || [])
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

  async function onDeletarAbastecimento() {
    if (abastecimentoParaDeletar?.abcodigo) {
      dispatch(setLoading(true))
      const response = await deleteAbastecimento(
        abastecimentoParaDeletar.abcodigo
      )

      if (response != undefined) {
        reset()
        CLickLabel('modalDeletarAbastecimento')
        toast.success('Abastecimento excluído com sucesso!')
        await carregarDadosVeiculo()
      }

      dispatch(setLoading(false))
    }
  }

  async function onDeletarManutencao() {
    if (manutencaoParaDeletar?.mtcodigo) {
      dispatch(setLoading(true))
      const response = await deleteManutencao(manutencaoParaDeletar.mtcodigo)

      if (response != undefined) {
        reset()
        CLickLabel('modalDeletarManutencao')
        toast.success('Manutenção excluída com sucesso!')
        await carregarDadosVeiculo()
      }

      dispatch(setLoading(false))
    }
  }

  async function onDeletarDespesa() {
    if (despesaParaDeletar?.dpcodigo) {
      dispatch(setLoading(true))
      const response = await deleteDespesa(despesaParaDeletar.dpcodigo)

      if (response != undefined) {
        reset()
        CLickLabel('modalDeletarDespesa')
        toast.success('Despesa excluída com sucesso!')
        await carregarDadosVeiculo()
      }

      dispatch(setLoading(false))
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
      carregarDadosVeiculo()
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

          <CardVeiculo
            veiculo={veiculo.venome}
            placa={veiculo.veplaca}
            hodometro={veiculo.vehodometro}
            select={false}
            acess={false}
            extraContent={
              <div className="flex gap-2 w-full justify-center items-center">
                <Button
                  className="bg-blue-600 hover:bg-blue-500 active:bg-blue-600 p-2 w-full"
                  iconRight={
                    isEditing ? <X size={20} /> : <PencilSimple size={20} />
                  }
                  onClick={() => setIsEditing(!isEditing)}
                />
                <Button
                  className="bg-red-600 hover:bg-red-500 active:bg-red-600 p-2 w-full"
                  iconRight={<Trash size={20} />}
                  onClick={() => {
                    CLickLabel('modalDeletarVeiculo')
                  }}
                />
              </div>
            }
          />
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

        {/* Histórico do Veículo */}
        <div className="transition-all animate-slide-up mt-5 bg-white border rounded-2xl p-4 shadow-sm border-gray-200">
          <Subtitle
            title="Histórico do Veículo"
            icon={<Calendar size={20} className="text-black" />}
          />

          {/* Tabs */}
          <div className="flex gap-2 mb-4 ">
            <button
              onClick={() => setActiveTab('abastecimentos')}
              className={`cursor-pointer flex justify-center items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all w-full ${
                activeTab === 'abastecimentos'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              <GasPump size={25} />({abastecimentos.length})
            </button>
            <button
              onClick={() => setActiveTab('manutencoes')}
              className={`cursor-pointer flex justify-center items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all w-full ${
                activeTab === 'manutencoes'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              <Wrench size={25} />({manutencoes.length})
            </button>
            <button
              onClick={() => setActiveTab('despesas')}
              className={`cursor-pointer flex justify-center items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all w-full ${
                activeTab === 'despesas'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              <CurrencyDollar size={25} />({despesas.length})
            </button>
          </div>

          {/* Conteúdo das Tabs */}
          <div className="max-h-[400px] overflow-y-auto">
            {activeTab === 'abastecimentos' && (
              <div className="space-y-3 transition-all animate-slide-up">
                {abastecimentos.length > 0 ? (
                  abastecimentos.map((abastecimento, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 bg-white shadow-sm">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <GasPump size={20} className="text-red-600" />
                            <span className="font-semibold text-gray-800">
                              {abastecimento.ablitros}L -
                              {FormatarValorEmReais(abastecimento.abvalorlitro)}
                              /L
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>
                              Total:{' '}
                              {FormatarValorEmReais(abastecimento.abvalortotal)}
                            </p>
                            <p>Hodômetro: {abastecimento.abhodometro} Km</p>
                            <p>
                              Data:{' '}
                              {abastecimento.abquando
                                ? new Date(
                                    abastecimento.abquando
                                  ).toLocaleDateString('pt-BR')
                                : 'N/A'}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            title=""
                            className="bg-blue-600 hover:bg-blue-500 active:bg-blue-600 p-2"
                            iconRight={<PencilSimple size={16} />}
                            onClick={() =>
                              router.push(
                                `/garage/abastecimentos/${abastecimento.abcodigo}`
                              )
                            }
                          />
                          <Button
                            title=""
                            className="bg-red-600 hover:bg-red-500 active:bg-red-600 p-2"
                            iconRight={<Trash size={16} />}
                            onClick={() => {
                              setAbastecimentoParaDeletar(abastecimento)
                              CLickLabel('modalDeletarAbastecimento')
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <GasPump size={48} className="mx-auto mb-2 text-gray-300" />
                    <p>Nenhum abastecimento registrado</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'manutencoes' && (
              <div className="space-y-3 transition-all animate-slide-up">
                {manutencoes.length > 0 ? (
                  manutencoes.map((manutencao, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 bg-white shadow-sm">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Wrench size={20} className="text-blue-600" />
                            <span className="font-semibold text-gray-800">
                              {manutencao.mttitle}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>Descrição: {manutencao.mtdescricao}</p>
                            <p>
                              Valor: {FormatarValorEmReais(manutencao.mtvalor)}
                            </p>
                            <p>
                              Data:{' '}
                              {manutencao.mtquando
                                ? new Date(
                                    manutencao.mtquando
                                  ).toLocaleDateString('pt-BR')
                                : 'N/A'}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            title=""
                            className="bg-blue-600 hover:bg-blue-500 active:bg-blue-600 p-2"
                            iconRight={<PencilSimple size={16} />}
                            onClick={() =>
                              router.push(
                                `/garage/manutencoes/${manutencao.mtcodigo}`
                              )
                            }
                          />
                          <Button
                            title=""
                            className="bg-red-600 hover:bg-red-500 active:bg-red-600 p-2"
                            iconRight={<Trash size={16} />}
                            onClick={() => {
                              setManutencaoParaDeletar(manutencao)
                              CLickLabel('modalDeletarManutencao')
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Wrench size={48} className="mx-auto mb-2 text-gray-300" />
                    <p>Nenhuma manutenção registrada</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'despesas' && (
              <div className="space-y-3 transition-all animate-slide-up">
                {despesas.length > 0 ? (
                  despesas.map((despesa, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 bg-white shadow-sm">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CurrencyDollar
                              size={20}
                              className="text-green-600"
                            />
                            <span className="font-semibold text-gray-800">
                              {despesa.dpdescricao}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>Categoria: {despesa.dpcategoria}</p>
                            <p>
                              Valor: {FormatarValorEmReais(despesa.dpvalor)}
                            </p>
                            <p>Hodômetro: {despesa.dphodometro} Km</p>
                            <p>
                              Data:{' '}
                              {despesa.dpquando
                                ? new Date(despesa.dpquando).toLocaleDateString(
                                    'pt-BR'
                                  )
                                : 'N/A'}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            title=""
                            className="bg-blue-600 hover:bg-blue-500 active:bg-blue-600 p-2"
                            iconRight={<PencilSimple size={16} />}
                            onClick={() =>
                              router.push(
                                `/garage/despesas/${despesa.dpcodigo}`
                              )
                            }
                          />
                          <Button
                            title=""
                            className="bg-red-600 hover:bg-red-500 active:bg-red-600 p-2"
                            iconRight={<Trash size={16} />}
                            onClick={() => {
                              setDespesaParaDeletar(despesa)
                              CLickLabel('modalDeletarDespesa')
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <CurrencyDollar
                      size={48}
                      className="mx-auto mb-2 text-gray-300"
                    />
                    <p>Nenhuma despesa registrada</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Funcionalidades */}
        <FuncionalidadesGarage />
        
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
              title="Sim"
              className="bg-red-600 hover:bg-red-500 active:bg-red-600 w-full"
              onClick={onDeletarVeiculo}
            />
          </div>
        </div>
      </Modal>

      {/* Modal de Confirmação de Exclusão do Abastecimento */}
      <Modal
        htmlFor="modalDeletarAbastecimento"
        name="Excluir Abastecimento"
        loading={false}
        functioReset={() => {
          CLickLabel('modalDeletarAbastecimento')
        }}
        descricao="">
        <div className="flex flex-col gap-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <GasPump size={24} className="text-red-600" />
              </div>
              <div>
                <h4 className="text-red-800 font-semibold mb-2">
                  Atenção: Exclusão Permanente
                </h4>
                <p className="text-red-700 text-sm leading-relaxed">
                  Ao excluir este abastecimento,{' '}
                  <strong>
                    todos os dados relacionados serão permanentemente removidos
                  </strong>
                  , incluindo:
                </p>
                <ul className="text-red-700 text-sm mt-2 space-y-1 list-disc list-inside">
                  {abastecimentoParaDeletar ? (
                    <>
                      <li>
                        Litros abastecidos: {abastecimentoParaDeletar.ablitros}L
                      </li>
                      <li>
                        Valor por litro:{' '}
                        {FormatarValorEmReais(
                          abastecimentoParaDeletar.abvalorlitro
                        )}
                      </li>
                      <li>
                        Valor total:{' '}
                        {FormatarValorEmReais(
                          abastecimentoParaDeletar.abvalortotal
                        )}
                      </li>
                      <li>
                        Hodômetro: {abastecimentoParaDeletar.abhodometro} Km
                      </li>
                      <li>
                        Data:{' '}
                        {abastecimentoParaDeletar.abquando
                          ? new Date(
                              abastecimentoParaDeletar.abquando
                            ).toLocaleDateString('pt-BR')
                          : 'N/A'}
                      </li>
                    </>
                  ) : (
                    <li>Carregando dados do abastecimento...</li>
                  )}
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
                CLickLabel('modalDeletarAbastecimento')
              }}
            />
            <Button
              title="Sim"
              className="bg-red-600 hover:bg-red-500 active:bg-red-600 w-full"
              onClick={onDeletarAbastecimento}
            />
          </div>
        </div>
      </Modal>

      {/* Modal de Confirmação de Exclusão da Manutenção */}
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
                  {manutencaoParaDeletar ? (
                    <>
                      <li>Título: {manutencaoParaDeletar.mttitle}</li>
                      <li>Descrição: {manutencaoParaDeletar.mtdescricao}</li>
                      <li>
                        Valor:
                        {FormatarValorEmReais(manutencaoParaDeletar.mtvalor)}
                      </li>
                      <li>
                        Data:{' '}
                        {manutencaoParaDeletar.mtquando
                          ? new Date(
                              manutencaoParaDeletar.mtquando
                            ).toLocaleDateString('pt-BR')
                          : 'N/A'}
                      </li>
                    </>
                  ) : (
                    <li>Carregando dados da manutenção...</li>
                  )}
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

      {/* Modal de Confirmação de Exclusão da Despesa */}
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
                  {despesaParaDeletar ? (
                    <>
                      <li>Descrição: {despesaParaDeletar.dpdescricao}</li>
                      <li>Categoria: {despesaParaDeletar.dpcategoria}</li>
                      <li>
                        Valor:
                        {FormatarValorEmReais(despesaParaDeletar.dpvalor)}
                      </li>
                      <li>Hodômetro: {despesaParaDeletar.dphodometro} Km</li>
                      <li>
                        Data:{' '}
                        {despesaParaDeletar.dpquando
                          ? new Date(
                              despesaParaDeletar.dpquando
                            ).toLocaleDateString('pt-BR')
                          : 'N/A'}
                      </li>
                    </>
                  ) : (
                    <li>Carregando dados da despesa...</li>
                  )}
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
