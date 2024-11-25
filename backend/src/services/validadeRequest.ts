import { EstimateRideProps } from '../types'
import { AppError } from '../utils/AppError'

export function validateRequest(body: EstimateRideProps) {
  if (!body || Object.keys(body).length === 0) {
    throw new AppError(
      'Os dados fornecidos no corpo da requisição são inválidos',
      400,
      'INVALID_DATA'
    )
  }

  const { customer_id, origin, destination } = body

  if (!customer_id || !origin || !destination) {
    throw new AppError(
      'Os dados fornecidos no corpo da requisição são inválidos',
      400,
      'INVALID_DATA'
    )
  }

  if (origin === destination) {
    throw new AppError(
      'Os dados fornecidos no corpo da requisição são inválidos',
      400,
      'INVALID_DATA'
    )
  }
}
