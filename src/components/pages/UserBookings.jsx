import React from "react"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import Card from "@/components/atoms/Card"
import Loading from "@/components/ui/Loading"
import Empty from "@/components/ui/Empty"
import bookingService from "@/services/api/bookingService"
import { format } from "date-fns"

const UserBookings = () => {
  const navigate = useNavigate()
  const [user, setUser] = React.useState(null)
  const [bookings, setBookings] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      navigate("/login")
      return
    }
    
    setUser(JSON.parse(userData))
    loadUserBookings()
  }, [navigate])

  const loadUserBookings = async () => {
    setLoading(true)
    try {
      const allBookings = await bookingService.getAll()
      const userData = JSON.parse(localStorage.getItem("user") || "{}")
      
      // Filter bookings for current user (in real app, API would do this)
      const userBookings = allBookings.filter(booking => 
        booking.email === userData.email
      )
      
      setBookings(userBookings)
    } catch (err) {
      toast.error("Failed to load your bookings")
    } finally {
      setLoading(false)
    }
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

  const canCancel = (booking) => {
    const checkInDate = new Date(booking.checkIn)
    const today = new Date()
    const daysDiff = (checkInDate - today) / (1000 * 60 * 60 * 24)
    
    return booking.status === "pending" || booking.status === "confirmed" && daysDiff > 1
  }

  const handleCancelBooking = async (bookingId) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return

    try {
      const booking = bookings.find(b => b.Id === bookingId)
      if (!booking) return

      const updatedBooking = { ...booking, status: "cancelled" }
      await bookingService.update(bookingId, updatedBooking)
      
      setBookings(prev => prev.map(b => b.Id === bookingId ? updatedBooking : b))
      toast.success("Booking cancelled successfully")
    } catch (err) {
      toast.error("Failed to cancel booking")
    }
  }

  if (!user) return null

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Loading />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              My Bookings
            </h1>
            <p className="text-gray-600">
              Track and manage your reservations
            </p>
          </div>

          {bookings.length === 0 ? (
            <Empty
              icon="Calendar"
              title="No bookings found"
              description="You haven't made any reservations yet. Start exploring our rooms!"
              action={
                <Button asChild className="gap-2">
                  <Link to="/rooms">
                    <ApperIcon name="Search" className="w-4 h-4" />
                    Browse Rooms
                  </Link>
                </Button>
              }
            />
          ) : (
            <div className="space-y-6">
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                              Booking #{booking.Id}
                            </h3>
                            <p className="text-gray-600">Room #{booking.roomId}</p>
                          </div>
                          <Badge variant={getStatusVariant(booking.status)}>
                            {booking.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-2 text-gray-600 mb-1">
                              <ApperIcon name="Calendar" className="w-4 h-4" />
                              <span className="text-sm font-medium">Check-in</span>
                            </div>
                            <p className="font-semibold">{formatDate(booking.checkIn)}</p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 text-gray-600 mb-1">
                              <ApperIcon name="Calendar" className="w-4 h-4" />
                              <span className="text-sm font-medium">Check-out</span>
                            </div>
                            <p className="font-semibold">{formatDate(booking.checkOut)}</p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 text-gray-600 mb-1">
                              <ApperIcon name="Users" className="w-4 h-4" />
                              <span className="text-sm font-medium">Guests</span>
                            </div>
                            <p className="font-semibold">{booking.guests}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div>
                            <span className="text-2xl font-bold text-gray-900">
                              ${booking.totalPrice || 0}
                            </span>
                            <span className="text-gray-500 ml-2">total</span>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/rooms/${booking.roomId}`}>
                                <ApperIcon name="Eye" className="w-4 h-4" />
                                View Room
                              </Link>
                            </Button>
                            
                            {canCancel(booking) && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleCancelBooking(booking.Id)}
                                className="text-red-600 border-red-200 hover:bg-red-50"
                              >
                                <ApperIcon name="X" className="w-4 h-4" />
                                Cancel
                              </Button>
                            )}
                          </div>
                        </div>

                        {booking.specialRequests && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Special Requests:</span> {booking.specialRequests}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="outline" asChild className="gap-2">
              <Link to="/rooms">
                <ApperIcon name="Plus" className="w-4 h-4" />
                Make New Booking
              </Link>
            </Button>
            <Button variant="ghost" asChild className="gap-2">
              <Link to="/profile">
                <ApperIcon name="User" className="w-4 h-4" />
                Manage Profile
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default UserBookings