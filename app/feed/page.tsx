"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PanelLeft, Search, User, Radar, ListPlus } from "lucide-react";
import { RadarView } from "./components/RadarView";
import { WatchlistView } from "./components/WatchlistView";
import { SearchView } from "./components/SearchView";
import { ProfileView } from "./components/ProfileView";

type View = "radar" | "watchlist" | "search" | "profile";

export default function RadarPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>("radar");

  const renderView = () => {
    switch (currentView) {
      case "radar":
        return <RadarView />;
      case "watchlist":
        return <WatchlistView />;
      case "search":
        return <SearchView />;
      case "profile":
        return <ProfileView />;
    }
  };

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
          <div className="flex items-center justify-between px-2 mb-8">
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
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 -mr-2 rounded-lg hover:bg-white/10 transition text-gray-300 hover:text-white shrink-0"
            >
              <PanelLeft size={24} />
            </button>
          </div>
          
          <nav className="flex flex-col gap-2">
            <button 
              onClick={() => setCurrentView("radar")}
              className={`flex items-center gap-4 p-2 rounded-lg transition w-full ${currentView === "radar" ? "bg-white/10 text-white" : "text-gray-300 hover:text-white hover:bg-white/5"}`}
            >
              <Radar size={24} className="shrink-0" />
              <motion.span animate={{ opacity: isSidebarOpen ? 1 : 0 }} className="font-medium">Radar</motion.span>
            </button>
            <button 
              onClick={() => setCurrentView("watchlist")}
              className={`flex items-center gap-4 p-2 rounded-lg transition w-full ${currentView === "watchlist" ? "bg-white/10 text-white" : "text-gray-300 hover:text-white hover:bg-white/5"}`}
            >
              <ListPlus size={24} className="shrink-0" />
              <motion.span animate={{ opacity: isSidebarOpen ? 1 : 0 }} className="font-medium">Watchlist</motion.span>
            </button>
            <button 
              onClick={() => setCurrentView("search")}
              className={`flex items-center gap-4 p-2 rounded-lg transition w-full ${currentView === "search" ? "bg-white/10 text-white" : "text-gray-300 hover:text-white hover:bg-white/5"}`}
            >
              <Search size={24} className="shrink-0" />
              <motion.span animate={{ opacity: isSidebarOpen ? 1 : 0 }} className="font-medium">Search</motion.span>
            </button>
            <button 
              onClick={() => setCurrentView("profile")}
              className={`flex items-center gap-4 p-2 rounded-lg transition w-full ${currentView === "profile" ? "bg-white/10 text-white" : "text-gray-300 hover:text-white hover:bg-white/5"}`}
            >
              <User size={24} className="shrink-0" />
              <motion.span animate={{ opacity: isSidebarOpen ? 1 : 0 }} className="font-medium">Profile</motion.span>
            </button>
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
        <div className="flex-1 p-8 overflow-y-auto pt-12">
          <AnimatePresence mode="wait">
            {renderView()}
          </AnimatePresence>
        </div>
      </motion.main>
    </div>
  );
}
