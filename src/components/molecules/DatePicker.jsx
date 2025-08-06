import React from "react"
import { motion } from "framer-motion"
import Input from "@/components/atoms/Input"
import Label from "@/components/atoms/Label"

const DatePicker = ({ 
  label, 
  value, 
  onChange, 
  min,
  max,
  className = "",
  ...props 
}) => {
  return (
    <motion.div 
      className={`space-y-2 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {label && <Label>{label}</Label>}
      <Input
        type="date"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        min={min}
        max={max}
        {...props}
      />
    </motion.div>
  )
}

export default DatePicker