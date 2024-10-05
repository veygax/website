import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProfileSection() {
  return (
    <div className="md:w-1/3 p-6 bg-gray-50">
      <div className="text-center mb-6">
        <Image
          src="/PFP.png"
          alt="Profile Picture"
          width={200}
          height={200}
          className="rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold text-gray-800">VeygaX</h2>
      </div>
      <ScrollArea className="h-full">
        <div>
          <h1 className="text-3xl font-bold mb-4 text-gray-800">About Me</h1>
          <p className="text-gray-600 mb-4">
            I&apos;m a semi-experienced full stack developer who mostly develops
            for fun.
          </p>
          <p className="text-gray-600">
            Outside of coding, I spend my time playing games and such.
          </p>
        </div>
      </ScrollArea>
    </div>
  );
}
