'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { confirmRide } from '@/service/routes-service'
import { DriverProps } from '../../../types'

interface ConfirmRideModalProps {
  driver: DriverProps
  onClose: () => void
}

export default function ConfirmRideModal({
  driver,
  onClose
}: ConfirmRideModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    customer_id: '',
    origin: '',
    destination: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleConfirm = async () => {
    const { customer_id, origin, destination } = formData

    // Remover espaços em branco para validar os valores
    if (!customer_id.trim() || !origin.trim() || !destination.trim()) {
      alert('Todos os campos são obrigatórios.')
      return
    }

    setIsLoading(true)
    try {
      const data = {
        customer_id,
        origin,
        destination,
        distance: driver.min_distance, // Garantir que está vindo corretamente do DriverProps
        duration: driver.duration, // Garantir que duration existe
        driver: { id: driver.id, name: driver.name },
        value: driver.value
      }

      await confirmRide(data)
      alert('Viagem confirmada com sucesso!')
      onClose()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Erro ao confirmar a corrida:', error)
      alert(
        error.response?.data?.message ||
          'Erro ao confirmar a corrida. Tente novamente.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Corrida</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            name="customer_id"
            placeholder="ID do Cliente"
            onChange={handleInputChange}
            value={formData.customer_id}
          />
          <Input
            name="origin"
            placeholder="Origem"
            onChange={handleInputChange}
            value={formData.origin}
          />
          <Input
            name="destination"
            placeholder="Destino"
            onChange={handleInputChange}
            value={formData.destination}
          />
          <Button
            onClick={handleConfirm}
            className="w-full"
            variant="default"
            disabled={isLoading}
          >
            {isLoading ? 'Confirmando...' : 'Confirmar'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
