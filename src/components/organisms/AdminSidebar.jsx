import React from "react"
import { motion } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation()

  const navigation = [
    { name: "Dashboard", path: "/admin", icon: "BarChart3" },
    { name: "Rooms", path: "/admin/rooms", icon: "Building2" },
    { name: "Bookings", path: "/admin/bookings", icon: "Calendar" },
    { name: "Reports", path: "/admin/reports", icon: "FileText" }
  ]

  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin"
    }
    return location.pathname.startsWith(path)
  }

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center">
              <ApperIcon name="Building2" className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                StayLux
              </span>
              <div className="text-xs text-gray-500">Admin Portal</div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 group ${
                    isActive(item.path)
                      ? "bg-gradient-to-r from-secondary/10 to-secondary/5 text-secondary border border-secondary/20"
                      : "text-gray-700 hover:bg-gray-50 hover:text-secondary"
                  }`}
                >
                  <ApperIcon 
                    name={item.icon} 
                    className={`w-5 h-5 transition-colors duration-200 ${
                      isActive(item.path) ? "text-secondary" : "text-gray-500 group-hover:text-secondary"
                    }`} 
                  />
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </nav>

        {/* Back to Public Site */}
        <div className="p-4 border-t border-gray-200">
          <Button variant="ghost" asChild className="w-full justify-start gap-3">
            <Link to="/">
              <ApperIcon name="ArrowLeft" className="w-5 h-5" />
              Back to Website
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )

  // Mobile Sidebar
  const MobileSidebar = () => (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="lg:hidden fixed left-0 top-0 z-50 w-64 bg-white border-r border-gray-200 h-full shadow-xl"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-secondary to-primary rounded-lg flex items-center justify-center">
                <ApperIcon name="Building2" className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  StayLux
                </span>
                <div className="text-xs text-gray-500">Admin</div>
              </div>
            </Link>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ApperIcon name="X" className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-gradient-to-r from-secondary/10 to-secondary/5 text-secondary border border-secondary/20"
                      : "text-gray-700 hover:bg-gray-50 hover:text-secondary"
                  }`}
                >
                  <ApperIcon name={item.icon} className="w-5 h-5" />
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Back to Public Site */}
          <div className="p-4 border-t border-gray-200">
            <Button variant="ghost" asChild className="w-full justify-start gap-3">
              <Link to="/">
                <ApperIcon name="ArrowLeft" className="w-5 h-5" />
                Back to Website
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  )

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  )
}

export default AdminSidebar