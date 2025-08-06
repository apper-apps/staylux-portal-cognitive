import React from "react"
import { motion } from "framer-motion"
import { useParams, useNavigate } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import roomService from "@/services/api/roomService"

const RoomDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [room, setRoom] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const [selectedImage, setSelectedImage] = React.useState(0)

  const loadRoom = async () => {
    setLoading(true)
    setError("")
    try {
      const data = await roomService.getById(parseInt(id))
      setRoom(data)
    } catch (err) {
      setError("Room not found. Please check the room ID.")
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    if (id) {
      loadRoom()
    }
  }, [id])

  const handleBookNow = () => {
    navigate(`/booking?roomId=${id}`)
  }

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "available": return "success"
      case "occupied": return "error"
      case "maintenance": return "warning"
      default: return "default"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Loading />
        </div>
      </div>
    )
  }

  if (error || !room) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Error message={error} onRetry={loadRoom} />
        </div>
      </div>
    )
  }

  const images = room.images || ["/api/placeholder/800/600"]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button variant="ghost" onClick={() => navigate("/rooms")} className="gap-2">
            <ApperIcon name="ArrowLeft" className="w-4 h-4" />
            Back to Rooms
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <img 
                src={images[selectedImage]} 
                alt={room.name}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge variant={getStatusVariant(room.status)}>
                  {room.status}
                </Badge>
              </div>
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.slice(0, 4).map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedImage(index)}
                    className={`relative overflow-hidden rounded-lg ${
                      selectedImage === index ? "ring-2 ring-secondary" : ""
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${room.name} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Room Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                {room.name}
              </h1>
              <p className="text-xl text-gray-600 mb-4">{room.type}</p>
              
              {room.price && (
                <div className="text-3xl font-bold bg-gradient-to-r from-secondary to-secondary/80 bg-clip-text text-transparent">
                  ${room.price}
                  <span className="text-lg text-gray-600 font-normal">/night</span>
                </div>
              )}
            </div>

            {/* Room Info */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <ApperIcon name="Users" className="w-5 h-5 text-secondary" />
                <span className="text-gray-700">{room.capacity} guests</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Bed" className="w-5 h-5 text-secondary" />
                <span className="text-gray-700">{room.type} Room</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Wifi" className="w-5 h-5 text-secondary" />
                <span className="text-gray-700">Free WiFi</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Coffee" className="w-5 h-5 text-secondary" />
                <span className="text-gray-700">24/7 Service</span>
              </div>
            </div>

            {/* Amenities */}
            {room.amenities && room.amenities.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Amenities</h3>
                <div className="grid grid-cols-2 gap-2">
                  {room.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-600">
                      <ApperIcon name="Check" className="w-4 h-4 text-success" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                Experience luxury and comfort in this beautifully appointed {room.type.toLowerCase()} room. 
                Featuring modern amenities, elegant furnishings, and stunning views, this accommodation 
                provides the perfect retreat for discerning travelers. Whether you're here for business 
                or leisure, you'll find everything you need for a memorable stay.
              </p>
            </div>

            {/* Booking Button */}
            <div className="pt-4 border-t border-gray-200">
              {room.status === "available" ? (
                <Button 
                  size="lg" 
                  onClick={handleBookNow}
                  className="w-full gap-2"
                >
                  <ApperIcon name="Calendar" className="w-5 h-5" />
                  Book This Room
                </Button>
              ) : (
                <Button 
                  disabled
                  size="lg"
                  className="w-full"
                >
                  Room Currently Unavailable
                </Button>
              )}
              
              <div className="mt-3 text-sm text-gray-500 text-center">
                <ApperIcon name="Shield" className="w-4 h-4 inline mr-1" />
                Free cancellation up to 24 hours before check-in
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default RoomDetail