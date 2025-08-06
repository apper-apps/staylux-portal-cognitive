import React from "react"
import { motion } from "framer-motion"

const Loading = ({ type = "default", className = "" }) => {
  if (type === "cards") {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="w-full h-48 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 animate-pulse bg-[length:200%_100%] bg-gradient-animation" />
            <div className="p-6 space-y-4">
              <div className="h-6 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded animate-pulse bg-[length:200%_100%]" />
              <div className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded animate-pulse bg-[length:200%_100%]" />
                <div className="h-4 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-2/3 animate-pulse bg-[length:200%_100%]" />
              </div>
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-24 animate-pulse bg-[length:200%_100%]" />
                <div className="h-10 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-20 animate-pulse bg-[length:200%_100%]" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  if (type === "table") {
    return (
      <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
        <div className="p-6 border-b border-gray-100">
          <div className="h-6 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-48 animate-pulse bg-[length:200%_100%]" />
        </div>
        <div className="divide-y divide-gray-100">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="p-6 grid grid-cols-6 gap-4"
            >
              <div className="h-4 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded animate-pulse bg-[length:200%_100%]" />
              <div className="h-4 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded animate-pulse bg-[length:200%_100%]" />
              <div className="h-4 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded animate-pulse bg-[length:200%_100%]" />
              <div className="h-4 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded animate-pulse bg-[length:200%_100%]" />
              <div className="h-4 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-16 animate-pulse bg-[length:200%_100%]" />
              <div className="h-8 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-20 animate-pulse bg-[length:200%_100%]" />
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`flex items-center justify-center p-12 ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-3 border-secondary/20 border-t-secondary rounded-full"
      />
    </div>
  )
}

export default Loading