import React from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import SearchBar from "@/components/molecules/SearchBar"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import roomService from "@/services/api/roomService"

const AdminRooms = () => {
  const [rooms, setRooms] = React.useState([])
  const [filteredRooms, setFilteredRooms] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const [searchQuery, setSearchQuery] = React.useState("")

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

  React.useEffect(() => {
    if (!searchQuery) {
      setFilteredRooms(rooms)
      return
    }

    const filtered = rooms.filter(room =>
      room.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.status?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredRooms(filtered)
  }, [rooms, searchQuery])

  const handleStatusChange = async (roomId, newStatus) => {
    try {
      const room = rooms.find(r => r.Id === roomId)
      if (!room) return

      const updatedRoom = { ...room, status: newStatus }
      await roomService.update(roomId, updatedRoom)
      
      setRooms(prev => prev.map(r => r.Id === roomId ? updatedRoom : r))
      toast.success(`Room status updated to ${newStatus}`)
    } catch (err) {
      toast.error("Failed to update room status")
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "available": return "success"
      case "occupied": return "error"
      case "maintenance": return "warning"
      default: return "default"
    }
  }

  const getStatusOptions = (currentStatus) => {
    const allStatuses = ["available", "occupied", "maintenance"]
    return allStatuses.filter(status => status !== currentStatus)
  }

  if (loading) {
    return <Loading type="table" />
  }

  if (error) {
    return <Error message={error} onRetry={loadRooms} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Room Management
          </h1>
          <p className="text-gray-600">
            Manage room inventory, pricing, and availability status
          </p>
        </div>
        <Button className="gap-2">
          <ApperIcon name="Plus" className="w-4 h-4" />
          Add New Room
        </Button>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search rooms by name, type, or status..."
          className="max-w-md"
        />
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{rooms.length}</p>
            <p className="text-sm text-gray-600">Total Rooms</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-success">
              {rooms.filter(r => r.status === "available").length}
            </p>
            <p className="text-sm text-gray-600">Available</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-error">
              {rooms.filter(r => r.status === "occupied").length}
            </p>
            <p className="text-sm text-gray-600">Occupied</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-warning">
              {rooms.filter(r => r.status === "maintenance").length}
            </p>
            <p className="text-sm text-gray-600">Maintenance</p>
          </div>
        </motion.div>
      </div>

      {/* Rooms Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        {filteredRooms.length === 0 ? (
          <Empty
            icon="Building2"
            title="No rooms found"
            description={searchQuery ? "Try adjusting your search terms." : "No rooms have been added yet."}
            action={
              searchQuery ? (
                <Button onClick={() => setSearchQuery("")} className="gap-2">
                  <ApperIcon name="X" className="w-4 h-4" />
                  Clear Search
                </Button>
              ) : (
                <Button className="gap-2">
                  <ApperIcon name="Plus" className="w-4 h-4" />
                  Add First Room
                </Button>
              )
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Room</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Type</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Capacity</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Price</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRooms.map((room, index) => (
                  <motion.tr
                    key={room.Id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={room.images?.[0] || "/api/placeholder/60/60"}
                          alt={room.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{room.name}</p>
                          <p className="text-sm text-gray-600">Room #{room.Id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{room.type}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1">
                        <ApperIcon name="Users" className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{room.capacity}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-gray-900">
                        ${room.price || 0}/night
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={getStatusVariant(room.status)}>
                        {room.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="relative group">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1"
                          >
                            <ApperIcon name="Settings" className="w-4 h-4" />
                            Status
                          </Button>
                          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                            {getStatusOptions(room.status).map((status) => (
                              <button
                                key={status}
                                onClick={() => handleStatusChange(room.Id, status)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 capitalize"
                              >
                                Set {status}
                              </button>
                            ))}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ApperIcon name="Edit" className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default AdminRooms