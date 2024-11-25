'use client'

import { Dialog, DialogContent, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { DialogFooter, DialogHeader } from './ui/dialog'
import { Input } from './ui/input'
import { useState } from 'react'
import { getRideHistory } from '@/service/routes-service'

interface Ride {
  id: number
  date: string
  origin: string
  destination: string
  distance: number
  duration: string
  driver: {
    id: number
    name: string
  }
  value: number
}

export default function HistoryModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [rides, setRides] = useState<Ride[]>([])

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const customer_id = formData.get('customer_id')?.toString()
    const driver_id = formData.get('driver_id')
      ? Number(formData.get('driver_id'))
      : undefined

    if (!customer_id) {
      alert('Por favor, preencha o código do usuário')
      return
    }

    setIsLoading(true)
    try {
      const data = await getRideHistory(customer_id, driver_id)
      setRides(data.rides)
      setIsOpen(false) // Fecha o modal após a busca
    } catch (error) {
      console.error('Erro ao buscar histórico:', error)
      alert('Erro ao buscar histórico. Verifique os dados e tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        Histórico
      </Button>
      {isOpen && (
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Histórico</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label
                  htmlFor="customer_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Código do usuário
                </label>
                <Input
                  id="customer_id"
                  name="customer_id"
                  type="text"
                  required
                  placeholder="Digite o código do usuário"
                />
              </div>
              <div>
                <label
                  htmlFor="driver_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Código do motorista
                </label>
                <Input
                  id="driver_id"
                  name="driver_id"
                  type="number"
                  placeholder="Digite o código do motorista"
                />
              </div>
              <DialogFooter>
                <Button type="submit" variant="default" disabled={isLoading}>
                  {isLoading ? 'Carregando...' : 'Buscar Histórico'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancelar
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
      {rides.length > 0 && (
        <div className="mt-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Data</th>
                <th className="border border-gray-300 p-2">Origem</th>
                <th className="border border-gray-300 p-2">Destino</th>
                <th className="border border-gray-300 p-2">Distância (km)</th>
                <th className="border border-gray-300 p-2">Duração</th>
                <th className="border border-gray-300 p-2">Motorista</th>
                <th className="border border-gray-300 p-2">Valor (R$)</th>
              </tr>
            </thead>
            <tbody>
              {rides.map(ride => (
                <tr key={ride.id}>
                  <td className="border border-gray-300 p-2">
                    {new Date(ride.date).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 p-2">{ride.origin}</td>
                  <td className="border border-gray-300 p-2">
                    {ride.destination}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {ride.distance.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {ride.duration}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {ride.driver.name}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {ride.value.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
