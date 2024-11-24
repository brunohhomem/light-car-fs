'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from './ui/dialog'
import { Input } from './ui/input'
import { estimateRide } from '@/service/routes-service'
import { DriverProps } from '../../../types'

interface NewRideModalProps {
  onEstimate: (drivers: DriverProps[]) => void
}

export default function NewRideModal({ onEstimate }: NewRideModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleEstimate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const customer_id = formData.get('userId')?.toString()
    const origin = formData.get('origin')?.toString()
    const destination = formData.get('destination')?.toString()

    if (!customer_id || !origin || !destination) {
      alert('Por favor, preencha todos os campos')
      return
    }

    setIsLoading(true)

    try {
      const response = await estimateRide({
        customer_id,
        origin,
        destination
      })

      console.log('Resposta da API:', response)

      // Passando os motoristas para a `home`
      onEstimate(response.options)

      setIsOpen(false)
    } catch (error) {
      console.error('Erro ao estimar corrida:', error)
      alert('Erro ao estimar corrida')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        Nova Corrida
      </Button>
      {isOpen && (
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Nova Corrida</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEstimate} className="space-y-4">
              <div>
                <label
                  htmlFor="userId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Código do usuário
                </label>
                <Input
                  id="userId"
                  name="userId"
                  type="text"
                  required
                  placeholder="Digite o código do usuário"
                />
              </div>
              <div>
                <label
                  htmlFor="origin"
                  className="block text-sm font-medium text-gray-700"
                >
                  Origem
                </label>
                <Input
                  id="origin"
                  name="origin"
                  type="text"
                  required
                  placeholder="São Paulo, SP"
                />
              </div>
              <div>
                <label
                  htmlFor="destination"
                  className="block text-sm font-medium text-gray-700"
                >
                  Destino
                </label>
                <Input
                  id="destination"
                  name="destination"
                  type="text"
                  required
                  placeholder="Rio de Janeiro, RJ"
                />
              </div>
              <DialogFooter>
                <Button type="submit" variant="default" disabled={isLoading}>
                  {isLoading ? 'Carregando...' : 'Estimar Valor'}
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
    </>
  )
}
