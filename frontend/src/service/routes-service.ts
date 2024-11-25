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

export async function getRideHistory(customer_id: string, driver_id?: number) {
  const query = driver_id ? `?driver_id=${driver_id}` : ''
  const response = await api.get(`/ride/${customer_id}${query}`)
  return response.data
}
