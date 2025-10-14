'use client'
import InputComponent from '@/components/Input'
import React, { ReactNode, useState, useEffect } from 'react'
import { User, Lock, Eye, EyeSlash } from '@phosphor-icons/react'
import { Button } from '@/components/Button'
import { useForm } from 'react-hook-form'
import { LoginType } from '@/types/LoginType'
import TextRequired from '@/components/TextRequired'
import { loginFuncion } from '@/store/Login'
import BaseApp from '@/components/BaseApp'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, logoutUser } from '@/redux/user/actions'
import { useRouter } from 'next/navigation'
import { setLoading } from '@/redux/loading/actions'

export default function Home() {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<LoginType>({
    defaultValues: {
      email: '',
      senha: ''
    }
  })
  const loading = useSelector((state: any) => state.loadingReducer.loading)
  const dispatch = useDispatch()
  const router = useRouter()
  const [typePassword, setTypePassword] = useState<'text' | 'password'>(
    'password'
  )
  const [iconPassword, setIconPassword] = useState<ReactNode>(
    <EyeSlash className="p-1" size={30} />
  )

  useEffect(() => {
    dispatch(setLoading(false))
  }, [])

  async function onLogin(data: LoginType) {
    dispatch(setLoading(true))

    try {
      const response = await loginFuncion(data)

      dispatch(setLoading(false))

      if (response != undefined) {
        const objUsuario = response.user
        objUsuario.token = response.access_token

        dispatch(loginUser(objUsuario))
        router.push('/home')
      }
    } catch (error) {
      dispatch(logoutUser())
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <BaseApp loading={loading} styleBase={false} navbar={false}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="flex min-h-screen">
          {/* Left Side - Features */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-12 text-white">
            <div className="max-w-md mx-auto flex flex-col justify-center">
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">Vida+</h1>
                <p className="text-xl text-blue-100 leading-relaxed">
                  A plataforma ideal para organizar e controlar suas finanças
                  pessoais.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              <div className="text-center mb-8 lg:hidden">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Vida+</h1>
                <p className="text-gray-600">Gestão Inteligente de Veículos</p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Bem-vindo de volta
                  </h2>
                  <p className="text-gray-600">
                    Entre com suas credenciais para acessar sua conta
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <InputComponent
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      className="w-full bg-gray-50 border-gray-200 text-gray-900 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
                      icon={<User size={20} className="text-gray-400" />}
                      textLabel="E-mail"
                      styleLabel="text-gray-700 font-medium text-sm"
                      {...register('email', {
                        required: true,
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'E-mail inválido'
                        }
                      })}
                      textError={errors.email && <TextRequired />}
                      error={errors.email}
                    />
                  </div>

                  <div>
                    <InputComponent
                      id="senha"
                      type={typePassword}
                      className="w-full bg-gray-50 border-gray-200 text-gray-900 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
                      textLabel="Senha"
                      styleLabel="text-gray-700 font-medium text-sm"
                      placeholder="Sua senha"
                      icon={<Lock size={20} className="text-gray-400" />}
                      buttonRight={iconPassword}
                      onClickButton={() => {
                        if (typePassword == 'password') {
                          setTypePassword('text')
                          setIconPassword(
                            <Eye
                              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                              size={20}
                            />
                          )
                        } else {
                          setTypePassword('password')
                          setIconPassword(
                            <EyeSlash
                              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                              size={20}
                            />
                          )
                        }
                      }}
                      {...register('senha', { required: true })}
                      textError={errors.senha && <TextRequired />}
                      error={errors.senha}
                    />

                    <div className="flex justify-end mt-2">
                      <button
                        type="button"
                        className="text-sm text-blue-600 hover:text-blue-700 transition-colors font-medium cursor-pointer hover:underline"
                        onClick={() => router.push('/esqueciSenha')}>
                        Esqueci minha senha
                      </button>
                    </div>
                  </div>

                  <Button
                    title="Entrar na plataforma"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg font-semibold text-base"
                    onClick={handleSubmit(onLogin)}
                  />

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">ou</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-600 text-sm mb-4">
                      Não tem uma conta ainda?
                    </p>
                    <Button
                      title="Criar nova conta"
                      className="w-full bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-6 rounded-xl transition-all duration-300 font-semibold text-base"
                      onClick={() => router.push('/cadastrar')}
                    />
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <p className="text-gray-500 text-xs">
                  © 2024 Vida+. Todos os direitos reservados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseApp>
  )
}
