import React from "react"
import { motion } from "framer-motion"
import StatCard from "@/components/molecules/StatCard"
import BookingCard from "@/components/molecules/BookingCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import bookingService from "@/services/api/bookingService"
import roomService from "@/services/api/roomService"

const AdminDashboard = () => {
  const [bookings, setBookings] = React.useState([])
  const [rooms, setRooms] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  const loadDashboardData = async () => {
    setLoading(true)
    setError("")
    try {
      const [bookingsData, roomsData] = await Promise.all([
        bookingService.getAll(),
        roomService.getAll()
      ])
      setBookings(bookingsData)
      setRooms(roomsData)
    } catch (err) {
      setError("Failed to load dashboard data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    loadDashboardData()
  }, [])

  const getStats = () => {
    const totalRooms = rooms.length
    const occupiedRooms = rooms.filter(room => room.status === "occupied").length
    const availableRooms = rooms.filter(room => room.status === "available").length
    const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0
    
    const totalBookings = bookings.length
    const pendingBookings = bookings.filter(booking => booking.status === "pending").length
    const confirmedBookings = bookings.filter(booking => booking.status === "confirmed").length
    
    const totalRevenue = bookings
      .filter(booking => ["confirmed", "checked-in", "checked-out"].includes(booking.status))
      .reduce((sum, booking) => sum + (booking.totalPrice || 0), 0)

    return {
      totalRooms,
      occupiedRooms,
      availableRooms,
      occupancyRate,
      totalBookings,
      pendingBookings,
      confirmedBookings,
      totalRevenue
    }
  }

  const getTodayBookings = () => {
    const today = new Date().toISOString().split('T')[0]
    return bookings.filter(booking => {
      const checkIn = booking.checkIn?.split('T')[0]
      const checkOut = booking.checkOut?.split('T')[0]
      return checkIn === today || checkOut === today
    })
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <Loading />
      </div>
    )
  }

  if (error) {
    return <Error message={error} onRetry={loadDashboardData} />
  }

  const stats = getStats()
  const todayBookings = getTodayBookings()

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening at StayLux Portal today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Rooms"
          value={stats.totalRooms}
          icon="Building2"
          delay={0}
        />
        <StatCard
          title="Occupancy Rate"
          value={`${stats.occupancyRate}%`}
          icon="TrendingUp"
          trend={stats.occupancyRate >= 75 ? "up" : stats.occupancyRate >= 50 ? "neutral" : "down"}
          trendValue={`${stats.occupiedRooms}/${stats.totalRooms}`}
          delay={0.1}
        />
        <StatCard
          title="Active Bookings"
          value={stats.confirmedBookings}
          icon="Calendar"
          delay={0.2}
        />
        <StatCard
          title="Revenue (MTD)"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon="DollarSign"
          trend="up"
          trendValue="+12%"
          delay={0.3}
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Room Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Available</span>
              <span className="font-medium text-success">{stats.availableRooms}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Occupied</span>
              <span className="font-medium text-error">{stats.occupiedRooms}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Maintenance</span>
              <span className="font-medium text-warning">
                {rooms.filter(room => room.status === "maintenance").length}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending</span>
              <span className="font-medium text-warning">{stats.pendingBookings}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Confirmed</span>
              <span className="font-medium text-success">{stats.confirmedBookings}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Checked In</span>
              <span className="font-medium text-info">
                {bookings.filter(b => b.status === "checked-in").length}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Activity</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Check-ins</span>
              <span className="font-medium text-success">
                {bookings.filter(b => b.checkIn?.split('T')[0] === new Date().toISOString().split('T')[0]).length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Check-outs</span>
              <span className="font-medium text-info">
                {bookings.filter(b => b.checkOut?.split('T')[0] === new Date().toISOString().split('T')[0]).length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">New Bookings</span>
              <span className="font-medium text-primary">
                {bookings.filter(b => b.createdAt?.split('T')[0] === new Date().toISOString().split('T')[0]).length}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Today's Bookings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">Today's Activity</h2>
          <p className="text-gray-600">Check-ins, check-outs, and new bookings for today</p>
        </div>

        {todayBookings.length === 0 ? (
          <Empty
            icon="Calendar"
            title="No activity today"
            description="There are no check-ins, check-outs, or new bookings scheduled for today."
          />
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {todayBookings.slice(0, 6).map((booking, index) => (
                <BookingCard
                  key={booking.Id}
                  booking={booking}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default AdminDashboard