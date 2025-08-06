import React from "react"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import { Card, CardContent } from "@/components/atoms/Card"

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue,
  className = "",
  delay = 0 
}) => {
  const trendColor = trend === "up" ? "text-success" : trend === "down" ? "text-error" : "text-gray-500"
  const trendIcon = trend === "up" ? "TrendingUp" : trend === "down" ? "TrendingDown" : "Minus"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <Card className={`hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 ${className}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {value}
                </span>
                {trend && (
                  <div className={`flex items-center gap-1 text-xs ${trendColor}`}>
                    <ApperIcon name={trendIcon} className="w-3 h-3" />
                    <span>{trendValue}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-xl flex items-center justify-center">
              <ApperIcon name={icon} className="w-6 h-6 text-secondary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default StatCard