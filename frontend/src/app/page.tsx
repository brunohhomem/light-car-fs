'use client'

import { useState } from 'react'
import NewRideModal from '@/components/new-ride-modal'
import DriverList from '@/components/driver-list'
import { DriverProps } from '../../../types'

export default function Home() {
  const [drivers, setDrivers] = useState<DriverProps[]>([])

  const handleEstimate = (drivers: DriverProps[]) => {
    setDrivers(drivers)
  }

  return (
    <main>
      <NewRideModal onEstimate={handleEstimate} />
      <DriverList drivers={drivers} />
    </main>
  )
}
