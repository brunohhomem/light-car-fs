import { EstimateRideProps } from '@/types'
import { EstimateRideResponse } from '@/types'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/' // Altere para a URL da sua API
})

export const estimateRide = async (
  data: EstimateRideProps
): Promise<EstimateRideResponse> => {
  const response = await api.post('/ride/estimate', data)
  return response.data
}

// export const confirmRide = async (data: ConfirmRideProps) => {
//   const response = await api.patch('/ride/confirm', data)
//   return response.data
// }

// export async function getRideHistory(customer_id: string, driver_id?: number) {
//   const query = driver_id ? `?driver_id=${driver_id}` : ''
//   const response = await api.get(`/ride/${customer_id}${query}`)
//   return response.data
// }

export default api
