import { api } from '../services/api'
import toast from 'react-hot-toast'

export const consultarBancos = async () => {
  return await api
    .get(`/bancos/findAll`)
    .then((response) => {
      return response.data
    })
    .catch(() => {
      toast('Não foi possível consultar os bancos, por favor tente novamente!')
    })
}
