import { ContasType } from '@/types/ContasType'
import { api } from '../services/api'
import toast from 'react-hot-toast'

export const consultarContasUsuario = async (uscodigo: string) => {
  return await api
    .get(`/contas/findAll/${uscodigo}`)
    .then((response) => {
      return response.data
    })
    .catch(() => {
      toast('Não foi possível consultar as contas, por favor tente novamente!')
    })
}

export const cadastrarConta = async (data: ContasType) => {
  return await api
    .post(`/contas/create/`, data)
    .then((response) => {
      return response.data
    })
    .catch(() => {
      toast('Não foi possível cadastrar a conta, por favor tente novamente!')
    })
}

export const atualizarConta = async (data: ContasType) => {
  return await api
    .post(`/contas/update/`, data)
    .then((response) => {
      return response.data
    })
    .catch(() => {
      toast('Não foi possível atualizar a conta, por favor tente novamente!')
    })
}

export const deletarConta = async (ctcodigo: string) => {
  return await api
    .delete(`/contas/delete/${ctcodigo}`)
    .then((response) => {
      return response.data
    })
    .catch(() => {
      toast('Não foi possível deletar a conta, por favor tente novamente!')
    })
}
