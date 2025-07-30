/* eslint-disable import/no-unresolved */
import { AbastecimentosType } from '@/types/AbastecimentosType'
import { api } from '../services/api'
import toast from 'react-hot-toast'

export const createAbastecimento = async (data: AbastecimentosType) => {
  return await api
    .post(`/abastecimentos/create`, data)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      toast.error(
        'Não foi possível registrar o abastecimento, por favor tente novamente!'
      )
    })
}

export const updateAbastecimento = async (data: AbastecimentosType) => {
  return await api
    .put(`/abastecimentos/update`, data)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      toast.error(
        'Não foi possível atualizar o abastecimento, por favor tente novamente!'
      )
    })
}

export const findAllAbastecimentos = async (uscodigo: string) => {
  return await api
    .get(`/abastecimentos/findAll/${uscodigo}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      toast.error(
        'Não foi possível realizar a consulta dos abastecimentos, por favor tente novamente!'
      )
    })
}

export const findAllAbastecimentosVeiculo = async (vecodigo: string) => {
  return await api
    .get(`/abastecimentos/findAll/veiculo/${vecodigo}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      toast.error(
        'Não foi possível realizar a consulta dos abastecimentos do veículo, por favor tente novamente!'
      )
    })
}

export const findVeiculo = async (abcodigo: string) => {
  return await api
    .get(`/abastecimentos/find/${abcodigo}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      toast.error(
        'Não foi possível realizar a consulta do abastecimento, por favor tente novamente!'
      )
    })
}
