'use client'

import DriverCardList from '@/components/driver-card-list'
import HistoryModal from '@/components/history-modal'
import NewRide from '@/components/new-ride'
import Map from '@/components/ride-map'
import { DriverOption, EstimateRideResponse } from '@/types'
import { Car } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const [drivers, setDrivers] = useState<DriverOption[]>([])
  const [estimateData, setEstimateData] = useState<EstimateRideResponse | null>(
    null
  )

  const handleDriverSelection = (
    driver: DriverOption,
    estimateData: EstimateRideResponse
  ) => {
    console.log('Motorista selecionado:', driver)
    console.log('Dados da estimativa:', estimateData)
    // Aqui você pode salvar os dados, redirecionar ou realizar outra ação
  }

  return (
    <div className="flex flex-col items-center justify-items-center p-10 gap-5 font-[family-name:var(--font-geist-sans)]">
      <header className="h-[2vh] mt-0 flex flex-col gap-2">
        <p>Light Car</p>
        <Car />
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start h-[80vh]">
        <div className="flex gap-2">
          <HistoryModal />
          <NewRide setDrivers={setDrivers} setEstimateData={setEstimateData} />
          {estimateData && (
            <div className="flex flex-row">
              <Map estimateData={estimateData} />
              <DriverCardList
                drivers={drivers}
                estimateData={estimateData}
                onSelect={handleDriverSelection}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
