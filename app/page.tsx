"use client"

import { useEffect, useState } from "react"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import ProfileSection from "@/components/profile-section"
import Section from "@/components/section"
import { IoLogoJavascript } from "react-icons/io5"
import { FaReact, FaNodeJs, FaPython, FaDiscord, FaReddit, FaVrCardboard } from "react-icons/fa"
import { AiOutlineDotNet } from "react-icons/ai"
import { Briefcase, ContactRound, Code, Heart } from "lucide-react"
import { TbLambda } from "react-icons/tb"
import { MdEdit } from "react-icons/md"
import { SiValve } from "react-icons/si"

export default function Home() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  const skills = [
    { name: "JavaScript", icon: IoLogoJavascript, description: "", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "React", icon: FaReact, description: "", url: "https://reactjs.org/" },
    { name: "Node.js", icon: FaNodeJs, description: "", url: "https://nodejs.org/" },
    { name: "Python", icon: FaPython, description: "", url: "https://www.python.org/" },
    { name: "C#/.NET", icon: AiOutlineDotNet, description: "", url: "https://dotnet.microsoft.com/en-us/" },
  ]

  const projects = [
    { name: "UEditor", description: "An easy way to mod Unreal Engine games.", icon: "/UEditor Logo Black.svg", url: "https://ueditor.lol" },
    { name: "DeckXP", description: "Provides the best way to use Windows on Steam Deck.", icon: "/deckxp-icon-1024.png", url: "https://github.com/veygax/DeckXP" },
    { name: "This website!", description: "The one your viewing right now!", icon: "https://placeholder.pics/svg/200", url: "https://veygax.dev" },
  ]

  const socials = [
    { name: "Discord", description: "", icon: FaDiscord, url: "https://dsc.gg/veygax" },
    { name: "Reddit", description: "", icon: FaReddit, url: "https://www.reddit.com/user/VeygaX/" },
  ]

  const hobbies = [
    { name: "Half-Life", description: '"Why do we have to wear these ridiculous ties?"', icon: TbLambda, url: "https://www.half-life.com/en/home/" },
    { name: "VR", description: "VR is awesome.", icon: FaVrCardboard, url: "https://store.steampowered.com/app/250820/SteamVR" },
    { name: "Modding", description: "I like messing with games.", icon: MdEdit, url: "https://melonwiki.xyz/" },
    { name: "Valve", description: "I like Valve :)", icon: SiValve, url: "https://www.valvesoftware.com/en/" },
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <ScrollArea className="w-full md:w-2/3 p-4 overflow-y-auto max-h-[60vh] md:max-h-[80vh] order-2 md:order-1">
            <Section title="Skills" icon={Code} items={skills} />
            <Section title="Projects" icon={Briefcase} items={projects} cardWidth="w-full sm:w-[250px]" />
            <Section title="Socials" icon={ContactRound} items={socials} />
            <Section title="Things I like" icon={Heart} items={hobbies} />
          </ScrollArea>
          <Separator orientation="horizontal" className="block md:hidden my-4 order-3" />
          <Separator orientation="vertical" className="hidden md:block order-2" />
          <ProfileSection />
        </div>
      </div>
    </div>
  )
}