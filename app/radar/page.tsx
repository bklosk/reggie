"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Menu, Home, Settings, User, Bell, Search } from "lucide-react";

export default function RadarPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-full bg-[#111827] overflow-hidden flex p-4">
      {/* Sidebar */}
      <motion.div 
        className="flex flex-col text-white z-0 overflow-hidden whitespace-nowrap"
        initial={false}
        animate={{
          width: isSidebarOpen ? 256 : 0,
          opacity: isSidebarOpen ? 1 : 0,
          marginRight: isSidebarOpen ? 16 : 0,
        }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      >
        <div className="w-64 pt-8 pb-8 px-4 flex flex-col gap-6 h-full">
          <div className="flex items-center gap-2 mb-8 px-2">
            <span className="font-bold text-2xl tracking-tight">reggie</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-teal-400"></div>
              <div className="w-2 h-2 rounded-full bg-pink-400"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
            </div>
          </div>
          
          <nav className="flex flex-col gap-2">
            <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition">
              <Home size={20} />
              <span className="font-medium">Dashboard</span>
            </a>
            <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition">
              <Search size={20} />
              <span className="font-medium">Radar</span>
            </a>
            <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition">
              <Bell size={20} />
              <span className="font-medium">Alerts</span>
            </a>
            <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition">
              <User size={20} />
              <span className="font-medium">Profile</span>
            </a>
            <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition">
              <Settings size={20} />
              <span className="font-medium">Settings</span>
            </a>
          </nav>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <motion.main
        layout
        className="relative h-full flex-1 bg-[#f4f4f0] text-[#111827] bg-dot-pattern rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col"
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      >
        {/* Header */}
        <header className="p-6 flex items-center justify-between border-b border-gray-200/50 bg-white/50 backdrop-blur-sm">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-200/50 transition"
          >
            <Menu size={24} />
          </button>
          <div className="font-serif text-xl font-medium">Radar View</div>
          <div className="w-10 h-10 rounded-full bg-gray-200"></div>
        </header>

        {/* Placeholder Views */}
        <div className="flex-1 p-8 overflow-hidden">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Chart Placeholder */}
            <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-96 flex flex-col">
              <div className="h-6 w-48 bg-gray-200 rounded-md mb-6 animate-pulse"></div>
              <div className="flex-1 bg-gray-100 rounded-xl animate-pulse"></div>
            </div>

            {/* Side Stats Placeholders */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-32 flex flex-col justify-center">
                <div className="h-4 w-24 bg-gray-200 rounded-md mb-4 animate-pulse"></div>
                <div className="h-10 w-32 bg-gray-100 rounded-md animate-pulse"></div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-32 flex flex-col justify-center">
                <div className="h-4 w-24 bg-gray-200 rounded-md mb-4 animate-pulse"></div>
                <div className="h-10 w-32 bg-gray-100 rounded-md animate-pulse"></div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex-1 flex flex-col">
                <div className="h-4 w-32 bg-gray-200 rounded-md mb-4 animate-pulse"></div>
                <div className="space-y-3">
                  <div className="h-12 w-full bg-gray-100 rounded-lg animate-pulse"></div>
                  <div className="h-12 w-full bg-gray-100 rounded-lg animate-pulse"></div>
                  <div className="h-12 w-full bg-gray-100 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
