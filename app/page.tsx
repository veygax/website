"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

// Sections
import ProfileSection from "@/components/profile-section";
import Section from "@/components/section";

// Icons
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDiscord,
  FaReddit,
} from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { AiOutlineDotNet } from "react-icons/ai";
import { Briefcase, ContactRound, Code } from "lucide-react";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Prevent rendering until client-side
  }

  const skills = [
    {
      name: "JavaScript",
      icon: IoLogoJavascript,
      description: "",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    {
      name: "React",
      icon: FaReact,
      description: "",
      url: "https://reactjs.org/",
    },
    {
      name: "Node.js",
      icon: FaNodeJs,
      description: "",
      url: "https://nodejs.org/",
    },
    {
      name: "Python",
      icon: FaPython,
      description: "",
      url: "https://www.python.org/",
    },
    {
      name: "C#/.NET",
      icon: AiOutlineDotNet,
      description: "",
      url: "https://dotnet.microsoft.com/en-us/",
    },
  ];

  const projects = [
    {
      name: "UEditor",
      description: "An easy way to mod Unreal Engine games.",
      icon: "/UEditor Logo Black.svg",
      url: "https://ueditor.lol",
    },
    {
      name: "DeckXP",
      description: "Provides the best way to use Windows on Steam Deck.",
      icon: "/deckxp-icon-1024.png",
      url: "https://github.com/veygax/DeckXP",
    },
    {
      name: "This website!",
      description: "The one your viewing right now!",
      icon: "https://placeholder.pics/svg/200",
      url: "https://veygax.dev",
    },
  ];

  const socials = [
    {
      name: "Discord",
      description: "",
      icon: FaDiscord,
      url: "https://dsc.gg/veygax",
    },
    {
      name: "Reddit",
      description: "",
      icon: FaReddit,
      url: "https://www.reddit.com/user/VeygaX/",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex items-center justify-center">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <ProfileSection />
          <Separator orientation="vertical" className="hidden md:block" />
          <div className="md:w-2/3 p-6">
            <Section title="Skills" icon={Code} items={skills} />
            <Section
              title="Projects"
              icon={Briefcase}
              items={projects}
              cardWidth="w-[250px]"
            />
            <Section title="Socials" icon={ContactRound} items={socials} />
          </div>
        </div>
      </div>
    </div>
  );
}
