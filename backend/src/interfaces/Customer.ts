import { Ride } from './Ride'

export interface Customer {
  id: string
  name: string
  rides?: Ride[]
}
