/* eslint-disable import/no-unresolved */
import { UsuariosType } from '@/types/UsuairosType'
import { api } from '../services/api'
import toast from 'react-hot-toast'

export const criarUsuario = async (data: UsuariosType) => {
  return await api
    .post(`/usuarios/create`, data)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      const message =
        error.response?.data?.message || 'Erro ao criar conta. Tente novamente.'
      toast.error(message)
      return undefined
    })
}
