import { motion } from "motion/react";

export function RadarView() {
  return (
    <motion.div
      key="radar"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-medium mb-2">Radar</h1>
        <p className="text-gray-500">Monitoring your regulatory landscape.</p>
      </div>
      <div className="max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
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
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
