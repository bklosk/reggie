import { Menu } from "lucide-react";

export default function RadarLoading() {
  return (
    <div className="h-screen w-full bg-[#111827] overflow-hidden flex p-4">
      {/* Main Content Area (Skeleton) */}
      <main className="relative h-full flex-1 bg-[#f4f4f0] text-[#111827] bg-dot-pattern rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col">
        {/* Header Skeleton */}
        <header className="p-6 flex items-center justify-between border-b border-gray-200/50 bg-white/50 backdrop-blur-sm">
          <div className="p-2 rounded-lg text-gray-400">
            <Menu size={24} />
          </div>
          <div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
        </header>

        {/* Placeholder Views Skeleton */}
        <div className="flex-1 p-8 overflow-hidden">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Chart Placeholder */}
            <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-96 flex flex-col">
              <div className="h-6 w-48 bg-gray-200 rounded-md mb-6 animate-pulse"></div>
              <div className="flex-1 bg-gray-100 rounded-xl animate-pulse skeleton-shimmer"></div>
            </div>

            {/* Side Stats Placeholders */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-32 flex flex-col justify-center">
                <div className="h-4 w-24 bg-gray-200 rounded-md mb-4 animate-pulse"></div>
                <div className="h-10 w-32 bg-gray-100 rounded-md animate-pulse skeleton-shimmer"></div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-32 flex flex-col justify-center">
                <div className="h-4 w-24 bg-gray-200 rounded-md mb-4 animate-pulse"></div>
                <div className="h-10 w-32 bg-gray-100 rounded-md animate-pulse skeleton-shimmer"></div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex-1 flex flex-col">
                <div className="h-4 w-32 bg-gray-200 rounded-md mb-4 animate-pulse"></div>
                <div className="space-y-3">
                  <div className="h-12 w-full bg-gray-100 rounded-lg animate-pulse skeleton-shimmer"></div>
                  <div className="h-12 w-full bg-gray-100 rounded-lg animate-pulse skeleton-shimmer"></div>
                  <div className="h-12 w-full bg-gray-100 rounded-lg animate-pulse skeleton-shimmer"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
