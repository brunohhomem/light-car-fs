import { Customer } from './Customer'
import { Driver } from './Driver'

export interface Ride {
  id: number
  date: Date
  origin: string
  destination: string
  distance: number
  duration: string
  value: number
  customerId: string
  driverId: number
  customer?: Customer // Relacionamento opcional
  driver?: Driver // Relacionamento opcional
}
