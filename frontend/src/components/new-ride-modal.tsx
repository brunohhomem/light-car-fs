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

export default function NewRideModal() {
  const [isOpen, setIsOpen] = useState(false)

  // Função para lidar com o envio do formulário
  const handleEstimate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const userId = formData.get('userId')?.toString()
    const origin = formData.get('origin')?.toString()
    const destination = formData.get('destination')?.toString()

    console.log('Dados enviados:', { userId, origin, destination })
    alert('Estimativa enviada para o console.')
    setIsOpen(false) // Fecha o modal após envio
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
                <Button type="submit" variant="default">
                  Estimar Valor
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
