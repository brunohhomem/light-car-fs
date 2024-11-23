import { ConfirmRideProps } from '../types/index'
import { AppError } from '../utils/AppError'

export function validateConfirmRide(body: ConfirmRideProps) {
  if (!body || Object.keys(body).length === 0) {
    throw new AppError('Corpo da requisição está vazio.', 400, 'INVALID_DATA')
  }

  const {
    customer_id,
    origin,
    destination,
    driver,
    distance,
    duration,
    value
  } = body

  if (
    !customer_id ||
    !origin ||
    !destination ||
    !distance ||
    !duration ||
    !value
  ) {
    throw new AppError(
      'Preencha todos os campos obrigatórios.',
      400,
      'INVALID_DATA'
    )
  }

  if (origin === destination) {
    throw new AppError(
      'A origem e o destino devem ser diferentes.',
      400,
      'INVALID_DATA'
    )
  }

  if (!driver || !driver.id || !driver.name) {
    throw new AppError(
      'Dados do motorista são obrigatórios.',
      400,
      'INVALID_DRIVER'
    )
  }
}
