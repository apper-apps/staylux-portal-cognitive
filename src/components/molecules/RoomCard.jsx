import React from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import { Card, CardContent } from "@/components/atoms/Card"

const RoomCard = ({ room, delay = 0 }) => {
  const navigate = useNavigate()

  const handleViewDetails = () => {
    navigate(`/rooms/${room.Id}`)
  }

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "available": return "success"
      case "occupied": return "error"
      case "maintenance": return "warning"
      default: return "default"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
        <div className="relative overflow-hidden">
          <motion.img 
            src={room.images?.[0] || "/api/placeholder/400/250"}
            alt={room.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            whileHover={{ scale: 1.05 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-4 right-4">
            <Badge variant={getStatusVariant(room.status)}>
              {room.status}
            </Badge>
          </div>
          {room.price && (
            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-lg font-bold">
                ${room.price}/night
              </span>
            </div>
          )}
        </div>
        
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{room.name}</h3>
              <p className="text-sm text-gray-600">{room.type}</p>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <ApperIcon name="Users" className="w-4 h-4" />
                <span>{room.capacity} guests</span>
              </div>
              {room.amenities && (
                <div className="flex items-center gap-1">
                  <ApperIcon name="Wifi" className="w-4 h-4" />
                  <span>{room.amenities.length} amenities</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              {room.price && (
                <span className="text-2xl font-bold bg-gradient-to-r from-secondary to-secondary/80 bg-clip-text text-transparent">
                  ${room.price}
                  <span className="text-sm text-gray-600 font-normal">/night</span>
                </span>
              )}
              <Button onClick={handleViewDetails} size="sm">
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default RoomCard