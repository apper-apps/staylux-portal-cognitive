import React from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
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

const navigate = useNavigate()

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

      {/* About Preview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-6">
                Discover Our Story
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Since 2008, StayLux Portal has been redefining luxury hospitality with 
                exceptional service, premium accommodations, and unforgettable experiences 
                for over 10,000 guests from around the world.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary mb-1">50+</div>
                  <div className="text-gray-600 text-sm">Luxury Rooms</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary mb-1">15+</div>
                  <div className="text-gray-600 text-sm">Years Experience</div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:scale-[1.02] focus:ring-primary px-6 py-3 text-base gap-2"
                onClick={() => navigate("/about")}
              >
                <ApperIcon name="ArrowRight" className="w-5 h-5" />
                Learn More About Us
              </motion.button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img 
                src="/api/placeholder/600/400" 
                alt="Luxury Hotel Experience"
                className="rounded-2xl shadow-xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </motion.div>
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
                onClick={() => navigate("/booking")}
              >
                <ApperIcon name="Calendar" className="w-5 h-5" />
                Book Your Stay
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2"
                onClick={() => navigate("/contact")}
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