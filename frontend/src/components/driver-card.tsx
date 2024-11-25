import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from './ui/button'

export default function DriverCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Homer Simpson</CardTitle>
        <CardDescription>Descrição</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Dados do Homer</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Selecionar</Button>
      </CardFooter>
    </Card>
  )
}
