'use client'
import Modal from '@/components/Modal'
import { TransacoesType } from '@/types/TransacoesType'
import { ContasType } from '@/types/ContasType'
import { categoriasPadrao } from '@/types/CategoriasType'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { setLoading } from '@/redux/loading/actions'
import toast from 'react-hot-toast'
import { Card, CardContent } from '@/components/Card'
import {
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  CurrencyCircleDollar,
  Tag,
  Receipt,
  Repeat,
  Wallet
} from '@phosphor-icons/react'
import InputComponent from '@/components/Input'
import TextRequired from '@/components/TextRequired'
import { Button } from '@/components/Button'
import { TipoTransacoesEnum } from '@/enums/TipoTransacoesEnum'
import Textarea from '@/components/Textarea'
import DatePicker from '@/components/DatePicker'

interface ModalTransacaoProps {
  transacao?: TransacoesType | null
  contas: ContasType[]
  onSave?: (transacao: TransacoesType) => void
  onClose?: () => void
}

/**
 * Modal para cadastro e edição de transações financeiras
 * @description Interface completa para criar ou editar transações com validação
 * @param {TransacoesType | null} transacao - Transação para edição (opcional)
 * @param {ContasType[]} contas - Lista de contas disponíveis
 * @param {Function} onSave - Callback para salvar transação
 * @param {Function} onClose - Callback para fechar modal
 * @author Sistema
 */
