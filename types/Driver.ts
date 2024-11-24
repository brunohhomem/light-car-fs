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

export interface DriverProps {
  id: number
  name: string
  description: string
  vehicle: string
  review: {
    rating: number
    comment: string
  }
  min_distance: number
  value: number
}
