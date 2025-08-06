import React from "react"
import { Outlet } from "react-router-dom"
import { motion } from "framer-motion"
import AdminSidebar from "@/components/organisms/AdminSidebar"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between"
        >
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setSidebarOpen(true)}
          >
            <ApperIcon name="Menu" className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold text-gray-900">Admin Portal</h1>
          <div className="w-8" /> {/* Spacer */}
        </motion.div>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout