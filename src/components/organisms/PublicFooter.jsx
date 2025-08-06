import React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"

const PublicFooter = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-primary text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-secondary to-white/20 rounded-xl flex items-center justify-center">
                <ApperIcon name="Building2" className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-display font-bold">StayLux Portal</span>
                <div className="text-sm text-gray-300">Premium Hospitality</div>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Experience luxury hospitality with our premium hotel management platform. 
              Seamless bookings and exceptional service await.
            </p>
            <div className="flex gap-4">
              <motion.a 
                whileHover={{ scale: 1.1 }}
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <ApperIcon name="Facebook" className="w-5 h-5" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1 }}
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <ApperIcon name="Twitter" className="w-5 h-5" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1 }}
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <ApperIcon name="Instagram" className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              {["Home", "Rooms", "Contact", "Book Now"].map((item) => (
                <Link 
                  key={item}
                  to={item === "Book Now" ? "/booking" : `/${item.toLowerCase()}`}
                  className="block text-gray-300 hover:text-secondary transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <ApperIcon name="MapPin" className="w-5 h-5 text-secondary" />
                <span className="text-gray-300">123 Luxury Ave, Resort City</span>
              </div>
              <div className="flex items-center gap-3">
                <ApperIcon name="Phone" className="w-5 h-5 text-secondary" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <ApperIcon name="Mail" className="w-5 h-5 text-secondary" />
                <span className="text-gray-300">hello@staylux.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
          <p>&copy; 2024 StayLux Portal. All rights reserved. Premium hospitality management platform.</p>
        </div>
      </div>
    </motion.footer>
  )
}

export default PublicFooter