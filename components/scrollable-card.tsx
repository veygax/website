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
          <Link key={item.name} href={item.url} passHref legacyBehavior>
            <a className={`flex-none ${cardWidth} block`} target="_blank" rel="noopener noreferrer">
              <div
                className={`rounded-lg border border-gray-200 bg-white text-center p-4 h-full flex flex-col ${
                  item.description ? "justify-between" : "justify-center"
                } transition-shadow hover:shadow-md`}
              >
                <div className="mb-2 h-12 w-12 lg:h-16 lg:w-16 relative mx-auto">
                  {typeof item.icon === "string" ? (
                    <Image src={item.icon} alt={`${item.name} icon`} layout="fill" objectFit="contain" />
                  ) : (
                    <item.icon className="w-full h-full" />
                  )}
                </div>
                <h4 className="text-xs lg:text-sm font-semibold truncate">{item.name}</h4>
                {item.description && (
                  <div className="relative mt-2 h-4 lg:h-5 overflow-hidden">
                    <p className="text-xs text-gray-600 absolute whitespace-nowrap animate-scroll-text">
                      {item.description}
                    </p>
                  </div>
                )}
              </div>
            </a>
          </Link>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}