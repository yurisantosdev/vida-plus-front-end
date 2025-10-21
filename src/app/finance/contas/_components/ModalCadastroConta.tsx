'use client'
import Modal from '@/components/Modal'
import { ContasType } from '@/types/ContasType'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { setLoading } from '@/redux/loading/actions'
import toast from 'react-hot-toast'
import { atualizarConta, cadastrarConta } from '@/store/Contas'
import { Card, CardContent } from '@/components/Card'
import { CurrencyCircleDollar, Wallet, Bank } from '@phosphor-icons/react'
import InputComponent from '@/components/Input'
import { Button } from '@/components/Button'
import { CLickLabel } from '@/services/clickLabel'
import { UsuariosType } from '@/types/UsuairosType'

interface ModalCadastroContaProps {
  conta?: ContasType | null
  onSave?: (conta: ContasType) => void
  onClose?: () => void
  novaConta: boolean
}

export default function ModalCadastroConta({
  conta,
  onSave,
  onClose,
  novaConta
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
      cttipoconta: 'CORRENTE',
      cttitular: ''
    }
  })
  const loading = useSelector((state: any) => state.loadingReducer.loading)
  const dispatch = useDispatch()
  const user: UsuariosType = useSelector((state: any) => state.userReducer)

  useEffect(() => {
    if (conta && conta.ctcodigo) {
      setTimeout(() => {
        setValue('ctnome', conta.ctnome || '')
        setValue('ctsaldo', conta.ctsaldo || '0.00')
        setValue('cttipoconta', conta.cttipoconta || 'CORRENTE')
        setValue('cttitular', conta.cttitular || '')
        setValue('ctcodigo', conta.ctcodigo)
      }, 100)
    } else {
      reset({
        ctnome: '',
        ctsaldo: '0.00',
        cttipoconta: 'CORRENTE',
        cttitular: ''
      })
    }
  }, [conta, setValue, reset])

  const formatCurrency = (value: string) => {
    const numValue = parseFloat(value)
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numValue)
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

  const handleSubmitForm = async (data: ContasType) => {
    if (data.ctcodigo) {
      dispatch(setLoading(true))
      data.cttitular = user.uscodigo

      const response = await atualizarConta(data)

      if (response != undefined) {
        toast.success('Conta atualizada com sucesso!')
        reset()

        if (onSave) {
          onSave(data)
        }
      }

      dispatch(setLoading(false))
    } else {
      dispatch(setLoading(true))
      data.cttitular = user.uscodigo

      const response = await cadastrarConta(data)

      if (response != undefined) {
        toast.success('Conta criada com sucesso!')
        reset()

        if (onSave) {
          onSave(data)
        }
      }

      dispatch(setLoading(false))
    }
  }

  const handleClose = () => {
    if (!conta) {
      reset()
    }
    if (onClose) {
      onClose()
    }
  }

  return (
    <Modal
      htmlFor="modalCadastroConta"
      name={novaConta ? 'Editar Conta' : 'Nova Conta'}
      loading={loading}
      functioReset={handleClose}>
      <Card className="max-w-4xl mx-auto">
        <CardContent>
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Bank size={24} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {novaConta ? 'Editar Conta' : 'Nova Conta Bancária'}
                </h2>
                <p className="text-gray-600">
                  {novaConta
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
                  <label className="block text-sm font-medium text-gray-700">
                    Tipo de Conta
                  </label>
                  <div className="relative">
                    <select
                      {...register('cttipoconta', {
                        required: 'Tipo de conta é obrigatório'
                      })}
                      className="w-full px-4 py-3 border border-gray-300 text-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
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
              </div>
            </div>

            {/* Personalização */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                Personalização
              </h3>
            </div>

            {/* Preview da Conta */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                Prévia da Conta
              </h3>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center space-x-3">
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
                  </div>
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button
                onClick={() => {
                  reset()
                  CLickLabel('modalCadastroConta')
                }}
                title="Cancelar"
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors"
              />

              <Button
                onClick={handleSubmit(handleSubmitForm)}
                title="Salvar"
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Modal>
  )
}
