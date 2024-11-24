import DriverList from '@/components/driver-list'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <div>
        <h1>LIGHT CAR</h1>
        <Image src="/logo.png" alt="logo" width={250} height={250}></Image>
      </div>
      <DriverList />
    </main>
  )
}
