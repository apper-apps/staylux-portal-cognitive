import React from "react"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import FormField from "@/components/molecules/FormField"
import { Card } from "@/components/atoms/Card"

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false)
  const [formData, setFormData] = React.useState({
    email: "",
    password: ""
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("Email is required")
      return false
    }
    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email")
      return false
    }
    if (!formData.password.trim()) {
      toast.error("Password is required")
      return false
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters")
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
      
      // Store user session (in real app, use proper auth)
      localStorage.setItem("user", JSON.stringify({
        email: formData.email,
        name: formData.email.split("@")[0]
      }))
      
      toast.success("Welcome back! Login successful.")
      navigate("/")
    } catch (err) {
      toast.error("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="User" className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to your StayLux account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email"
              required
            />

            <FormField
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="Enter your password"
              required
            />

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <ApperIcon name="LogIn" className="w-4 h-4" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link 
                to="/signup" 
                className="text-secondary hover:text-secondary/80 font-medium"
              >
                Sign up here
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <Link 
              to="/" 
              className="text-gray-500 hover:text-gray-700 text-sm flex items-center justify-center gap-2"
            >
              <ApperIcon name="ArrowLeft" className="w-4 h-4" />
              Back to Homepage
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default Login