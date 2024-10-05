import { IconType } from "react-icons";
import { LucideIcon } from "lucide-react";
import ScrollableCard from "./scrollable-card";

interface SectionItem {
  name: string;
  icon: string | LucideIcon | IconType;
  description: string;
  url: string;
}

interface SectionProps {
  title: string;
  icon: LucideIcon | IconType | string;
  items: SectionItem[];
  cardWidth?: string; // Optional prop to adjust card width if needed
}

export default function Section({
  title,
  icon: Icon,
  items,
  cardWidth = "w-[150px]",
}: SectionProps) {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
        <Icon className="mr-2" /> {title}
      </h3>
      <ScrollableCard items={items} cardWidth={cardWidth} />
    </div>
  );
}
