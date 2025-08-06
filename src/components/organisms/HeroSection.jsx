import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import DatePicker from "@/components/molecules/DatePicker";

const HeroSection = () => {
  const navigate = useNavigate()
  const [checkIn, setCheckIn] = React.useState("")
  const [checkOut, setCheckOut] = React.useState("")
  const [guests, setGuests] = React.useState("2")

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (checkIn) params.append("checkIn", checkIn)
    if (checkOut) params.append("checkOut", checkOut)
    if (guests) params.append("guests", guests)
    navigate(`/rooms?${params.toString()}`)
  }

  return (
    <div className="relative min-h-96 bg-gradient-to-br from-primary via-primary/90 to-secondary overflow-hidden">
{/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center text-white mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-6xl font-display font-bold mb-6"
          >
            Experience
            <span className="block bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Luxury Redefined
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/90 max-w-3xl mx-auto mb-8"
          >
            Discover premium accommodations with world-class amenities and exceptional service. 
            Your perfect getaway awaits at StayLux Portal.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button 
              size="lg" 
              onClick={() => navigate("/rooms")}
              className="gap-2 bg-white text-primary hover:bg-gray-100"
            >
              <ApperIcon name="Building2" className="w-5 h-5" />
              Explore Rooms
            </Button>
          </motion.div>
        </div>

        {/* Search Widget */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 lg:p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Stay</h2>
              <p className="text-gray-600">Check availability and book your luxury experience</p>
            </div>
            
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <DatePicker
                label="Check-in"
                value={checkIn}
                onChange={setCheckIn}
                min={new Date().toISOString().split('T')[0]}
              />
              
              <DatePicker
                label="Check-out"
                value={checkOut}
                onChange={setCheckOut}
                min={checkIn || new Date().toISOString().split('T')[0]}
              />
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">Guests</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="flex h-11 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5+ Guests</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <Button type="submit" size="lg" className="w-full gap-2">
                  <ApperIcon name="Search" className="w-5 h-5" />
                  Search Rooms
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HeroSection