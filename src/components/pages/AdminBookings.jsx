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
import bookingService from "@/services/api/bookingService"
import { format } from "date-fns"

const AdminBookings = () => {
  const [bookings, setBookings] = React.useState([])
  const [filteredBookings, setFilteredBookings] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("")

  const loadBookings = async () => {
    setLoading(true)
    setError("")
    try {
      const data = await bookingService.getAll()
      setBookings(data)
      setFilteredBookings(data)
    } catch (err) {
      setError("Failed to load bookings. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    loadBookings()
  }, [])

  React.useEffect(() => {
    let filtered = [...bookings]

    if (searchQuery) {
      filtered = filtered.filter(booking =>
        booking.guestName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.Id?.toString().includes(searchQuery)
      )
    }

    if (statusFilter) {
      filtered = filtered.filter(booking => booking.status === statusFilter)
    }

    setFilteredBookings(filtered)
  }, [bookings, searchQuery, statusFilter])

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const booking = bookings.find(b => b.Id === bookingId)
      if (!booking) return

      const updatedBooking = { ...booking, status: newStatus }
      await bookingService.update(bookingId, updatedBooking)
      
      setBookings(prev => prev.map(b => b.Id === bookingId ? updatedBooking : b))
      toast.success(`Booking status updated to ${newStatus}`)
    } catch (err) {
      toast.error("Failed to update booking status")
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

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

  const getStatusOptions = (currentStatus) => {
    const statusFlow = {
      "pending": ["confirmed", "cancelled"],
      "confirmed": ["checked-in", "cancelled"],
      "checked-in": ["checked-out"],
      "cancelled": ["confirmed"],
      "checked-out": []
    }
    return statusFlow[currentStatus] || []
  }

  if (loading) {
    return <Loading type="table" />
  }

  if (error) {
    return <Error message={error} onRetry={loadBookings} />
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
            Booking Management
          </h1>
          <p className="text-gray-600">
            View and manage all reservations and guest bookings
          </p>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search bookings by name, email, or ID..."
            className="flex-1"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 rounded-lg border border-gray-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="checked-in">Checked In</option>
            <option value="checked-out">Checked Out</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { label: "Total", value: bookings.length, color: "text-gray-900" },
          { label: "Pending", value: bookings.filter(b => b.status === "pending").length, color: "text-warning" },
          { label: "Confirmed", value: bookings.filter(b => b.status === "confirmed").length, color: "text-success" },
          { label: "Checked In", value: bookings.filter(b => b.status === "checked-in").length, color: "text-info" },
          { label: "Revenue", value: `$${bookings.filter(b => ["confirmed", "checked-in", "checked-out"].includes(b.status)).reduce((sum, b) => sum + (b.totalPrice || 0), 0).toLocaleString()}`, color: "text-secondary" }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
          >
            <div className="text-center">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bookings Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        {filteredBookings.length === 0 ? (
          <Empty
            icon="Calendar"
            title="No bookings found"
            description={searchQuery || statusFilter ? "Try adjusting your search or filter criteria." : "No bookings have been made yet."}
            action={
              (searchQuery || statusFilter) ? (
                <Button onClick={() => {
                  setSearchQuery("")
                  setStatusFilter("")
                }} className="gap-2">
                  <ApperIcon name="X" className="w-4 h-4" />
                  Clear Filters
                </Button>
              ) : null
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Guest</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Dates</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Room</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Guests</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Total</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBookings.map((booking, index) => (
                  <motion.tr
                    key={booking.Id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900">{booking.guestName}</p>
                        <p className="text-sm text-gray-600">{booking.email}</p>
                        <p className="text-xs text-gray-500">ID: {booking.Id}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        <p className="text-gray-900">{formatDate(booking.checkIn)}</p>
                        <p className="text-gray-600">{formatDate(booking.checkOut)}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-900">Room #{booking.roomId}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1">
                        <ApperIcon name="Users" className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{booking.guests}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-gray-900">
                        ${booking.totalPrice || 0}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={getStatusVariant(booking.status)}>
                        {booking.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {getStatusOptions(booking.status).length > 0 && (
                          <div className="relative group">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="gap-1"
                            >
                              <ApperIcon name="Settings" className="w-4 h-4" />
                              Update
                            </Button>
                            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 min-w-32">
                              {getStatusOptions(booking.status).map((status) => (
                                <button
                                  key={status}
                                  onClick={() => handleStatusChange(booking.Id, status)}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 capitalize"
                                >
                                  {status.replace("-", " ")}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        <Button variant="ghost" size="sm">
                          <ApperIcon name="Eye" className="w-4 h-4" />
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

export default AdminBookings