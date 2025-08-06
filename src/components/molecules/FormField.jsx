import React from "react"
import { motion } from "framer-motion"
import Input from "@/components/atoms/Input"
import Select from "@/components/atoms/Select"
import Label from "@/components/atoms/Label"

const FormField = ({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  options = [],
  error,
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
      
      {type === "select" ? (
        <Select value={value} onChange={(e) => onChange?.(e.target.value)} {...props}>
          <option value="">Choose...</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      ) : type === "textarea" ? (
        <textarea
          className="flex w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 min-h-24 resize-y"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          {...props}
        />
      ) : (
        <Input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          {...props}
        />
      )}
      
      {error && (
        <motion.p 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="text-sm text-error"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  )
}

export default FormField