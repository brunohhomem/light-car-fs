import { EstimateRideResponse, DriverOption } from '@/types'
import DriverCard from './driver-card'

export default function DriverCardList({
  drivers,
  estimateData,
  onSelect
}: {
  drivers: DriverOption[]
  estimateData: EstimateRideResponse
  onSelect: (driver: DriverOption, estimateData: EstimateRideResponse) => void
}) {
  return (
    <div className="grid gap-4">
      {drivers.map(driver => (
        <DriverCard
          key={driver.id}
          driver={driver}
          estimateData={estimateData}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}
