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
import { confirmRide } from '@/app/services/server'

export default function DriverCard({
  driver,
  estimateData,
  onSelect
}: {
  driver: DriverOption
  estimateData: EstimateRideResponse
  onSelect: (driver: DriverOption, estimateData: EstimateRideResponse) => void
}) {
  const handleSelect = async () => {
    try {
      const confirmRideData = {
        customer_id: estimateData.customer_id,
        origin: `${estimateData.origin.latitude},${estimateData.origin.longitude}`,
        destination: `${estimateData.destination.latitude},${estimateData.destination.longitude}`,
        distance: estimateData.distance,
        duration: estimateData.duration,
        driver: {
          id: driver.id,
          name: driver.name
        },
        value: driver.value
      }

      const response = await confirmRide(confirmRideData)
      console.log('Corrida confirmada:', response)

      onSelect(driver, estimateData)
    } catch (error) {
      console.error('Erro ao confirmar corrida:', error)
    }
  }

  return (
    <Card
      className="w-[400px] shadow-xl rounded-lg border border-gray-300"
      key={driver.id}
    >
      <CardHeader className="space-y-2">
        <CardTitle className="text-lg font-semibold text-gray-700">
          {driver.name || 'Nome Indisponível'}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          {driver.description || 'Descrição não disponível'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <p className="text-sm font-medium text-gray-700">
            Veículo: {driver.vehicle || 'Indisponível'}
          </p>
        </div>
        <div className="flex gap-1">
          <p className="text-sm font-medium text-gray-700">Avaliação:</p>
          <p className="text-sm text-gray-600">
            {driver.review.rating !== undefined
              ? `${driver.review.rating.toFixed(1)}`
              : 'N/A'}
          </p>
          <p className="text-sm font-medium text-gray-700">
            Total:{' '}
            {driver.value !== undefined
              ? `R$ ${driver.value.toFixed(1)}`
              : 'N/A'}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" onClick={handleSelect}>
          Selecionar
        </Button>
      </CardFooter>
    </Card>
  )
}
