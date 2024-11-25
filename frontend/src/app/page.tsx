'use client'

import { useState } from 'react'
import NewRideModal from '@/components/new-ride-modal'
import DriverList from '@/components/driver-card-list'
import { DriverProps } from '../../../types'
import HistoryModal from '@/components/history-modal'

export default function Home() {
  const [drivers, setDrivers] = useState<DriverProps[]>([])

  const handleEstimate = (drivers: DriverProps[]) => {
    setDrivers(drivers)
  }

  return (
    <main>
      <HistoryModal></HistoryModal>
      <NewRideModal onEstimate={handleEstimate} />
      <DriverList drivers={drivers} />
    </main>
  )
}
