import { DriverProps } from '../../types'
import Driver from './driver-card'

interface DriverListProps {
  drivers: DriverProps[] // Lista de motoristas tipada
}

export default function DriverList({ drivers }: DriverListProps) {
  return (
    <div className="w-full h-full flex flex-wrap justify-center gap-4 p-4">
      {drivers.length === 0 ? (
        <div className="w-full text-center text-lg text-gray-700">
          Bem-vindo! Faça uma estimativa para ver os motoristas disponíveis.
        </div>
      ) : (
        drivers.map(driver => <Driver key={driver.id} {...driver} />)
      )}
    </div>
  )
}
