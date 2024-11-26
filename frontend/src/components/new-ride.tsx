'use client'

import { Car } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { useState } from 'react'
import { estimateRide } from '@/app/services/server'
import { DriverOption, EstimateRideResponse } from '@/types'

export default function NewRide({
  setDrivers,
  setEstimateData
}: {
  setDrivers: (drivers: DriverOption[]) => void
  setEstimateData: (data: EstimateRideResponse | null) => void
}) {
  const [formData, setFormData] = useState({
    customer_id: '',
    origin: '',
    destination: ''
  })

  const [isModalOpen, setIsModalOpen] = useState(false) // Controle do modal

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleConfirm = async () => {
    const isFormValid = Object.values(formData).every(
      value => value.trim() !== ''
    )

    if (!isFormValid) {
      alert('Por favor, preencha todos os campos!')
      return
    }

    try {
      const response = await estimateRide(formData)

      if (response?.options) {
        console.log(response)

        setDrivers(response.options)
        setEstimateData(response) // Atualiza a lista de motoristas
        setIsModalOpen(false) // Fecha o modal
      } else {
        alert('Nenhum motorista encontrado.')
      }
    } catch (error) {
      console.error('Erro ao estimar corrida:', error)
      alert('Erro ao estimar corrida. Tente novamente.')
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="bg-blue-400 shadow-lg hover:bg-white hover:text-blue-400"
          onClick={() => setIsModalOpen(true)} // Abre o modal
        >
          Nova Corrida
          <Car />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Dados da Viagem</DialogTitle>
          <DialogDescription>Insira os dados da sua viagem</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Label htmlFor="customer_id" className="sr-only">
            Código do Usuário
          </Label>
          <Input
            name="customer_id"
            placeholder="Código do Usuário"
            value={formData.customer_id}
            onChange={handleInputChange}
          />
          <Label htmlFor="origin" className="sr-only">
            Origem
          </Label>
          <Input
            name="origin"
            placeholder="Onde você está agora?"
            value={formData.origin}
            onChange={handleInputChange}
          />
          <Label htmlFor="destination" className="sr-only">
            Destino
          </Label>
          <Input
            name="destination"
            placeholder="Para onde vamos?"
            value={formData.destination}
            onChange={handleInputChange}
          />
        </div>
        <DialogFooter className="sm:justify-between">
          <Button type="button" variant="default" onClick={handleConfirm}>
            Buscar <Car />
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Fechar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