export default function ModalTransacao({
  transacao,
  contas,
  onSave,
  onClose
}: ModalTransacaoProps) {
  const {
    handleSubmit,
    register,
    watch,
    reset,
    setValue,
    formState: { errors }
  } = useForm<TransacoesType>({
    defaultValues: {
      trdata: new Date().toISOString().split('T')[0],
      trvalor: '',
      trdescricao: '',
      trcategoria: '',
      trconta: '',
      trusuario: 'user1',
      trtipo: 'DESPESA',
      trrecorrente: false,
      trtags: []
    }
  })

  const loading = useSelector((state: any) => state.loadingReducer.loading)
  const dispatch = useDispatch()
  const [tags, setTags] = useState<string[]>([])
  const [novaTag, setNovaTag] = useState('')

  // Carregar dados da transação para edição
  useEffect(() => {
    if (transacao) {
      setValue('trdata', transacao.trdata)
      setValue('trvalor', transacao.trvalor)
      setValue('trdescricao', transacao.trdescricao || '')
      setValue('trcategoria', transacao.trcategoria || '')
      setValue('trconta', transacao.trconta)
      setValue('trusuario', transacao.trusuario)
      setValue('trtipo', transacao.trtipo)
      setValue('trrecorrente', transacao.trrecorrente || false)
      setTags(transacao.trtags || [])
    }
  }, [transacao, setValue])

  const formatCurrency = (value: string) => {
    const numValue = parseFloat(value)
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numValue)
  }

  const getTipoIcon = (tipo: TipoTransacoesEnum) => {
    if (tipo === 'RECEITA') {
      return <ArrowUpRight size={20} className="text-green-600" />
    }
    return <ArrowDownLeft size={20} className="text-red-600" />
  }

  const getTipoColor = (tipo: TipoTransacoesEnum) => {
    if (tipo === 'RECEITA') {
      return 'text-green-600 bg-green-50'
    }
    return 'text-red-600 bg-red-50'
  }

  const getCategoriasPorTipo = (tipo: TipoTransacoesEnum) => {
    return categoriasPadrao.filter((c) => c.cgtipo === tipo)
  }

  const getContaNome = (contaId: string) => {
    const conta = contas.find((c) => c.ctcodigo === contaId)
    return conta?.ctnome || 'Conta não encontrada'
  }

  const adicionarTag = () => {
    if (novaTag.trim() && !tags.includes(novaTag.trim())) {
      setTags([...tags, novaTag.trim()])
      setValue('trtags', [...tags, novaTag.trim()])
      setNovaTag('')
    }
  }

  const removerTag = (tagParaRemover: string) => {
    const novasTags = tags.filter((tag) => tag !== tagParaRemover)
    setTags(novasTags)
    setValue('trtags', novasTags)
  }

  const handleSubmitForm = (data: TransacoesType) => {
    if (onSave) {
      onSave(data)
    } else {
      // Lógica original para cadastro via API
      dispatch(setLoading(true))
      // Aqui você implementaria a chamada para a API
      toast.success('Transação salva com sucesso!')
      reset()
      dispatch(setLoading(false))
    }
  }

  const handleClose = () => {
    reset()
    setTags([])
    setNovaTag('')
    if (onClose) {
      onClose()
    }
  }

  return (
    <Modal
      htmlFor="modalTransacao"
      name={transacao ? 'Editar Transação' : 'Nova Transação'}
      loading={loading}
      functioReset={handleClose}>
      <Card className="max-w-4xl mx-auto">
        <CardContent>
          <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div
                className={`p-3 rounded-xl ${getTipoColor(watch('trtipo'))}`}>
                {getTipoIcon(watch('trtipo'))}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {transacao ? 'Editar Transação' : 'Nova Transação'}
                </h2>
                <p className="text-gray-600">
                  {transacao
                    ? 'Atualize as informações da transação'
                    : 'Registre uma nova receita ou despesa'}
                </p>
              </div>
            </div>

            {/* Tipo de Transação */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                Tipo de Transação
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setValue('trtipo', 'RECEITA')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    watch('trtipo') === 'RECEITA'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}>
                  <div className="flex items-center space-x-3">
                    <ArrowUpRight size={24} className="text-green-600" />
                    <div>
                      <h4 className="font-medium text-gray-900">Receita</h4>
                      <p className="text-sm text-gray-600">
                        Dinheiro que entra
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setValue('trtipo', 'DESPESA')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    watch('trtipo') === 'DESPESA'
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-red-300'
                  }`}>
                  <div className="flex items-center space-x-3">
                    <ArrowDownLeft size={24} className="text-red-600" />
                    <div>
                      <h4 className="font-medium text-gray-900">Despesa</h4>
                      <p className="text-sm text-gray-600">Dinheiro que sai</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Informações Básicas */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                Informações Básicas
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InputComponent
                    id="trdescricao"
                    type="text"
                    placeholder="Ex: Salário Janeiro, Supermercado..."
                    icon={
                      <Receipt
                        size={20}
                        className={
                          errors.trdescricao ? 'text-red-600' : 'text-gray-400'
                        }
                      />
                    }
                    textLabel="Descrição"
                    className="mb-4"
                    styleLabel="text-gray-700 font-medium text-sm"
                    requiredItem
                    {...register('trdescricao', {
                      required: 'Descrição é obrigatória',
                      minLength: {
                        value: 3,
                        message: 'Descrição deve ter pelo menos 3 caracteres'
                      }
                    })}
                    textError={
                      errors.trdescricao && (
                        <span className="text-red-600 text-xs">
                          {errors.trdescricao.message}
                        </span>
                      )
                    }
                    error={errors.trdescricao}
                  />
                </div>

                <div>
                  <InputComponent
                    id="trvalor"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    icon={
                      <CurrencyCircleDollar
                        size={20}
                        className={
                          errors.trvalor ? 'text-red-600' : 'text-gray-400'
                        }
                      />
                    }
                    textLabel="Valor"
                    className="mb-4"
                    styleLabel="text-gray-700 font-medium text-sm"
                    requiredItem
                    {...register('trvalor', {
                      required: 'Valor é obrigatório',
                      min: {
                        value: 0.01,
                        message: 'Valor deve ser maior que zero'
                      }
                    })}
                    textError={
                      errors.trvalor && (
                        <span className="text-red-600 text-xs">
                          {errors.trvalor.message}
                        </span>
                      )
                    }
                    error={errors.trvalor}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data da Transação
                  </label>
                  <input
                    type="date"
                    {...register('trdata', { required: 'Data é obrigatória' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.trdata && (
                    <span className="text-red-600 text-xs">
                      {errors.trdata.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Conta
                  </label>
                  <div className="relative">
                    <select
                      {...register('trconta', {
                        required: 'Conta é obrigatória'
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Selecione a conta</option>
                      {contas.map((conta) => (
                        <option key={conta.ctcodigo} value={conta.ctcodigo}>
                          {conta.ctnome}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.trconta && (
                    <span className="text-red-600 text-xs">
                      {errors.trconta.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Categorização */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                Categorização
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {getCategoriasPorTipo(watch('trtipo')).map((categoria) => (
                    <button
                      key={categoria.cgnome}
                      type="button"
                      onClick={() => setValue('trcategoria', categoria.cgnome)}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        watch('trcategoria') === categoria.cgnome
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: categoria.cgcor }}
                        />
                        <span className="text-sm font-medium text-gray-900">
                          {categoria.cgnome}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tags e Configurações */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                Tags e Configurações
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Adicionar tag..."
                      value={novaTag}
                      onChange={(e) => setNovaTag(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === 'Enter' &&
                        (e.preventDefault(), adicionarTag())
                      }
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={adicionarTag}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Tag size={16} />
                    </button>
                  </div>

                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          <span>{tag}</span>
                          <button
                            type="button"
                            onClick={() => removerTag(tag)}
                            className="text-blue-600 hover:text-blue-800">
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('trrecorrente')}
                    className="mr-2 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div className="flex items-center space-x-2">
                    <Repeat size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-700">
                      Transação recorrente
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Preview da Transação */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                Prévia da Transação
              </h3>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg ${getTipoColor(
                        watch('trtipo')
                      )}`}>
                      {getTipoIcon(watch('trtipo'))}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {watch('trdescricao') || 'Descrição da transação'}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        {watch('trcategoria') && (
                          <span
                            className="text-xs px-2 py-1 rounded-full text-white font-medium"
                            style={{
                              backgroundColor: getCategoriasPorTipo(
                                watch('trtipo')
                              ).find((c) => c.cgnome === watch('trcategoria'))
                                ?.cgcor
                            }}>
                            {watch('trcategoria')}
                          </span>
                        )}
                        <span className="text-xs text-gray-500">
                          {getContaNome(watch('trconta'))}
                        </span>
                        {watch('trrecorrente') && (
                          <span className="flex items-center space-x-1 text-xs text-blue-600">
                            <Repeat size={12} />
                            <span>Recorrente</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-lg font-bold ${
                        watch('trtipo') === 'RECEITA'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}>
                      {watch('trtipo') === 'RECEITA' ? '+' : '-'}
                      {formatCurrency(watch('trvalor') || '0')}
                    </p>
                    <p className="text-xs text-gray-500">
                      {watch('trdata')
                        ? new Date(watch('trdata')).toLocaleDateString('pt-BR')
                        : 'Data'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                onClick={handleClose}
                title="Cancelar"
                className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors"
              />
              <Button
                type="submit"
                title={transacao ? 'Salvar Alterações' : 'Criar Transação'}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </Modal>
  )
}
