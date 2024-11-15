import { IconType } from "react-icons"
import { LucideIcon } from "lucide-react"
import ScrollableCard from "@/components/scrollable-card"

interface SectionItem {
  name: string
  icon: string | LucideIcon | IconType
  description: string
  url: string
}

interface SectionProps {
  title: string
  icon: LucideIcon | IconType | string
  items: SectionItem[]
  cardWidth?: string
}

export default function Section({ title, icon: Icon, items, cardWidth = "w-[150px] lg:w-[200px]" }: SectionProps) {
  return (
    <div className="mb-6 lg:mb-8">
      <h3 className="text-xl lg:text-2xl font-semibold mb-3 lg:mb-4 text-gray-800 flex items-center">
        <Icon className="mr-2 w-5 h-5 lg:w-6 lg:h-6" /> {title}
      </h3>
      <ScrollableCard items={items} cardWidth={cardWidth} />
    </div>
  )
}