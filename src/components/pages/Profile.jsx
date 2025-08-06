import React from "react"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import FormField from "@/components/molecules/FormField"
import { Card } from "@/components/atoms/Card"

const Profile = () => {
  const navigate = useNavigate()
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: ""
  })

  React.useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      navigate("/login")
      return
    }
    
    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    setFormData({
      name: parsedUser.name || "",
      email: parsedUser.email || "",
      phone: parsedUser.phone || ""
    })
  }, [navigate])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Name is required")
      return false
    }
    if (!formData.email.trim()) {
      toast.error("Email is required")
      return false
    }
    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email")
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update user data
      const updatedUser = { ...user, ...formData }
      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)
      
      toast.success("Profile updated successfully!")
    } catch (err) {
      toast.error("Failed to update profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    toast.success("Logged out successfully!")
    navigate("/")
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">
                {user.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              My Profile
            </h1>
            <p className="text-gray-600">
              Manage your account information and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Form */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Personal Information
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <FormField
                    label="Full Name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />

                  <FormField
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />

                  <FormField
                    label="Phone Number"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter your phone number"
                  />

                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="gap-2"
                  >
                    {loading ? (
                      <>
                        <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <ApperIcon name="Save" className="w-4 h-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button variant="outline" asChild className="w-full justify-start gap-3">
                    <Link to="/my-bookings">
                      <ApperIcon name="Calendar" className="w-4 h-4" />
                      My Bookings
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full justify-start gap-3">
                    <Link to="/rooms">
                      <ApperIcon name="Search" className="w-4 h-4" />
                      Browse Rooms
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full justify-start gap-3">
                    <Link to="/contact">
                      <ApperIcon name="MessageCircle" className="w-4 h-4" />
                      Support
                    </Link>
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Account Actions
                </h3>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    onClick={handleLogout}
                    className="w-full justify-start gap-3 text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <ApperIcon name="LogOut" className="w-4 h-4" />
                    Sign Out
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link 
              to="/" 
              className="text-gray-500 hover:text-gray-700 text-sm flex items-center justify-center gap-2"
            >
              <ApperIcon name="ArrowLeft" className="w-4 h-4" />
              Back to Homepage
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Profile