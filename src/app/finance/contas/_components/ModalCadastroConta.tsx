'use client'
import Modal from '@/components/Modal'
import { ContasType } from '@/types/ContasType'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { setLoading } from '@/redux/loading/actions'
import toast from 'react-hot-toast'
import { cadastrarConta } from '@/store/Contas'
import { Card, CardContent } from '@/components/Card'
import {
  CurrencyCircleDollar,
  Wallet,
  Bank,
  CreditCard,
  PiggyBank,
  CurrencyDollar,
  Palette
} from '@phosphor-icons/react'
import InputComponent from '@/components/Input'
import { validateFullName } from '@/utils/validators'
import TextRequired from '@/components/TextRequired'
import { Button } from '@/components/Button'
import { CLickLabel } from '@/services/clickLabel'
import { BancosType } from '@/types/BancosType'
import { consultarBancos } from '@/store/Bancos'
import { TipoContasEnum } from '@/enums/TipoContasEnum'
import Select from '@/components/Select'
import Textarea from '@/components/Textarea'

interface ModalCadastroContaProps {
  conta?: ContasType | null
  onSave?: (conta: ContasType) => void
  onClose?: () => void
}

/**
 * Modal para cadastro e edição de contas bancárias
 * @description Interface completa para criar ou editar contas com validação
 * @param {ContasType | null} conta - Conta para edição (opcional)
 * @param {Function} onSave - Callback para salvar conta
 * @param {Function} onClose - Callback para fechar modal
 * @author Sistema
 */
