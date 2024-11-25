import Image from 'next/image'

export default function Banner() {
  return (
    <div className="flex items-center justify-between bg-gray-200 shadow-lg p-2 mb-2">
      <div className="flex items-center">
        <Image src="/logo.png" alt="logo" width={200} height={200} />
      </div>
      <div className="flex gap-4"></div>
    </div>
  )
}
