import React from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import RoomCard from "@/components/molecules/RoomCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import roomService from "@/services/api/roomService"

const RoomGallery = ({ limit, showHeader = true }) => {
  const navigate = useNavigate()
  const [rooms, setRooms] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  const loadRooms = async () => {
    setLoading(true)
    setError("")
    try {
      const data = await roomService.getAll()
      setRooms(limit ? data.slice(0, limit) : data)
    } catch (err) {
      setError("Failed to load rooms. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    loadRooms()
  }, [limit])

  if (loading) {
    return <Loading type="cards" />
  }

  if (error) {
    return <Error message={error} onRetry={loadRooms} />
  }

  if (rooms.length === 0) {
    return (
      <Empty
        icon="Building2"
        title="No rooms available"
        description="There are no rooms available at the moment. Please check back later."
        action={
          <Button onClick={loadRooms} className="gap-2">
            <ApperIcon name="RefreshCw" className="w-4 h-4" />
            Refresh
          </Button>
        }
      />
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
              Luxurious Accommodations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our collection of premium rooms and suites, each designed to provide 
              the ultimate comfort and sophistication for your stay.
            </p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {rooms.map((room, index) => (
            <RoomCard 
              key={room.Id} 
              room={room} 
              delay={index * 0.1} 
            />
          ))}
        </div>

        {limit && rooms.length >= limit && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <Button 
              size="lg" 
              onClick={() => navigate("/rooms")}
              className="gap-2"
            >
              View All Rooms
              <ApperIcon name="ArrowRight" className="w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default RoomGallery