import React from "react"
import { motion } from "framer-motion"
import { useSearchParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import FormField from "@/components/molecules/FormField"
import DatePicker from "@/components/molecules/DatePicker"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import roomService from "@/services/api/roomService"
import bookingService from "@/services/api/bookingService"

const Booking = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const roomId = searchParams.get("roomId")
  
  const [room, setRoom] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)

  // Form data
  const [formData, setFormData] = React.useState({
    guestName: "",
    email: "",
    phone: "",
    checkIn: searchParams.get("checkIn") || "",
    checkOut: searchParams.get("checkOut") || "",
    guests: searchParams.get("guests") || "2",
    specialRequests: ""
  })

  const [errors, setErrors] = React.useState({})

  const loadRoom = async () => {
    if (!roomId) return
    
    setLoading(true)
    setError("")
    try {
      const data = await roomService.getById(parseInt(roomId))
      setRoom(data)
    } catch (err) {
      setError("Room not found. Please select a room from our available options.")
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    loadRoom()
  }, [roomId])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const calculateNights = () => {
    if (!formData.checkIn || !formData.checkOut) return 0
    const checkIn = new Date(formData.checkIn)
    const checkOut = new Date(formData.checkOut)
    const diffTime = checkOut - checkIn
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const calculateTotal = () => {
    if (!room?.price) return 0
    const nights = calculateNights()
    return nights * room.price
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.guestName.trim()) newErrors.guestName = "Guest name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.checkIn) newErrors.checkIn = "Check-in date is required"
    if (!formData.checkOut) newErrors.checkOut = "Check-out date is required"
    
    if (formData.checkIn && formData.checkOut) {
      const checkIn = new Date(formData.checkIn)
      const checkOut = new Date(formData.checkOut)
      if (checkOut <= checkIn) {
        newErrors.checkOut = "Check-out must be after check-in date"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setSubmitting(true)
    try {
      const bookingData = {
        ...formData,
        roomId: parseInt(roomId),
        totalPrice: calculateTotal(),
        status: "pending"
      }

      await bookingService.create(bookingData)
      toast.success("Booking submitted successfully! We'll confirm your reservation shortly.")
      navigate("/")
    } catch (err) {
      toast.error("Failed to submit booking. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Loading />
        </div>
      </div>
    )
  }

  if (error && !room) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Error message={error} onRetry={() => navigate("/rooms")} />
        </div>
      </div>
    )
  }

  const nights = calculateNights()
  const total = calculateTotal()

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">
            Complete Your Booking
          </h1>
          <p className="text-xl text-gray-600">
            You're just a few steps away from your luxury experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Guest Information</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Full Name"
                    value={formData.guestName}
                    onChange={(value) => handleInputChange("guestName", value)}
                    error={errors.guestName}
                    placeholder="Enter your full name"
                    required
                  />
                  
                  <FormField
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(value) => handleInputChange("email", value)}
                    error={errors.email}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Phone Number"
                    type="tel"
                    value={formData.phone}
                    onChange={(value) => handleInputChange("phone", value)}
                    error={errors.phone}
                    placeholder="Enter your phone number"
                    required
                  />
                  
                  <FormField
                    label="Number of Guests"
                    type="select"
                    value={formData.guests}
                    onChange={(value) => handleInputChange("guests", value)}
                    options={[
                      { value: "1", label: "1 Guest" },
                      { value: "2", label: "2 Guests" },
                      { value: "3", label: "3 Guests" },
                      { value: "4", label: "4 Guests" },
                      { value: "5", label: "5+ Guests" }
                    ]}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DatePicker
                    label="Check-in Date"
                    value={formData.checkIn}
                    onChange={(value) => handleInputChange("checkIn", value)}
                    min={new Date().toISOString().split('T')[0]}
                    error={errors.checkIn}
                    required
                  />
                  
                  <DatePicker
                    label="Check-out Date"
                    value={formData.checkOut}
                    onChange={(value) => handleInputChange("checkOut", value)}
                    min={formData.checkIn || new Date().toISOString().split('T')[0]}
                    error={errors.checkOut}
                    required
                  />
                </div>

                <FormField
                  label="Special Requests (Optional)"
                  type="textarea"
                  value={formData.specialRequests}
                  onChange={(value) => handleInputChange("specialRequests", value)}
                  placeholder="Any special requests or requirements..."
                />

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full gap-2"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <ApperIcon name="Loader2" className="w-5 h-5 animate-spin" />
                      Processing Booking...
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Calendar" className="w-5 h-5" />
                      Confirm Booking
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Booking Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Booking Summary</h2>
              
              {room && (
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <img 
                      src={room.images?.[0] || "/api/placeholder/80/60"} 
                      alt={room.name}
                      className="w-20 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{room.name}</h3>
                      <p className="text-sm text-gray-600">{room.type}</p>
                      <p className="text-sm text-gray-600">{room.capacity} guests</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Check-in</span>
                      <span className="text-gray-900">
                        {formData.checkIn ? new Date(formData.checkIn).toLocaleDateString() : "Not selected"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Check-out</span>
                      <span className="text-gray-900">
                        {formData.checkOut ? new Date(formData.checkOut).toLocaleDateString() : "Not selected"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Guests</span>
                      <span className="text-gray-900">{formData.guests}</span>
                    </div>
                    {nights > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Nights</span>
                        <span className="text-gray-900">{nights}</span>
                      </div>
                    )}
                  </div>

                  {nights > 0 && room.price && (
                    <div className="border-t border-gray-200 pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Room rate per night</span>
                        <span className="text-gray-900">${room.price}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg">
                        <span className="text-gray-900">Total</span>
                        <span className="bg-gradient-to-r from-secondary to-secondary/80 bg-clip-text text-transparent">
                          ${total}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <ApperIcon name="Info" className="w-5 h-5 text-info mt-0.5" />
                  <div className="text-sm text-gray-600">
                    <p className="font-medium mb-1">Booking Policy</p>
                    <p>Free cancellation up to 24 hours before check-in. Payment will be processed upon confirmation.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Booking