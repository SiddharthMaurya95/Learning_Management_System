import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import DashboardHeader from "./dashboard/_components/DashboardHeader";
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader/>

      {/* Hero Section */}
      <main className="flex flex-col items-center text-center mt-16 px-4">
        <div className="text-sm bg-gray-100 rounded-full px-3 py-1 mb-4 flex items-center gap-2">
          <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded">New</span>
          <span>Tubeguruji.com All new Apps</span>
          <span className="ml-2">→</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl">
          AI-Powered <span className="text-blue-600">Exam Prep</span> <br />
          Material Generator
        </h1>
        <p className="mt-4 text-gray-500 text-lg max-w-xl">
          Your AI Exam Prep Companion: Effortless Study Material at Your Fingertips
        </p>

        <div className="flex gap-4 mt-8">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg">
            Get Started <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button variant="outline" className="px-6 py-3 text-lg">
            ▶ Watch video
          </Button>
        </div>

        {/* Emojis or Icons */}
        <div className="flex justify-between w-full max-w-6xl mt-10">
          <img src="/code.png" alt="emoji-left" className="h-16 md:h-24" />
          <img src="/knowledge.png" alt="emoji-right" className="h-16 md:h-24" />
        </div>

        {/* Featured In */}
        <div className="mt-20 text-gray-400 text-sm uppercase tracking-wider">
          Featured In
        </div>
        <div className="flex gap-12 mt-4 text-gray-700 text-lg font-medium">
          <span className="flex items-center gap-2">
            <img src="/yt.svg" alt="YouTube" className="h-6" /> YouTube
          </span>
          <span className="flex items-center gap-2">
            <img src="/ph.svg" alt="Product Hunt" className="h-6" /> Product Hunt
          </span>
          <span className="flex items-center gap-2">
            <img src="/reddit.svg" alt="Reddit" className="h-6" /> Reddit
          </span>
        </div>
      </main>
    </div>
  );
}
