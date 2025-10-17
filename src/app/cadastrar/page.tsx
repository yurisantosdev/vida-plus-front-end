'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLoading } from '@/redux/loading/actions'
import { useForm } from 'react-hook-form'
import InputComponent from '@/components/Input'
import {
  User,
  Envelope,
  Lock,
  Eye,
  EyeSlash,
  ArrowLeft,
  ShieldCheck
} from '@phosphor-icons/react'
import TextRequired from '@/components/TextRequired'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/Button'
import { Card, CardContent } from '@/components/Card'
import { validateEmail, validateFullName } from '@/utils/validators'
import toast from 'react-hot-toast'
import BaseApp from '@/components/BaseApp'
import { criarUsuario } from '@/store/Usuarios'
import { UsuariosType } from '@/types/UsuairosType'

export default function CadastrarUsuario() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [typePassword, setTypePassword] = useState<'text' | 'password'>(
    'password'
  )
  const [typeConfirmPassword, setTypeConfirmPassword] = useState<
    'text' | 'password'
  >('password')
  const [iconPassword, setIconPassword] = useState<React.ReactNode>(
    <EyeSlash size={20} />
  )
  const [iconConfirmPassword, setIconConfirmPassword] =
    useState<React.ReactNode>(<EyeSlash size={20} />)

  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors }
  } = useForm<UsuariosType>({
    defaultValues: {
      usnome: '',
      usemail: '',
      ussenha: '',
      confirmarSenha: ''
    }
  })

  useEffect(() => {
    dispatch(setLoading(false))
  }, [dispatch])

  async function onCadastrarUsuario(data: UsuariosType) {
    dispatch(setLoading(true))

    const response = await criarUsuario(data)

    if (response != undefined) {
      toast.success('Conta criada com sucesso! Faça login para continuar.')
      reset()
      router.back()
    }

    dispatch(setLoading(false))
  }

  return (
    <BaseApp loading={false} styleBase={false} navbar={false}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors mb-4 cursor-pointer">
              <ArrowLeft size={20} />
              <span>Voltar ao login</span>
            </button>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Criar Nova Conta
            </h1>
            <p className="text-gray-600 text-lg">
              Junte-se ao Vida+ e comece a gerenciar suas finanças de forma
              inteligente
            </p>
          </div>

          <Card className="max-w-3xl mx-auto">
            <CardContent>
              <div
                onSubmit={handleSubmit(onCadastrarUsuario)}
                className="space-y-5">
                {/* Dados Pessoais */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <User size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Dados Pessoais
                      </h2>
                      <p className="text-gray-600">
                        Informações básicas para sua conta
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputComponent
                      id="usnome"
                      type="text"
                      placeholder="Seu nome completo"
                      icon={
                        <User
                          size={20}
                          className={
                            errors.usnome ? 'text-red-600' : 'text-gray-400'
                          }
                        />
                      }
                      textLabel="Nome completo"
                      className="mb-4"
                      styleLabel="text-gray-700 font-medium text-sm"
                      requiredItem
                      {...register('usnome', {
                        required: true,
                        validate: {
                          validName: (value) =>
                            validateFullName(value) || 'Nome inválido'
                        }
                      })}
                      textError={errors.usnome && <TextRequired />}
                      error={errors.usnome}
                    />

                    <InputComponent
                      id="usemail"
                      type="email"
                      placeholder="seu@email.com"
                      icon={
                        <Envelope
                          size={20}
                          className={
                            errors.usemail ? 'text-red-600' : 'text-gray-400'
                          }
                        />
                      }
                      textLabel="E-mail"
                      className="mb-4"
                      styleLabel="text-gray-700 font-medium text-sm"
                      requiredItem
                      {...register('usemail', {
                        required: true,
                        validate: {
                          validEmail: (value) =>
                            validateEmail(value) || 'E-mail inválido'
                        }
                      })}
                      textError={errors.usemail && <TextRequired />}
                      error={errors.usemail}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputComponent
                      id="ussenha"
                      type={typePassword}
                      placeholder="Mínimo 8 caracteres"
                      icon={
                        <Lock
                          size={20}
                          className={
                            errors.ussenha ? 'text-red-600' : 'text-gray-400'
                          }
                        />
                      }
                      textLabel="Senha"
                      className="mb-4"
                      styleLabel="text-gray-700 font-medium text-sm"
                      requiredItem
                      buttonRight={iconPassword}
                      onClickButton={() => {
                        if (typePassword === 'password') {
                          setTypePassword('text')
                          setIconPassword(
                            <Eye size={20} className="text-gray-400" />
                          )
                        } else {
                          setTypePassword('password')
                          setIconPassword(
                            <EyeSlash size={20} className="text-gray-400" />
                          )
                        }
                      }}
                      {...register('ussenha', {
                        required: true,
                        minLength: 8
                      })}
                      textError={errors.ussenha && <TextRequired />}
                      error={errors.ussenha}
                    />

                    <InputComponent
                      id="confirmarSenha"
                      type={typeConfirmPassword}
                      placeholder="Confirme sua senha"
                      icon={
                        <ShieldCheck
                          size={20}
                          className={
                            errors.confirmarSenha
                              ? 'text-red-600'
                              : 'text-gray-400'
                          }
                        />
                      }
                      textLabel="Confirmar Senha"
                      className="mb-4"
                      styleLabel="text-gray-700 font-medium text-sm"
                      requiredItem
                      buttonRight={iconConfirmPassword}
                      onClickButton={() => {
                        if (typeConfirmPassword === 'password') {
                          setTypeConfirmPassword('text')
                          setIconConfirmPassword(
                            <Eye size={20} className="text-gray-400" />
                          )
                        } else {
                          setTypeConfirmPassword('password')
                          setIconConfirmPassword(
                            <EyeSlash size={20} className="text-gray-400" />
                          )
                        }
                      }}
                      {...register('confirmarSenha', {
                        required: true,
                        validate: (value) =>
                          value === watch('ussenha') ||
                          'As senhas não coincidem'
                      })}
                      textError={errors.confirmarSenha && <TextRequired />}
                      error={errors.confirmarSenha}
                    />
                  </div>
                </div>

                {/* Botões */}
                <div className="flex flex-col space-y-3 pt-6 border-t border-gray-200">
                  <Button
                    onClick={handleSubmit(onCadastrarUsuario)}
                    title="Criar Conta"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-12 py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg font-medium"
                  />

                  <Button
                    onClick={() => {
                      router.back()
                    }}
                    title="Já tenho conta"
                    className="w-full border border-blue-600 hover:bg-blue-700 text-blue-600 hover:text-white px-12 py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg font-medium"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              Ao criar uma conta, você concorda com nossos{' '}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 underline">
                Termos de Serviço
              </a>{' '}
              e{' '}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 underline">
                Política de Privacidade
              </a>
            </p>
          </div>
        </div>
      </div>
    </BaseApp>
  )
}
