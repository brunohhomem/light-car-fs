'use client'

import DriverCardList from '@/components/driver-card-list'
import NewRide from '@/components/new-ride'
import Map from '@/components/ride-map'
import { DriverOption, EstimateRideResponse } from '@/types'
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
    <div className="flex flex-col items-center justify-items-center p-8 pb-20 gap-5 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="">
        <p>Light Car</p>
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
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
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p>
          Desenvolvido com muito ♥ por{' '}
          <a href="https://brunohhomem.tech" target="_blank">
            <span className="text-blue-700 font-semibold">@brunohhomem</span>
          </a>
        </p>
      </footer>
    </div>
  )
}
