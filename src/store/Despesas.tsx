/* eslint-disable import/no-unresolved */
import { api } from '../services/api'
import toast from 'react-hot-toast'
import { DespesasType } from '@/types/DespesasType'

export const createDespesa = async (data: DespesasType) => {
  return await api
    .post(`/despesas/create`, data)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      toast.error(
        'Não foi possível registrar a despesa, por favor tente novamente!'
      )
    })
}

export const updateDespesa = async (data: DespesasType) => {
  return await api
    .put(`/despesas/update`, data)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      toast.error(
        'Não foi possível atualizar a despesa, por favor tente novamente!'
      )
    })
}

export const findAllDespesas = async (uscodigo: string) => {
  return await api
    .get(`/despesas/findAll/${uscodigo}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      toast.error(
        'Não foi possível realizar a consulta das despesas, por favor tente novamente!'
      )
    })
}

export const findAllDespesasVeiculo = async (vecodigo: string) => {
  return await api
    .get(`/despesas/findAll/veiculo/${vecodigo}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      toast.error(
        'Não foi possível realizar a consulta das despesas do veículo, por favor tente novamente!'
      )
    })
}

export const findDespesa = async (dpcodigo: string) => {
  return await api
    .get(`/despesas/find/${dpcodigo}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      toast.error(
        'Não foi possível realizar a consulta da despesa, por favor tente novamente!'
      )
    })
}

export const findTotalGastoDespesas = async (uscodigo: string) => {
  return await api
    .get(`/despesas/find/total/gasto/${uscodigo}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      toast.error(
        'Não foi possível realizar a consulta do total das despesas, por favor tente novamente!'
      )
    })
}

export const deleteDespesa = async (dpcodigo: string) => {
  return await api
    .delete(`/despesas/delete/${dpcodigo}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      toast.error(
        'Não foi possível excluir a despesa, por favor tente novamente!'
      )
    })
}
