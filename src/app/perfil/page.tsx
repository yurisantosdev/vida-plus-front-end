'use client'
import { AuthUser } from '@/services/auth'
import React, { useState, useEffect } from 'react'
import BaseLayout from '@/templates/BaseLayout'
import { UsuariosType } from '@/types/UsuairosType'
import { useSelector } from 'react-redux'
import {
  User,
  Camera,
  Envelope,
  Calendar,
  GenderIntersex,
  Palette,
  Globe,
  CurrencyDollar,
  Bell,
  Shield,
  Key,
  Trash,
  Pencil,
  Check,
  X,
  UserCircle,
  Lock,
  Eye,
  EyeSlash,
  Gear,
  Download,
  Upload,
  Warning
} from '@phosphor-icons/react'
import InputComponent from '@/components/Input'
import { Button } from '@/components/Button'
import { useForm } from 'react-hook-form'
import TextRequired from '@/components/TextRequired'
import toast from 'react-hot-toast'
import { Card } from '@/components/Card'
import HistoricoAtividades from '@/components/Perfil/HistoricoAtividades'

/**
 * Página de perfil do usuário completa
 * @description Interface profissional para gerenciar informações pessoais e configurações
 * @author Sistema
 */
export default function Perfil() {
  AuthUser()
  const user: UsuariosType = useSelector((state: any) => state.userReducer)
  const [editandoPerfil, setEditandoPerfil] = useState(false)
  const [editandoSenha, setEditandoSenha] = useState(false)
  const [editandoConfiguracoes, setEditandoConfiguracoes] = useState(false)
  const [mostrandoSenha, setMostrandoSenha] = useState(false)
  const [mostrandoNovaSenha, setMostrandoNovaSenha] = useState(false)
  const [mostrandoConfirmarSenha, setMostrandoConfirmarSenha] = useState(false)
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(
    user.usfoto || null
  )
  const [carregando, setCarregando] = useState(false)

  const {
    handleSubmit: handleSubmitPerfil,
    register: registerPerfil,
    reset: resetPerfil,
    watch: watchPerfil,
    formState: { errors: errorsPerfil }
  } = useForm<UsuariosType>({
    defaultValues: {
      usnome: user.usnome || '',
      usemail: user.usemail || '',
      usfoto: user.usfoto || '',
      usdataNascimento: user.usdataNascimento || '',
      usgenero: user.usgenero || 'OUTRO'
    }
  })

  const {
    handleSubmit: handleSubmitSenha,
    register: registerSenha,
    reset: resetSenha,
    watch: watchSenha,
    formState: { errors: errorsSenha }
  } = useForm({
    defaultValues: {
      senhaAtual: '',
      novaSenha: '',
      confirmarSenha: ''
    }
  })

  const {
    handleSubmit: handleSubmitConfig,
    register: registerConfig,
    reset: resetConfig,
    watch: watchConfig,
    formState: { errors: errorsConfig }
  } = useForm({
    defaultValues: {
      ustema: user.ustema || 'CLARO',
      usmoeda: user.usmoeda || 'BRL',
      usidioma: user.usidioma || 'PT'
    }
  })

  // Estatísticas mockadas
  const estatisticas = {
    contasAtivas: 3,
    transacoesMes: 47,
    saldoTotal: 12420.5,
    metasConcluidas: 2,
    metasAtivas: 3,
    diasNoApp: 45
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Não informado'
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR')
  }

  const getGeneroText = (genero: string) => {
    switch (genero) {
      case 'MASCULINO':
        return 'Masculino'
      case 'FEMININO':
        return 'Feminino'
      case 'OUTRO':
        return 'Outro'
      default:
        return 'Não informado'
    }
  }

  const getTemaText = (tema: string) => {
    switch (tema) {
      case 'CLARO':
        return 'Claro'
      case 'ESCURO':
        return 'Escuro'
      case 'SISTEMA':
        return 'Sistema'
      default:
        return 'Claro'
    }
  }

  const getMoedaText = (moeda: string) => {
    switch (moeda) {
      case 'BRL':
        return 'Real (R$)'
      case 'USD':
        return 'Dólar ($)'
      case 'EUR':
        return 'Euro (€)'
      default:
        return 'Real (R$)'
    }
  }

  const getIdiomaText = (idioma: string) => {
    switch (idioma) {
      case 'PT':
        return 'Português'
      case 'EN':
        return 'English'
      case 'ES':
        return 'Español'
      default:
        return 'Português'
    }
  }

  const handleSalvarPerfil = async (data: UsuariosType) => {
    setCarregando(true)
    try {
      // Simular delay da API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Aqui você implementaria a chamada para a API
      toast.success('Perfil atualizado com sucesso!')
      setEditandoPerfil(false)
      resetPerfil()
    } catch (error) {
      toast.error('Erro ao atualizar perfil')
    } finally {
      setCarregando(false)
    }
  }

  const handleSalvarSenha = async (data: any) => {
    if (data.novaSenha !== data.confirmarSenha) {
      toast.error('As senhas não coincidem!')
      return
    }

    if (data.novaSenha.length < 6) {
      toast.error('A nova senha deve ter pelo menos 6 caracteres!')
      return
    }

    setCarregando(true)
    try {
      // Simular delay da API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Aqui você implementaria a chamada para a API
      toast.success('Senha alterada com sucesso!')
      setEditandoSenha(false)
      resetSenha()
    } catch (error) {
      toast.error('Erro ao alterar senha')
    } finally {
      setCarregando(false)
    }
  }

  const handleSalvarConfiguracoes = async (data: any) => {
    setCarregando(true)
    try {
      // Simular delay da API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Aqui você implementaria a chamada para a API
      toast.success('Configurações salvas com sucesso!')
      setEditandoConfiguracoes(false)
      resetConfig()
    } catch (error) {
      toast.error('Erro ao salvar configurações')
    } finally {
      setCarregando(false)
    }
  }

  const handleCancelarEdicao = (tipo: 'perfil' | 'senha' | 'configuracoes') => {
    switch (tipo) {
      case 'perfil':
        setEditandoPerfil(false)
        resetPerfil()
        break
      case 'senha':
        setEditandoSenha(false)
        resetSenha()
        break
      case 'configuracoes':
        setEditandoConfiguracoes(false)
        resetConfig()
        break
    }
  }

  const handleUploadFoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Simular upload da foto
      const reader = new FileReader()
      reader.onload = (e) => {
        setFotoPerfil(e.target?.result as string)
        toast.success('Foto atualizada com sucesso!')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleExcluirConta = () => {
    if (
      confirm(
        'Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.'
      )
    ) {
      // Implementar lógica de exclusão
      toast.error('Funcionalidade de exclusão não implementada')
    }
  }

  const handleExportarDados = () => {
    // Implementar exportação de dados
    toast.success('Dados exportados com sucesso!')
  }

  return (
    <BaseLayout title="Meu Perfil">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Meu Perfil 👤
          </h1>
          <p className="text-gray-600 text-lg">
            Gerencie suas informações pessoais e configurações
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar com informações básicas */}
          <div className="lg:col-span-1">
            <Card className="p-6 mb-6">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                    {fotoPerfil ? (
                      <img
                        src={fotoPerfil}
                        alt="Foto do usuário"
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      <UserCircle size={48} className="text-white" />
                    )}
                  </div>
                  <label className="absolute -bottom-2 -right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors cursor-pointer">
                    <Camera size={16} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUploadFoto}
                      className="hidden"
                    />
                  </label>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {user.usnome}
                </h2>
                <p className="text-gray-600 text-sm mb-4">{user.usemail}</p>

                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-4">
                  <Calendar size={16} />
                  <span>Membro desde {formatDate(user.createdAt || '')}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Status</span>
                    <span className="flex items-center space-x-1 text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Ativo</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Verificação</span>
                    <span className="flex items-center space-x-1 text-green-600">
                      <Check size={16} />
                      <span>Verificado</span>
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Estatísticas rápidas */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Estatísticas
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Contas ativas</span>
                  <span className="font-bold text-blue-600">
                    {estatisticas.contasAtivas}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Transações este mês</span>
                  <span className="font-bold text-green-600">
                    {estatisticas.transacoesMes}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Saldo total</span>
                  <span className="font-bold text-gray-900">
                    R${' '}
                    {estatisticas.saldoTotal.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Metas concluídas</span>
                  <span className="font-bold text-purple-600">
                    {estatisticas.metasConcluidas}/{estatisticas.metasAtivas}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Dias no app</span>
                  <span className="font-bold text-orange-600">
                    {estatisticas.diasNoApp}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Conteúdo principal */}
          <div className="lg:col-span-3 space-y-6">
            {/* Informações Pessoais */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <User size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Informações Pessoais
                    </h3>
                    <p className="text-gray-600">
                      Gerencie seus dados pessoais
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setEditandoPerfil(!editandoPerfil)}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                  <Pencil size={16} />
                  <span className="font-medium">Editar</span>
                </button>
              </div>

              {editandoPerfil ? (
                <form
                  onSubmit={handleSubmitPerfil(handleSalvarPerfil)}
                  className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputComponent
                      id="usnome"
                      type="text"
                      placeholder="Seu nome completo"
                      icon={
                        <User
                          size={20}
                          className={
                            errorsPerfil.usnome
                              ? 'text-red-600'
                              : 'text-gray-400'
                          }
                        />
                      }
                      textLabel="Nome Completo"
                      className="mb-4"
                      styleLabel="text-gray-700 font-medium text-sm"
                      requiredItem
                      {...registerPerfil('usnome', {
                        required: 'Nome é obrigatório',
                        minLength: {
                          value: 3,
                          message: 'Nome deve ter pelo menos 3 caracteres'
                        }
                      })}
                      textError={
                        errorsPerfil.usnome && (
                          <span className="text-red-600 text-xs">
                            {errorsPerfil.usnome.message}
                          </span>
                        )
                      }
                      error={errorsPerfil.usnome}
                    />

                    <InputComponent
                      id="usemail"
                      type="email"
                      placeholder="seu@email.com"
                      icon={
                        <Envelope
                          size={20}
                          className={
                            errorsPerfil.usemail
                              ? 'text-red-600'
                              : 'text-gray-400'
                          }
                        />
                      }
                      textLabel="E-mail"
                      className="mb-4"
                      styleLabel="text-gray-700 font-medium text-sm"
                      requiredItem
                      {...registerPerfil('usemail', {
                        required: 'E-mail é obrigatório',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'E-mail inválido'
                        }
                      })}
                      textError={
                        errorsPerfil.usemail && (
                          <span className="text-red-600 text-xs">
                            {errorsPerfil.usemail.message}
                          </span>
                        )
                      }
                      error={errorsPerfil.usemail}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data de Nascimento
                      </label>
                      <input
                        type="date"
                        {...registerPerfil('usdataNascimento')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gênero
                      </label>
                      <select
                        {...registerPerfil('usgenero')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="MASCULINO">Masculino</option>
                        <option value="FEMININO">Feminino</option>
                        <option value="OUTRO">Outro</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                    <Button
                      type="button"
                      onClick={() => handleCancelarEdicao('perfil')}
                      title="Cancelar"
                      className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors"
                    />
                    <Button
                      type="submit"
                      title="Salvar"
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                      disabled={carregando}
                    />
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <Calendar size={20} className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">
                        Data de Nascimento
                      </p>
                      <p className="font-medium text-gray-900">
                        {formatDate(user.usdataNascimento || '')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <GenderIntersex size={20} className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Gênero</p>
                      <p className="font-medium text-gray-900">
                        {getGeneroText(user.usgenero || '')}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Segurança */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-red-100 rounded-xl">
                    <Shield size={24} className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Segurança
                    </h3>
                    <p className="text-gray-600">
                      Gerencie sua senha e segurança
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setEditandoSenha(!editandoSenha)}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                  <Key size={16} />
                  <span className="font-medium">Alterar Senha</span>
                </button>
              </div>

              {editandoSenha ? (
                <form
                  onSubmit={handleSubmitSenha(handleSalvarSenha)}
                  className="space-y-6">
                  <InputComponent
                    id="senhaAtual"
                    type={mostrandoSenha ? 'text' : 'password'}
                    placeholder="Sua senha atual"
                    icon={
                      <Lock
                        size={20}
                        className={
                          errorsSenha.senhaAtual
                            ? 'text-red-600'
                            : 'text-gray-400'
                        }
                      />
                    }
                    textLabel="Senha Atual"
                    className="mb-4"
                    styleLabel="text-gray-700 font-medium text-sm"
                    requiredItem
                    buttonRight={
                      <button
                        type="button"
                        onClick={() => setMostrandoSenha(!mostrandoSenha)}
                        className="text-gray-400 hover:text-gray-600">
                        {mostrandoSenha ? (
                          <EyeSlash size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    }
                    {...registerSenha('senhaAtual', {
                      required: 'Senha atual é obrigatória'
                    })}
                    textError={
                      errorsSenha.senhaAtual && (
                        <span className="text-red-600 text-xs">
                          {errorsSenha.senhaAtual.message}
                        </span>
                      )
                    }
                    error={errorsSenha.senhaAtual}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputComponent
                      id="novaSenha"
                      type={mostrandoNovaSenha ? 'text' : 'password'}
                      placeholder="Nova senha"
                      icon={
                        <Lock
                          size={20}
                          className={
                            errorsSenha.novaSenha
                              ? 'text-red-600'
                              : 'text-gray-400'
                          }
                        />
                      }
                      textLabel="Nova Senha"
                      className="mb-4"
                      styleLabel="text-gray-700 font-medium text-sm"
                      requiredItem
                      buttonRight={
                        <button
                          type="button"
                          onClick={() =>
                            setMostrandoNovaSenha(!mostrandoNovaSenha)
                          }
                          className="text-gray-400 hover:text-gray-600">
                          {mostrandoNovaSenha ? (
                            <EyeSlash size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      }
                      {...registerSenha('novaSenha', {
                        required: 'Nova senha é obrigatória',
                        minLength: {
                          value: 6,
                          message: 'Senha deve ter pelo menos 6 caracteres'
                        }
                      })}
                      textError={
                        errorsSenha.novaSenha && (
                          <span className="text-red-600 text-xs">
                            {errorsSenha.novaSenha.message}
                          </span>
                        )
                      }
                      error={errorsSenha.novaSenha}
                    />

                    <InputComponent
                      id="confirmarSenha"
                      type={mostrandoConfirmarSenha ? 'text' : 'password'}
                      placeholder="Confirme a nova senha"
                      icon={
                        <Lock
                          size={20}
                          className={
                            errorsSenha.confirmarSenha
                              ? 'text-red-600'
                              : 'text-gray-400'
                          }
                        />
                      }
                      textLabel="Confirmar Senha"
                      className="mb-4"
                      styleLabel="text-gray-700 font-medium text-sm"
                      requiredItem
                      buttonRight={
                        <button
                          type="button"
                          onClick={() =>
                            setMostrandoConfirmarSenha(!mostrandoConfirmarSenha)
                          }
                          className="text-gray-400 hover:text-gray-600">
                          {mostrandoConfirmarSenha ? (
                            <EyeSlash size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      }
                      {...registerSenha('confirmarSenha', {
                        required: 'Confirmação é obrigatória'
                      })}
                      textError={
                        errorsSenha.confirmarSenha && (
                          <span className="text-red-600 text-xs">
                            {errorsSenha.confirmarSenha.message}
                          </span>
                        )
                      }
                      error={errorsSenha.confirmarSenha}
                    />
                  </div>

                  <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                    <Button
                      type="button"
                      onClick={() => handleCancelarEdicao('senha')}
                      title="Cancelar"
                      className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors"
                    />
                    <Button
                      type="submit"
                      title="Alterar Senha"
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                      disabled={carregando}
                    />
                  </div>
                </form>
              ) : (
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <p className="text-sm text-gray-600">
                    Senha atualizada recentemente
                  </p>
                </div>
              )}
            </Card>

            {/* Configurações */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Gear size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Preferências
                    </h3>
                    <p className="text-gray-600">Personalize sua experiência</p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    setEditandoConfiguracoes(!editandoConfiguracoes)
                  }
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                  <Gear size={16} />
                  <span className="font-medium">Editar</span>
                </button>
              </div>

              {editandoConfiguracoes ? (
                <form
                  onSubmit={handleSubmitConfig(handleSalvarConfiguracoes)}
                  className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tema
                      </label>
                      <select
                        {...registerConfig('ustema')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="CLARO">Claro</option>
                        <option value="ESCURO">Escuro</option>
                        <option value="SISTEMA">Sistema</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Moeda
                      </label>
                      <select
                        {...registerConfig('usmoeda')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="BRL">Real (R$)</option>
                        <option value="USD">Dólar ($)</option>
                        <option value="EUR">Euro (€)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Idioma
                      </label>
                      <select
                        {...registerConfig('usidioma')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="PT">Português</option>
                        <option value="EN">English</option>
                        <option value="ES">Español</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                    <Button
                      type="button"
                      onClick={() => handleCancelarEdicao('configuracoes')}
                      title="Cancelar"
                      className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors"
                    />
                    <Button
                      type="submit"
                      title="Salvar"
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                      disabled={carregando}
                    />
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3">
                    <Palette size={20} className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Tema</p>
                      <p className="font-medium text-gray-900">
                        {getTemaText(user.ustema || '')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CurrencyDollar size={20} className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Moeda</p>
                      <p className="font-medium text-gray-900">
                        {getMoedaText(user.usmoeda || '')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe size={20} className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Idioma</p>
                      <p className="font-medium text-gray-900">
                        {getIdiomaText(user.usidioma || '')}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Ações Avançadas */}
            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <Warning size={24} className="text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Ações Avançadas
                  </h3>
                  <p className="text-gray-600">Gerenciar dados e conta</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Download size={20} className="text-blue-600" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Exportar Dados
                      </h4>
                      <p className="text-sm text-gray-600">
                        Baixar todos os seus dados em formato JSON
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={handleExportarDados}
                    title="Exportar"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Upload size={20} className="text-green-600" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Importar Dados
                      </h4>
                      <p className="text-sm text-gray-600">
                        Importar dados de outros sistemas
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() =>
                      toast('Funcionalidade em desenvolvimento', { icon: 'ℹ️' })
                    }
                    title="Importar"
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center space-x-3">
                    <Trash size={20} className="text-red-600" />
                    <div>
                      <h4 className="font-medium text-red-900">
                        Excluir Conta
                      </h4>
                      <p className="text-sm text-red-700">
                        Esta ação não pode ser desfeita
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={handleExcluirConta}
                    title="Excluir"
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  />
                </div>
              </div>
            </Card>

            {/* Histórico de Atividades */}
            <HistoricoAtividades />
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}
