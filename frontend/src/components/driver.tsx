import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from './ui/button'

export default function Driver() {
  return (
    <Card className="w-[400px] shadow-xl rounded-lg border border-gray-200">
      <CardHeader className="space-y-2">
        <CardTitle className="text-lg font-semibold text-gray-700 text-center">
          Homer Simpson
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 text-justify">
          Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o
          passeio, com direito a rosquinhas e boas risadas (e talvez alguns
          desvios).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <p className="text-sm font-medium text-gray-700">Veículo:</p>
          <p className="text-sm text-gray-600">
            Plymouth Valiant 1973 rosa e enferrujado
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex">
            <p className="text-sm font-medium text-gray-700">Avaliação:</p>
            <p className="text-sm text-gray-600">2/5</p>
          </div>
          <div className="flex">
            <p className="text-sm font-medium text-gray-700">
              Distância mínima:
            </p>
            <p className="text-sm text-gray-600">0km</p>
          </div>
          <div className="flex">
            <p className="text-sm font-medium text-gray-700">Taxa por km:</p>
            <p className="text-sm text-gray-600">R$ 2.50</p>
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
