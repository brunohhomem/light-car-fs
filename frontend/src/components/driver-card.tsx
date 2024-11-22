import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from './ui/button'
import { DriverProps } from '../../../types'

export default function DriverCard({
  id,
  name,
  description,
  vehicle,
  review,
  min_distance,
  value
}: DriverProps) {
  return (
    <Card
      className="w-[400px] shadow-xl rounded-lg border border-gray-300"
      key={id}
    >
      <CardHeader className="space-y-2">
        <CardTitle className="text-lg font-semibold text-gray-800">
          {name || 'Nome Indisponível'}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          {description || 'Descrição não disponível'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <p className="text-sm font-medium text-gray-700">Veículo:</p>
          <p className="text-sm text-gray-600">{vehicle || 'Indisponível'}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex">
            <p className="text-sm font-medium text-gray-700">Avaliação:</p>
            <p className="text-sm text-gray-600">
              {review.rating !== undefined
                ? `${review.rating.toFixed(1)}/5`
                : 'N/A'}
            </p>
          </div>
          <div className="flex">
            <p className="text-sm font-medium text-gray-700">
              Distância mínima:
            </p>
            <p className="text-sm text-gray-600">
              {min_distance !== undefined
                ? `${min_distance.toFixed(2)} km`
                : 'N/A'}
            </p>
          </div>
          <div className="flex">
            <p className="text-sm font-medium text-gray-700">Total:</p>
            <p className="text-sm text-gray-600">
              {value !== undefined ? `R$ ${value.toFixed(2)}` : 'N/A'}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pt-4">
        <Button className="w-full sm:w-auto" variant="outline">
          Selecionar
        </Button>
      </CardFooter>
    </Card>
  )
}
