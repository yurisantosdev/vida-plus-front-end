/* eslint-disable import/no-unresolved */
import { api } from '../services/api'
import toast from 'react-hot-toast'
import { ManutencoesType } from '@/types/ManutencoesType'

export const createManutencao = async (data: ManutencoesType) => {
  return await api
    .post(`/manutencoes/create`, data)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      toast.error(
        'Não foi possível registrar a manutenção, por favor tente novamente!'
      )
    })
}

export const updateManutencao = async (data: ManutencoesType) => {
  return await api
    .put(`/manutencoes/update`, data)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      toast.error(
        'Não foi possível atualizar a manutenção, por favor tente novamente!'
      )
    })
}

export const findAllManutencoes = async (uscodigo: string) => {
  return await api
    .get(`/manutencoes/findAll/${uscodigo}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      toast.error(
        'Não foi possível realizar a consulta das manutenções, por favor tente novamente!'
      )
    })
}

export const findAllManutencoesVeiculo = async (vecodigo: string) => {
  return await api
    .get(`/manutencoes/findAll/veiculo/${vecodigo}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      toast.error(
        'Não foi possível realizar a consulta das manutenções do veículo, por favor tente novamente!'
      )
    })
}

export const findManutencao = async (mtcodigo: string) => {
  return await api
    .get(`/manutencoes/find/${mtcodigo}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      toast.error(
        'Não foi possível realizar a consulta da manutenção, por favor tente novamente!'
      )
    })
}

export const findTotalGastoManutencoes = async (uscodigo: string) => {
  return await api
    .get(`/manutencoes/find/total/gasto/${uscodigo}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      toast.error(
        'Não foi possível realizar a consulta do total das manutenções, por favor tente novamente!'
      )
    })
}
