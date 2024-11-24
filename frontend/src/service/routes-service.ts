import { ConfirmRideProps, EstimateRideProps } from '../../../types/index'
import api from './api'

export const estimateRide = async (data: EstimateRideProps) => {
  const response = await api.post('/ride/estimate', data)
  return response.data
}

export const confirmRide = async (data: ConfirmRideProps) => {
  const response = await api.patch('/ride/confirm', data)
  return response.data
}

// export const getRideHistory = async (data: any) => {
//   const response = await api.patch('/ride/history', data)
//   return response.data
// }
