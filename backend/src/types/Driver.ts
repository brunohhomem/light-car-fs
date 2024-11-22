import { Ride } from './Ride'

export interface Driver {
  id: number
  name: string
  description: string
  vehicle: string
  rating: number
  comment: string
  ratePerKm: number
  minDistance: number
  rides?: Ride[]
}
