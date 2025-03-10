import Image from "next/image"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ProfileSection() {
  return (
    <div className="w-full lg:w-1/3 p-4 lg:p-6 bg-gray-50">
      <div className="text-center mb-4 lg:mb-6">
        <Image
          src="/PFP.png"
          alt="Profile Picture"
          width={150}
          height={150}
          className="rounded-full mx-auto mb-4 w-32 h-32 lg:w-40 lg:h-40"
        />
        <h2 className="text-xl lg:text-2xl font-semibold text-gray-800">VeygaX</h2>
      </div>
      <ScrollArea className="h-auto lg:h-[calc(100%-200px)]">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-2 lg:mb-4 text-gray-800">About Me</h1>
          <p className="text-sm lg:text-base text-gray-600 mb-2 lg:mb-4">
            i like making things
          </p>
          <p className="text-sm lg:text-base text-gray-600">
            gaming is fun too
          </p>
        </div>
      </ScrollArea>
    </div>
  )
}
