import React from "react"
import { motion } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const PublicHeader = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const location = useLocation()

  const navigation = [
    { name: "Home", path: "/" },
    { name: "Rooms", path: "/rooms" },
    { name: "Contact", path: "/contact" }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center">
                <ApperIcon name="Building2" className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  StayLux
                </span>
                <div className="text-xs text-gray-500">Portal</div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`font-medium transition-colors duration-200 hover:text-secondary ${
                    isActive(item.path) 
                      ? "text-secondary" 
                      : "text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* CTA Buttons */}
<div className="hidden md:flex items-center gap-4">
            <Link 
              to="/booking"
              className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-white hover:shadow-lg hover:scale-[1.02] focus:ring-secondary px-4 py-2 text-sm"
            >
              Book Now
            </Link>
<Link 
              to="/admin" 
              className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-primary hover:bg-primary/5 hover:text-primary hover:scale-[1.02] focus:ring-primary/20 px-4 py-2 text-sm gap-2"
            >
              <ApperIcon name="Shield" className="w-4 h-4" />
              Admin
            </Link>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            <ApperIcon name={isOpen ? "X" : "Menu"} className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-white border-t border-gray-100"
        >
          <div className="py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 font-medium transition-colors duration-200 hover:text-secondary ${
                  isActive(item.path) 
                    ? "text-secondary bg-secondary/5" 
                    : "text-gray-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-4 pt-4 border-t border-gray-100 space-y-3">
<Link 
                to="/booking"
                className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-white hover:shadow-lg hover:scale-[1.02] focus:ring-secondary px-4 py-2 text-sm w-full justify-center"
              >
                Book Now
              </Link>
<Link 
                to="/admin"
                className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-primary hover:bg-primary/5 hover:text-primary hover:scale-[1.02] focus:ring-primary/20 px-4 py-2 text-sm w-full justify-center gap-2"
              >
                <ApperIcon name="Shield" className="w-4 h-4" />
                Admin Portal
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  )
}

export default PublicHeader