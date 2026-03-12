import { motion } from "motion/react";
import { Search } from "lucide-react";

export function SearchView() {
  return (
    <motion.div
      key="search"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col items-center pt-20"
    >
      <div className="w-full max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-medium mb-4">Search Regulations</h1>
          <p className="text-gray-500 text-lg">Find rules, updates, and compliance requirements.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2 flex items-center gap-4 mb-12">
          <Search className="text-gray-400 ml-4" size={24} />
          <div className="h-8 flex-1 bg-gray-100 rounded animate-pulse mr-4"></div>
          <div className="h-12 w-32 bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="h-5 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-100 rounded animate-pulse"></div>
              <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="h-5 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-100 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
