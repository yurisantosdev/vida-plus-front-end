/* eslint-disable import/no-unresolved */
import { ChecklistsType } from '@/types/ChecklistsType'
import { api } from '../services/api'
import toast from 'react-hot-toast'

export const createChecklist = async (data: ChecklistsType) => {
  return await api
    .post(`/checklists/create`, data)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      toast.error(
        'Não foi possível registrar o checklist, por favor tente novamente!'
      )
    })
}

export const updateChecklist = async (data: ChecklistsType) => {
  return await api
    .put(`/checklists/update`, data)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      toast.error(
        'Não foi possível atualizar o checklist, por favor tente novamente!'
      )
    })
}

export const findAllChecklists = async (uscodigo: string) => {
  return await api
    .get(`/checklists/findAll/${uscodigo}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      toast.error(
        'Não foi possível realizar a consulta dos checklists, por favor tente novamente!'
      )
    })
}

export const findFinalizados = async (uscodigo: string) => {
  return await api
    .get(`/checklists/find/finalizados/${uscodigo}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      toast.error(
        'Não foi possível realizar a consulta dos checklists, por favor tente novamente!'
      )
    })
}

export const findChecklist = async (ckcodigo: string) => {
  return await api
    .get(`/checklists/find/${ckcodigo}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      toast.error(
        'Não foi possível realizar a consulta do checklist, por favor tente novamente!'
      )
    })
}
