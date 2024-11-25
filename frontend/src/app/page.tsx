'use client'

import { useState } from 'react'
import NewRideModal from '@/components/new-ride-modal'
import DriverList from '@/components/driver-card-list'
import HistoryModal from '@/components/history-modal'
import Image from 'next/image'
import { DriverProps } from '../../types'

export default function Home() {
  const [drivers, setDrivers] = useState<DriverProps[]>([])

  const handleEstimate = (drivers: DriverProps[]) => {
    setDrivers(drivers)
  }

  return (
    <main>
      <div className="flex items-center justify-between bg-gray-200 shadow-lg p-2 mb-2">
        <div className="flex items-center">
          <Image src="/logo.png" alt="logo" width={200} height={200} />
        </div>
        <div className="flex gap-4">
          <HistoryModal></HistoryModal>
          <NewRideModal onEstimate={handleEstimate} />
        </div>
      </div>

      <DriverList drivers={drivers} />
    </main>
  )
}