export default function ModalCadastroConta({
  conta,
  onSave,
  onClose
}: ModalCadastroContaProps) {
  const {
    handleSubmit,
    register,
    watch,
    reset,
    setValue,
    formState: { errors }
  } = useForm<ContasType>({
    defaultValues: {
      ctnome: '',
      ctsaldo: '0.00',
      ctbanco: '',
      cttipoconta: 'CORRENTE',
      cttitular: '',
      ctlimite: '',
      ctdescricao: '',
      ctcor: '#3B82F6',
      ctativo: true
    }
  })

  const loading = useSelector((state: any) => state.loadingReducer.loading)
  const dispatch = useDispatch()
  const [bancos, setBancos] = useState<BancosType[]>([])
  const [showModal, setShowModal] = useState(false)

  const coresDisponiveis = [
    { nome: 'Azul', valor: '#3B82F6' },
    { nome: 'Verde', valor: '#10B981' },
    { nome: 'Vermelho', valor: '#EF4444' },
    { nome: 'Amarelo', valor: '#F59E0B' },
    { nome: 'Roxo', valor: '#8B5CF6' },
    { nome: 'Rosa', valor: '#EC4899' },
    { nome: 'Indigo', valor: '#6366F1' },
    { nome: 'Teal', valor: '#14B8A6' }
  ]

  // Carregar dados da conta para edição
  useEffect(() => {
    if (conta) {
      setValue('ctnome', conta.ctnome)
      setValue('ctsaldo', conta.ctsaldo)
      setValue('ctbanco', conta.ctbanco)
      setValue('cttipoconta', conta.cttipoconta)
      setValue('cttitular', conta.cttitular)
      setValue('ctlimite', conta.ctlimite || '')
      setValue('ctdescricao', conta.ctdescricao || '')
      setValue('ctcor', conta.ctcor || '#3B82F6')
      setValue('ctativo', conta.ctativo !== false)
    }
  }, [conta, setValue])

  // Carregar bancos
  useEffect(() => {
    const consultarDados = async () => {
      const responseBancos = await consultarBancos()
      if (responseBancos != undefined) {
        setBancos(responseBancos.bancos)
      }
    }
    consultarDados()
  }, [])

  const formatCurrency = (value: string) => {
    const numValue = parseFloat(value)
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numValue)
  }

  const getTipoContaIcon = (tipo: string) => {
    switch (tipo) {
      case 'CORRENTE':
        return <CreditCard size={20} className="text-blue-600" />
      case 'POUPANCA':
        return <PiggyBank size={20} className="text-green-600" />
      case 'SALARIO':
        return <CurrencyDollar size={20} className="text-purple-600" />
      default:
        return <Wallet size={20} className="text-gray-600" />
    }
  }

  const getTipoContaText = (tipo: string) => {
    switch (tipo) {
      case 'CORRENTE':
        return 'Conta Corrente'
      case 'POUPANCA':
        return 'Poupança'
      case 'SALARIO':
        return 'Conta Salário'
      default:
        return 'Conta'
    }
  }

  const handleSubmitForm = (data: ContasType) => {
    if (onSave) {
      onSave(data)
    } else {
      // Lógica original para cadastro via API
      dispatch(setLoading(true))
      cadastrarConta(data).then((response) => {
        if (response != undefined) {
          CLickLabel('modalCadastroConta')
          toast.success('Conta criada com sucesso!')
          reset()
        }
        dispatch(setLoading(false))
      })
    }
  }

  const handleClose = () => {
    reset()
    if (onClose) {
      onClose()
    } else {
      CLickLabel('modalCadastroConta')
    }
  }

  return (
    <Modal
      htmlFor="modalCadastroConta"
      name={conta ? 'Editar Conta' : 'Nova Conta'}
      loading={loading}
      functioReset={handleClose}>
      <Card className="max-w-4xl mx-auto">
        <CardContent>
          <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Bank size={24} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {conta ? 'Editar Conta' : 'Nova Conta Bancária'}
                </h2>
                <p className="text-gray-600">
                  {conta
                    ? 'Atualize as informações da conta'
                    : 'Adicione uma nova conta ao seu controle financeiro'}
                </p>
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
                    id="ctnome"
                    type="text"
                    placeholder="Ex: Conta Corrente Principal"
                    icon={
                      <Wallet
                        size={20}
                        className={
                          errors.ctnome ? 'text-red-600' : 'text-gray-400'
                        }
                      />
                    }
                    textLabel="Nome da Conta"
                    className="mb-4"
                    styleLabel="text-gray-700 font-medium text-sm"
                    requiredItem
                    {...register('ctnome', {
                      required: 'Nome da conta é obrigatório',
                      minLength: {
                        value: 3,
                        message: 'Nome deve ter pelo menos 3 caracteres'
                      }
                    })}
                    textError={
                      errors.ctnome && (
                        <span className="text-red-600 text-xs">
                          {errors.ctnome.message}
                        </span>
                      )
                    }
                    error={errors.ctnome}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Conta
                  </label>
                  <div className="relative">
                    <select
                      {...register('cttipoconta', {
                        required: 'Tipo de conta é obrigatório'
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="CORRENTE">Conta Corrente</option>
                      <option value="POUPANCA">Poupança</option>
                      <option value="SALARIO">Conta Salário</option>
                    </select>
                  </div>
                  {errors.cttipoconta && (
                    <span className="text-red-600 text-xs">
                      {errors.cttipoconta.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Banco
                  </label>
                  <div className="relative">
                    <select
                      {...register('ctbanco', {
                        required: 'Banco é obrigatório'
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Selecione o banco</option>
                      {bancos.map((banco) => (
                        <option key={banco.bccodigo} value={banco.bccodigo}>
                          {banco.bcnome}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.ctbanco && (
                    <span className="text-red-600 text-xs">
                      {errors.ctbanco.message}
                    </span>
                  )}
                </div>

                <div>
                  <InputComponent
                    id="cttitular"
                    type="text"
                    placeholder="Nome do titular"
                    icon={
                      <Wallet
                        size={20}
                        className={
                          errors.cttitular ? 'text-red-600' : 'text-gray-400'
                        }
                      />
                    }
                    textLabel="Titular da Conta"
                    className="mb-4"
                    styleLabel="text-gray-700 font-medium text-sm"
                    requiredItem
                    {...register('cttitular', {
                      required: 'Titular é obrigatório',
                      minLength: {
                        value: 3,
                        message: 'Nome deve ter pelo menos 3 caracteres'
                      }
                    })}
                    textError={
                      errors.cttitular && (
                        <span className="text-red-600 text-xs">
                          {errors.cttitular.message}
                        </span>
                      )
                    }
                    error={errors.cttitular}
                  />
                </div>
              </div>
            </div>

            {/* Valores Financeiros */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                Valores Financeiros
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InputComponent
                    id="ctsaldo"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    icon={
                      <CurrencyCircleDollar
                        size={20}
                        className={
                          errors.ctsaldo ? 'text-red-600' : 'text-gray-400'
                        }
                      />
                    }
                    textLabel="Saldo Atual"
                    className="mb-4"
                    styleLabel="text-gray-700 font-medium text-sm"
                    requiredItem
                    {...register('ctsaldo', {
                      required: 'Saldo é obrigatório',
                      min: {
                        value: -999999,
                        message: 'Saldo inválido'
                      }
                    })}
                    textError={
                      errors.ctsaldo && (
                        <span className="text-red-600 text-xs">
                          {errors.ctsaldo.message}
                        </span>
                      )
                    }
                    error={errors.ctsaldo}
                  />
                </div>

                <div>
                  <InputComponent
                    id="ctlimite"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    icon={
                      <CreditCard
                        size={20}
                        className={
                          errors.ctlimite ? 'text-red-600' : 'text-gray-400'
                        }
                      />
                    }
                    textLabel="Limite (Opcional)"
                    className="mb-4"
                    styleLabel="text-gray-700 font-medium text-sm"
                    {...register('ctlimite', {
                      min: {
                        value: 0,
                        message: 'Limite deve ser positivo'
                      }
                    })}
                    textError={
                      errors.ctlimite && (
                        <span className="text-red-600 text-xs">
                          {errors.ctlimite.message}
                        </span>
                      )
                    }
                    error={errors.ctlimite}
                  />
                </div>
              </div>
            </div>

            {/* Personalização */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                Personalização
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cor da Conta
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {coresDisponiveis.map((cor) => (
                      <button
                        key={cor.valor}
                        type="button"
                        onClick={() => setValue('ctcor', cor.valor)}
                        className={`w-12 h-12 rounded-lg border-2 transition-all ${
                          watch('ctcor') === cor.valor
                            ? 'border-gray-900 scale-110'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        style={{ backgroundColor: cor.valor }}
                        title={cor.nome}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status da Conta
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        {...register('ctativo')}
                        value="true"
                        defaultChecked
                        className="mr-2 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">Ativa</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        {...register('ctativo')}
                        value="false"
                        className="mr-2 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">Inativa</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <Textarea
                  id="ctdescricao"
                  placeholder="Descreva esta conta (opcional)"
                  textLabel="Descrição"
                  className="mb-4"
                  styleLabel="text-gray-700 font-medium text-sm"
                  {...register('ctdescricao')}
                />
              </div>
            </div>

            {/* Preview da Conta */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                Prévia da Conta
              </h3>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: watch('ctcor') + '20' }}>
                    {getTipoContaIcon(watch('cttipoconta'))}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {watch('ctnome') || 'Nome da conta'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {getTipoContaText(watch('cttipoconta'))}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      {formatCurrency(watch('ctsaldo') || '0')}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        watch('ctativo') !== false
                          ? 'text-green-700 bg-green-100'
                          : 'text-red-700 bg-red-100'
                      }`}>
                      {watch('ctativo') !== false ? 'Ativa' : 'Inativa'}
                    </span>
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
                title={conta ? 'Salvar Alterações' : 'Criar Conta'}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </Modal>
  )
}
