/* eslint-disable import/no-unresolved */
import { VeiculosType } from '@/types/VeiculosType'
import { api } from '../services/api'
import toast from 'react-hot-toast'

export const createVeiculo = async (data: VeiculosType) => {
  return await api
    .post(`/veiculos/create`, data)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      toast.error(
        'Não foi possível registrar o veículo, por favor tente novamente!'
      )
    })
}

export const updateVeiculo = async (data: VeiculosType) => {
  return await api
    .put(`/veiculos/update`, data)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      toast.error(
        'Não foi possível atualizar o veículo, por favor tente novamente!'
      )
    })
}

export const findAllVeiculos = async (uscodigo: string) => {
  return await api
    .get(`/veiculos/findAll/${uscodigo}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      toast.error(
        'Não foi possível realizar a consulta dos veículos, por favor tente novamente!'
      )
    })
}

export const findVeiculo = async (vecodigo: string) => {
  return await api
    .get(`/veiculos/find/${vecodigo}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      toast.error(
        'Não foi possível realizar a consulta do veículo, por favor tente novamente!'
      )
    })
}

export const deleteVeiculo = async (vecodigo: string) => {
  return await api
    .delete(`/veiculos/delete/${vecodigo}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      toast.error(
        'Não foi possível realizar a exclusão do veículo, por favor tente novamente!'
      )
    })
}
