import React from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import { Card, CardContent } from "@/components/atoms/Card"

const BookingCard = ({ booking, onStatusChange, delay = 0 }) => {
  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed": return "success"
      case "pending": return "warning"
      case "cancelled": return "error"
      case "checked-in": return "info"
      case "checked-out": return "default"
      default: return "default"
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    try {
      return format(new Date(dateString), "MMM dd, yyyy")
    } catch {
      return "Invalid Date"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {booking.guestName}
              </h3>
              <p className="text-sm text-gray-600">{booking.email}</p>
            </div>
            <Badge variant={getStatusVariant(booking.status)}>
              {booking.status}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div className="flex items-center gap-2">
              <ApperIcon name="Calendar" className="w-4 h-4 text-gray-400" />
              <span>Check-in: {formatDate(booking.checkIn)}</span>
            </div>
            <div className="flex items-center gap-2">
              <ApperIcon name="Calendar" className="w-4 h-4 text-gray-400" />
              <span>Check-out: {formatDate(booking.checkOut)}</span>
            </div>
            <div className="flex items-center gap-2">
              <ApperIcon name="Users" className="w-4 h-4 text-gray-400" />
              <span>{booking.guests} guests</span>
            </div>
            <div className="flex items-center gap-2">
              <ApperIcon name="DollarSign" className="w-4 h-4 text-gray-400" />
              <span>${booking.totalPrice}</span>
            </div>
          </div>
          
          {onStatusChange && (
            <div className="flex gap-2">
              {booking.status === "pending" && (
                <>
                  <Button 
                    size="sm" 
                    onClick={() => onStatusChange(booking.Id, "confirmed")}
                  >
                    Confirm
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onStatusChange(booking.Id, "cancelled")}
                  >
                    Cancel
                  </Button>
                </>
              )}
              {booking.status === "confirmed" && (
                <Button 
                  size="sm"
                  onClick={() => onStatusChange(booking.Id, "checked-in")}
                >
                  Check In
                </Button>
              )}
              {booking.status === "checked-in" && (
                <Button 
                  size="sm"
                  onClick={() => onStatusChange(booking.Id, "checked-out")}
                >
                  Check Out
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default BookingCard