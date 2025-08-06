import React from "react"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import StatCard from "@/components/molecules/StatCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import bookingService from "@/services/api/bookingService"
import roomService from "@/services/api/roomService"

const AdminReports = () => {
  const [data, setData] = React.useState({ bookings: [], rooms: [] })
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const [dateRange, setDateRange] = React.useState("30") // days

  const loadData = async () => {
    setLoading(true)
    setError("")
    try {
      const [bookingsData, roomsData] = await Promise.all([
        bookingService.getAll(),
        roomService.getAll()
      ])
      setData({ bookings: bookingsData, rooms: roomsData })
    } catch (err) {
      setError("Failed to load report data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    loadData()
  }, [])

  const getMetrics = () => {
    const { bookings, rooms } = data
    
    // Filter bookings by date range
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - parseInt(dateRange))
    
    const recentBookings = bookings.filter(booking => {
      if (!booking.createdAt) return false
      const bookingDate = new Date(booking.createdAt)
      return bookingDate >= cutoffDate
    })

    // Revenue metrics
    const totalRevenue = bookings
      .filter(b => ["confirmed", "checked-in", "checked-out"].includes(b.status))
      .reduce((sum, b) => sum + (b.totalPrice || 0), 0)

    const recentRevenue = recentBookings
      .filter(b => ["confirmed", "checked-in", "checked-out"].includes(b.status))
      .reduce((sum, b) => sum + (b.totalPrice || 0), 0)

    // Occupancy metrics
    const totalRooms = rooms.length
    const occupiedRooms = rooms.filter(r => r.status === "occupied").length
    const occupancyRate = totalRooms > 0 ? (occupiedRooms / totalRooms) * 100 : 0

    // Booking metrics
    const totalBookings = bookings.length
    const pendingBookings = bookings.filter(b => b.status === "pending").length
    const confirmedBookings = bookings.filter(b => b.status === "confirmed").length
    const averageBookingValue = totalBookings > 0 ? totalRevenue / confirmedBookings : 0

    // Guest metrics
    const totalGuests = bookings.reduce((sum, b) => sum + (parseInt(b.guests) || 0), 0)
    const averageStayLength = bookings
      .filter(b => b.checkIn && b.checkOut)
      .map(b => {
        const checkIn = new Date(b.checkIn)
        const checkOut = new Date(b.checkOut)
        return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
      })
      .reduce((sum, days, _, arr) => sum + days / arr.length, 0)

    return {
      totalRevenue,
      recentRevenue,
      occupancyRate,
      totalBookings: confirmedBookings,
      pendingBookings,
      averageBookingValue,
      totalGuests,
      averageStayLength: Math.round(averageStayLength * 10) / 10 || 0
    }
  }

  const getRoomTypeBreakdown = () => {
    const { rooms } = data
    const breakdown = rooms.reduce((acc, room) => {
      const type = room.type || "Unknown"
      if (!acc[type]) {
        acc[type] = { total: 0, available: 0, occupied: 0 }
      }
      acc[type].total++
      if (room.status === "available") acc[type].available++
      if (room.status === "occupied") acc[type].occupied++
      return acc
    }, {})

    return Object.entries(breakdown).map(([type, stats]) => ({
      type,
      ...stats,
      occupancyRate: Math.round((stats.occupied / stats.total) * 100)
    }))
  }

  const getBookingTrends = () => {
    const { bookings } = data
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (29 - i))
      return {
        date: date.toISOString().split('T')[0],
        bookings: 0,
        revenue: 0
      }
    })

    bookings.forEach(booking => {
      if (!booking.createdAt) return
      const bookingDate = booking.createdAt.split('T')[0]
      const dayData = last30Days.find(day => day.date === bookingDate)
      if (dayData && ["confirmed", "checked-in", "checked-out"].includes(booking.status)) {
        dayData.bookings++
        dayData.revenue += booking.totalPrice || 0
      }
    })

    return last30Days
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />
  }

  const metrics = getMetrics()
  const roomBreakdown = getRoomTypeBreakdown()
  const bookingTrends = getBookingTrends()

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Reports & Analytics
          </h1>
          <p className="text-gray-600">
            Comprehensive insights into your hotel's performance and trends
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="h-11 rounded-lg border border-gray-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
          <Button className="gap-2">
            <ApperIcon name="Download" className="w-4 h-4" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${metrics.totalRevenue.toLocaleString()}`}
          icon="DollarSign"
          trend="up"
          trendValue="+12%"
          delay={0}
        />
        <StatCard
          title="Occupancy Rate"
          value={`${Math.round(metrics.occupancyRate)}%`}
          icon="Building2"
          trend={metrics.occupancyRate >= 75 ? "up" : "down"}
          trendValue={`${Math.round(metrics.occupancyRate)}%`}
          delay={0.1}
        />
        <StatCard
          title="Total Bookings"
          value={metrics.totalBookings}
          icon="Calendar"
          trend="up"
          trendValue="+8%"
          delay={0.2}
        />
        <StatCard
          title="Average Booking"
          value={`$${Math.round(metrics.averageBookingValue)}`}
          icon="TrendingUp"
          trend="up"
          trendValue="+5%"
          delay={0.3}
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
              <ApperIcon name="Users" className="w-5 h-5 text-info" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Guest Metrics</h3>
              <p className="text-sm text-gray-600">Visitor insights</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Guests</span>
              <span className="font-medium">{metrics.totalGuests}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg. Stay Length</span>
              <span className="font-medium">{metrics.averageStayLength} nights</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pending Bookings</span>
              <span className="font-medium text-warning">{metrics.pendingBookings}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <ApperIcon name="TrendingUp" className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Performance</h3>
              <p className="text-sm text-gray-600">Key indicators</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Revenue Growth</span>
              <span className="font-medium text-success">+12%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Booking Conversion</span>
              <span className="font-medium">87%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Customer Satisfaction</span>
              <span className="font-medium">4.8/5</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <ApperIcon name="Target" className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Targets</h3>
              <p className="text-sm text-gray-600">Monthly goals</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Revenue Target</span>
                <span className="font-medium">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-secondary h-2 rounded-full" style={{width: '78%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Occupancy Target</span>
                <span className="font-medium">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{width: '92%'}}></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Room Type Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Room Type Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roomBreakdown.map((roomType, index) => (
            <div key={roomType.type} className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">{roomType.type}</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Rooms</span>
                  <span className="font-medium">{roomType.total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Available</span>
                  <span className="font-medium text-success">{roomType.available}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Occupied</span>
                  <span className="font-medium text-error">{roomType.occupied}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Occupancy Rate</span>
                  <span className="font-medium">{roomType.occupancyRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-secondary h-2 rounded-full transition-all duration-300" 
                    style={{width: `${roomType.occupancyRate}%`}}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Booking Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Booking Trends (Last 30 Days)</h2>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <ApperIcon name="TrendingUp" className="w-12 h-12 text-secondary mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Booking trend chart would be displayed here</p>
            <p className="text-sm text-gray-500">
              Total bookings in period: {bookingTrends.reduce((sum, day) => sum + day.bookings, 0)}
            </p>
            <p className="text-sm text-gray-500">
              Total revenue: ${bookingTrends.reduce((sum, day) => sum + day.revenue, 0).toLocaleString()}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminReports