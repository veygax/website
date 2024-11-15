import Image from "next/image"
import Link from "next/link"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { LucideIcon } from 'lucide-react'
import { IconType } from "react-icons"

interface Item {
  name: string
  icon: string | LucideIcon | IconType
  description?: string
  url: string
}

interface ScrollableCardProps {
  items: Item[]
  cardWidth: string
}

export default function ScrollableCard({ items, cardWidth }: ScrollableCardProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {items.map((item) => (
          <div key={item.name} className={`flex-none ${cardWidth}`}>
            <div
              className="rounded-lg border border-gray-200 bg-white text-center p-2 md:p-4 h-full flex flex-col justify-between transition-shadow hover:shadow-md"
            >
              <div className="mb-2 h-8 w-8 md:h-12 md:w-12 relative mx-auto">
                {typeof item.icon === "string" ? (
                  <Image src={item.icon} alt={`${item.name} icon`} layout="fill" objectFit="contain" />
                ) : (
                  <item.icon className="w-full h-full" />
                )}
              </div>
              <h4 className="text-xs md:text-sm font-semibold truncate">{item.name}</h4>
              {item.description && (
                <div className="relative mt-1 md:mt-2 h-3 md:h-4 overflow-hidden">
                  <p className="text-xs text-gray-600 absolute whitespace-nowrap animate-scroll-text">
                    {item.description}
                  </p>
                </div>
              )}
              <Link
                href={item.url}
                className="mt-2 text-xs md:text-sm text-blue-600 hover:underline block w-full h-6 md:h-8"
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}