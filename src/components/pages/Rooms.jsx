import React from "react"
import { motion } from "framer-motion"
import { useSearchParams } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Select from "@/components/atoms/Select"
import RoomCard from "@/components/molecules/RoomCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import roomService from "@/services/api/roomService"

const Rooms = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [rooms, setRooms] = React.useState([])
  const [filteredRooms, setFilteredRooms] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  
  // Filter states
  const [search, setSearch] = React.useState("")
  const [typeFilter, setTypeFilter] = React.useState("")
  const [priceRange, setPriceRange] = React.useState("")
  const [capacityFilter, setCapacityFilter] = React.useState("")

  const loadRooms = async () => {
    setLoading(true)
    setError("")
    try {
      const data = await roomService.getAll()
      setRooms(data)
      setFilteredRooms(data)
    } catch (err) {
      setError("Failed to load rooms. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    loadRooms()
  }, [])

  // Apply filters
  React.useEffect(() => {
    let filtered = [...rooms]

    if (search) {
      filtered = filtered.filter(room => 
        room.name?.toLowerCase().includes(search.toLowerCase()) ||
        room.type?.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (typeFilter) {
      filtered = filtered.filter(room => room.type === typeFilter)
    }

    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number)
      filtered = filtered.filter(room => {
        const price = Number(room.price)
        return max ? (price >= min && price <= max) : price >= min
      })
    }

    if (capacityFilter) {
      filtered = filtered.filter(room => Number(room.capacity) >= Number(capacityFilter))
    }

    setFilteredRooms(filtered)
  }, [rooms, search, typeFilter, priceRange, capacityFilter])

  const clearFilters = () => {
    setSearch("")
    setTypeFilter("")
    setPriceRange("")
    setCapacityFilter("")
    setSearchParams({})
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Loading type="cards" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Error message={error} onRetry={loadRooms} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
            Our Luxury Accommodations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our collection of premium rooms and suites, each designed to provide 
            exceptional comfort and unforgettable experiences.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Search</label>
              <div className="relative">
                <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search rooms..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Room Type</label>
              <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                <option value="">All Types</option>
                <option value="Standard">Standard</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Suite">Suite</option>
                <option value="Presidential">Presidential</option>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Price Range</label>
              <Select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                <option value="">All Prices</option>
                <option value="0-200">$0 - $200</option>
                <option value="200-400">$200 - $400</option>
                <option value="400-600">$400 - $600</option>
                <option value="600">$600+</option>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Capacity</label>
              <Select value={capacityFilter} onChange={(e) => setCapacityFilter(e.target.value)}>
                <option value="">All Capacities</option>
                <option value="1">1+ Guest</option>
                <option value="2">2+ Guests</option>
                <option value="4">4+ Guests</option>
                <option value="6">6+ Guests</option>
              </Select>
            </div>

            <div className="flex items-end">
              <Button variant="outline" onClick={clearFilters} className="w-full gap-2">
                <ApperIcon name="X" className="w-4 h-4" />
                Clear
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{filteredRooms.length} rooms found</span>
            {(search || typeFilter || priceRange || capacityFilter) && (
              <span className="text-secondary">Filters applied</span>
            )}
          </div>
        </motion.div>

        {/* Rooms Grid */}
        {filteredRooms.length === 0 ? (
          <Empty
            icon="Building2"
            title="No rooms found"
            description="Try adjusting your search criteria or clear the filters to see all available rooms."
            action={
              <Button onClick={clearFilters} className="gap-2">
                <ApperIcon name="RefreshCw" className="w-4 h-4" />
                Clear Filters
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room, index) => (
              <RoomCard 
                key={room.Id} 
                room={room} 
                delay={index * 0.1} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Rooms