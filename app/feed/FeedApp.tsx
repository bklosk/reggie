"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import { PanelLeft, Search, User, Radar, ListPlus } from "lucide-react";
import {
  clearOnboardingCompletionCookie,
  getOnboardingPreferences,
  hasOnboardingCompletionCookie,
  type OnboardingPreferences,
} from "@/lib/onboarding";
import FeedLoading from "./loading";
import { RadarView } from "./components/RadarView";
import { WatchlistView } from "./components/WatchlistView";
import { SearchView } from "./components/SearchView";
import { ProfileView } from "./components/ProfileView";

type View = "radar" | "watchlist" | "search" | "profile";

export function FeedApp() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>("radar");
  const [profile, setProfile] = useState<OnboardingPreferences | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function hydrate() {
      if (!hasOnboardingCompletionCookie()) {
        clearOnboardingCompletionCookie();
        router.replace("/onboarding");
        return;
      }

      const preferences = await getOnboardingPreferences();

      if (!preferences) {
        clearOnboardingCompletionCookie();
        router.replace("/onboarding");
        return;
      }

      if (!isMounted) {
        return;
      }

      setProfile(preferences);
      setIsReady(true);
    }

    hydrate();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const renderView = () => {
    switch (currentView) {
      case "radar":
        return <RadarView profile={profile} />;
      case "watchlist":
        return <WatchlistView />;
      case "search":
        return <SearchView />;
      case "profile":
        return <ProfileView profile={profile} />;
    }
  };

  if (!isReady) {
    return <FeedLoading />;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#111827] p-4">
      <motion.div
        className="relative z-0 flex shrink-0 flex-col overflow-hidden whitespace-nowrap text-white"
        initial={false}
        animate={{
          width: isSidebarOpen ? 256 : 64,
          marginRight: 16,
        }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      >
        <div className="flex h-full min-w-0 flex-col gap-6 px-2 pb-8 pt-6">
          <div
            className={`mb-8 flex min-h-10 items-center ${
              isSidebarOpen ? "justify-between px-3" : "justify-center"
            }`}
          >
            <AnimatePresence initial={false}>
              {isSidebarOpen ? (
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold tracking-tight">reggie</span>
                      <div className="flex gap-1">
                        <div className="h-2 w-2 rounded-full bg-teal-400" />
                        <div className="h-2 w-2 rounded-full bg-pink-400" />
                        <div className="h-2 w-2 rounded-full bg-yellow-400" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="-mr-1 shrink-0 rounded-lg p-2 text-gray-300 transition hover:bg-white/10 hover:text-white"
            >
              <PanelLeft size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            <button
              onClick={() => setCurrentView("radar")}
              className={`flex w-full items-center rounded-lg p-2 transition ${
                isSidebarOpen ? "gap-4" : "justify-center"
              } ${
                currentView === "radar"
                  ? "bg-white/10 text-white"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Radar size={24} className="shrink-0" />
              {isSidebarOpen ? <span className="font-serif font-medium">Radar</span> : null}
            </button>
            <button
              onClick={() => setCurrentView("watchlist")}
              className={`flex w-full items-center rounded-lg p-2 transition ${
                isSidebarOpen ? "gap-4" : "justify-center"
              } ${
                currentView === "watchlist"
                  ? "bg-white/10 text-white"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <ListPlus size={24} className="shrink-0" />
              {isSidebarOpen ? <span className="font-serif font-medium">Watchlist</span> : null}
            </button>
            <button
              onClick={() => setCurrentView("search")}
              className={`flex w-full items-center rounded-lg p-2 transition ${
                isSidebarOpen ? "gap-4" : "justify-center"
              } ${
                currentView === "search"
                  ? "bg-white/10 text-white"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Search size={24} className="shrink-0" />
              {isSidebarOpen ? <span className="font-serif font-medium">Search</span> : null}
            </button>
            <button
              onClick={() => setCurrentView("profile")}
              className={`flex w-full items-center rounded-lg p-2 transition ${
                isSidebarOpen ? "gap-4" : "justify-center"
              } ${
                currentView === "profile"
                  ? "bg-white/10 text-white"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <User size={24} className="shrink-0" />
              {isSidebarOpen ? <span className="font-serif font-medium">Profile</span> : null}
            </button>
          </nav>
        </div>
      </motion.div>

      <motion.main
        layout
        className="relative z-10 flex h-full flex-1 flex-col overflow-hidden rounded-3xl bg-[#f4f4f0] bg-dot-pattern text-[#111827] shadow-2xl"
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      >
        <div className="flex-1 overflow-y-auto p-8 pt-10">
          <AnimatePresence mode="wait">{renderView()}</AnimatePresence>
        </div>
      </motion.main>
    </div>
  );
}
