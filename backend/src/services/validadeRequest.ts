import { EstimateRideProps } from '../types/EstimateRide'
import { AppError } from '../utils/AppError'

export function validateRequest(body: EstimateRideProps) {
  if (!body || Object.keys(body).length === 0) {
    throw new AppError('Corpo da requisição está vazio.', 400, 'INVALID_DATA')
  }

  const { customer_id, origin, destination } = body

  if (!customer_id || !origin || !destination) {
    throw new AppError('Preencha todos os campos.', 400, 'INVALID_DATA')
  }

  if (origin === destination) {
    throw new AppError(
      'A origem e o destino devem ser diferentes.',
      400,
      'INVALID_DATA'
    )
  }
}
