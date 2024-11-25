import { Ride } from './Ride'

export interface Customer {
  id: string
  rides?: Ride[]
}
