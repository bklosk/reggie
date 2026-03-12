"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { PanelLeft, Home, Settings, User, Bell, Search } from "lucide-react";

export default function RadarPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-full bg-[#111827] overflow-hidden flex p-4">
      {/* Sidebar */}
      <motion.div 
        className="flex flex-col text-white z-0 overflow-hidden whitespace-nowrap"
        initial={false}
        animate={{
          width: isSidebarOpen ? 256 : 80,
          marginRight: 16,
        }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      >
        <div className="w-64 pt-6 pb-8 px-4 flex flex-col gap-6 h-full">
          <div className="flex items-center gap-4 px-2 mb-8">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 -ml-2 rounded-lg hover:bg-white/10 transition text-gray-300 hover:text-white"
            >
              <PanelLeft size={24} />
            </button>
            <motion.div 
              className="flex items-center gap-2"
              animate={{ opacity: isSidebarOpen ? 1 : 0 }}
            >
              <span className="font-bold text-2xl tracking-tight">reggie</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                <div className="w-2 h-2 rounded-full bg-pink-400"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              </div>
            </motion.div>
          </div>
          
          <nav className="flex flex-col gap-2">
            <a href="#" className="flex items-center gap-4 text-gray-300 hover:text-white hover:bg-white/10 p-2 rounded-lg transition">
              <Home size={24} className="shrink-0" />
              <motion.span animate={{ opacity: isSidebarOpen ? 1 : 0 }} className="font-medium">Dashboard</motion.span>
            </a>
            <a href="#" className="flex items-center gap-4 text-gray-300 hover:text-white hover:bg-white/10 p-2 rounded-lg transition">
              <Search size={24} className="shrink-0" />
              <motion.span animate={{ opacity: isSidebarOpen ? 1 : 0 }} className="font-medium">Radar</motion.span>
            </a>
            <a href="#" className="flex items-center gap-4 text-gray-300 hover:text-white hover:bg-white/10 p-2 rounded-lg transition">
              <Bell size={24} className="shrink-0" />
              <motion.span animate={{ opacity: isSidebarOpen ? 1 : 0 }} className="font-medium">Alerts</motion.span>
            </a>
            <a href="#" className="flex items-center gap-4 text-gray-300 hover:text-white hover:bg-white/10 p-2 rounded-lg transition">
              <User size={24} className="shrink-0" />
              <motion.span animate={{ opacity: isSidebarOpen ? 1 : 0 }} className="font-medium">Profile</motion.span>
            </a>
            <a href="#" className="flex items-center gap-4 text-gray-300 hover:text-white hover:bg-white/10 p-2 rounded-lg transition">
              <Settings size={24} className="shrink-0" />
              <motion.span animate={{ opacity: isSidebarOpen ? 1 : 0 }} className="font-medium">Settings</motion.span>
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
        {/* Placeholder Views */}
        <div className="flex-1 p-8 overflow-hidden pt-12">
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
