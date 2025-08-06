import React from "react"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const About = () => {
  const stats = [
    { number: "50+", label: "Luxury Rooms", icon: "Building2" },
    { number: "15+", label: "Years Experience", icon: "Award" },
    { number: "10K+", label: "Happy Guests", icon: "Users" },
    { number: "24/7", label: "Concierge Service", icon: "Clock" }
  ]

  const features = [
    {
      icon: "Crown",
      title: "Luxury Accommodations",
      description: "Each room and suite is meticulously designed with premium furnishings, state-of-the-art amenities, and breathtaking views."
    },
    {
      icon: "Utensils",
      title: "World-Class Dining",
      description: "Experience culinary excellence with our award-winning restaurants featuring international and local cuisines."
    },
    {
      icon: "Waves",
      title: "Spa & Wellness",
      description: "Rejuvenate your body and mind at our full-service spa offering premium treatments and wellness programs."
    },
    {
      icon: "Car",
      title: "Premium Services",
      description: "From airport transfers to personal concierge services, we ensure every aspect of your stay is seamless."
    },
    {
      icon: "Wifi",
      title: "Modern Amenities",
      description: "Stay connected with high-speed WiFi, business facilities, fitness center, and entertainment options."
    },
    {
      icon: "Shield",
      title: "Safety & Security",
      description: "Your safety is our priority with 24/7 security, health protocols, and comprehensive insurance coverage."
    }
  ]

  const team = [
    {
      name: "Sarah Chen",
      position: "General Manager",
      image: "/api/placeholder/300/400",
      description: "With over 15 years in luxury hospitality, Sarah ensures every guest receives exceptional service."
    },
    {
      name: "Marcus Rodriguez",
      position: "Executive Chef",
      image: "/api/placeholder/300/400", 
      description: "Marcus brings Michelin-starred experience to create unforgettable culinary experiences."
    },
    {
      name: "Elena Volkov",
      position: "Spa Director",
      image: "/api/placeholder/300/400",
      description: "Elena's expertise in wellness and beauty treatments creates transformative spa experiences."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary to-primary/90 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6">
              About StayLux Portal
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Where luxury meets exceptional service. Discover the story behind our 
              commitment to creating unforgettable experiences for every guest.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={stat.icon} className="w-8 h-8 text-secondary" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2008 with a vision to redefine luxury hospitality, StayLux Portal 
                  has grown from a boutique property to a premier destination for discerning travelers 
                  from around the world.
                </p>
                <p>
                  Our journey began with a simple belief: that every guest deserves an experience 
                  that exceeds their expectations. This philosophy continues to guide everything we do, 
                  from our meticulously designed accommodations to our personalized service approach.
                </p>
                <p>
                  Today, we stand proud as a beacon of excellence in the hospitality industry, 
                  having welcomed over 10,000 guests who have become part of our extended family. 
                  Each stay contributes to our ongoing story of luxury, comfort, and memorable experiences.
                </p>
              </div>
              <div className="mt-8">
                <Button className="gap-2">
                  <ApperIcon name="Calendar" className="w-5 h-5" />
                  Experience Our Story
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img 
                src="/api/placeholder/600/500" 
                alt="Hotel Exterior"
                className="rounded-2xl shadow-xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
              What Makes Us Special
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the exceptional features and services that set StayLux Portal 
              apart as your premier destination for luxury hospitality.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <ApperIcon name={feature.icon} className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The dedicated professionals behind your exceptional StayLux Portal experience, 
              committed to delivering unparalleled service and hospitality.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-secondary font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              To create extraordinary experiences that exceed expectations, foster lasting memories, 
              and establish StayLux Portal as the premier destination for luxury hospitality. 
              We are committed to sustainable practices, community engagement, and continuous 
              innovation in service excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                className="bg-white text-primary hover:bg-gray-100 gap-2"
                onClick={() => window.location.href = "/rooms"}
              >
                <ApperIcon name="Eye" className="w-5 h-5" />
                Explore Our Rooms
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary gap-2"
                onClick={() => window.location.href = "/contact"}
              >
                <ApperIcon name="MessageCircle" className="w-5 h-5" />
                Get In Touch
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About