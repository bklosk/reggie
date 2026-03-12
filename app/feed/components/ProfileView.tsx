import { motion } from "motion/react";

export function ProfileView() {
  return (
    <motion.div
      key="profile"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-medium mb-2">Profile & Settings</h1>
        <p className="text-gray-500">Manage your account and preferences.</p>
      </div>
      <div className="max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 animate-pulse"></div>
            <div className="h-6 w-32 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="h-4 w-48 bg-gray-100 rounded mb-6 animate-pulse"></div>
            <div className="w-full h-10 bg-gray-100 rounded-lg animate-pulse"></div>
          </div>
        </div>
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="h-6 w-40 bg-gray-200 rounded mb-6 animate-pulse"></div>
            <div className="space-y-6">
              <div>
                <div className="h-4 w-24 bg-gray-100 rounded mb-2 animate-pulse"></div>
                <div className="h-12 w-full bg-gray-50 rounded-lg border border-gray-100 animate-pulse"></div>
              </div>
              <div>
                <div className="h-4 w-24 bg-gray-100 rounded mb-2 animate-pulse"></div>
                <div className="h-12 w-full bg-gray-50 rounded-lg border border-gray-100 animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="h-6 w-40 bg-gray-200 rounded mb-6 animate-pulse"></div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-5 w-48 bg-gray-100 rounded animate-pulse"></div>
                <div className="h-6 w-12 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="h-5 w-48 bg-gray-100 rounded animate-pulse"></div>
                <div className="h-6 w-12 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
