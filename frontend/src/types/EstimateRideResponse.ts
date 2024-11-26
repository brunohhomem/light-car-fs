export interface Coordinate {
  latitude: number
  longitude: number
}

export interface DriverReview {
  rating: number
  comment: string
}

export interface DriverOption {
  id: number
  name: string
  description: string
  vehicle: string
  review: DriverReview
  value: number
}

export interface EstimateRideResponse {
  customer_id: string
  origin: Coordinate
  destination: Coordinate
  distance: number
  duration: string
  options: DriverOption[]
  routeResponse: object
}
