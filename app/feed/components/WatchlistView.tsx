import { motion } from "motion/react";

export function WatchlistView() {
  return (
    <motion.div
      key="watchlist"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-medium mb-2">Watchlist</h1>
        <p className="text-gray-500">Items you are actively tracking.</p>
      </div>
      <div className="max-w-5xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="divide-y divide-gray-100">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse"></div>
                <div>
                  <div className="h-5 w-48 bg-gray-200 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 w-32 bg-gray-100 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="h-8 w-20 bg-gray-100 rounded-full animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
