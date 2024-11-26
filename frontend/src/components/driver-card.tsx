import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from './ui/button'
import { DriverOption, EstimateRideResponse } from '@/types'

export default function DriverCard({
  driver,
  estimateData,
  onSelect
}: {
  driver: DriverOption
  estimateData: EstimateRideResponse
  onSelect: (driver: DriverOption, estimateData: EstimateRideResponse) => void
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{driver.name}</CardTitle>
        <CardDescription>{driver.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Dados do Homer</p>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          onClick={() => onSelect(driver, estimateData)}
        >
          Selecionar
        </Button>
      </CardFooter>
    </Card>
  )
}
