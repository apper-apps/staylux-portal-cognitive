import React from "react"
import { motion } from "framer-motion"
import HeroSection from "@/components/organisms/HeroSection"
import RoomGallery from "@/components/organisms/RoomGallery"
import ApperIcon from "@/components/ApperIcon"

const Homepage = () => {
  const amenities = [
    {
      icon: "Wifi",
      title: "High-Speed WiFi",
      description: "Stay connected with complimentary fiber-optic internet throughout the property"
    },
    {
      icon: "Car",
      title: "Valet Parking",
      description: "Premium valet service with secure underground parking for all guests"
    },
    {
      icon: "Utensils",
      title: "Fine Dining",
      description: "World-class restaurants featuring cuisine from renowned chefs"
    },
    {
      icon: "Waves",
      title: "Spa & Wellness",
      description: "Full-service spa with therapeutic treatments and wellness programs"
    },
    {
      icon: "Dumbbell",
      title: "Fitness Center",
      description: "State-of-the-art fitness facilities with personal training available"
    },
    {
      icon: "Coffee",
      title: "24/7 Concierge",
      description: "Round-the-clock concierge service to assist with all your needs"
    }
  ]

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Featured Rooms */}
      <RoomGallery limit={6} />

      {/* Amenities Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
              Premium Amenities & Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience unparalleled luxury with our comprehensive range of premium amenities 
              designed to exceed your expectations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity, index) => (
              <motion.div
                key={amenity.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <ApperIcon name={amenity.icon} className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{amenity.title}</h3>
                <p className="text-gray-600">{amenity.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
              Ready to Experience Luxury?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Book your stay today and discover why StayLux Portal is the preferred choice 
              for discerning travelers seeking exceptional hospitality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2"
                onClick={() => window.location.href = "/booking"}
              >
                <ApperIcon name="Calendar" className="w-5 h-5" />
                Book Your Stay
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2"
                onClick={() => window.location.href = "/contact"}
              >
                <ApperIcon name="Phone" className="w-5 h-5" />
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Homepage