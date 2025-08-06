import bookingsData from "@/services/mockData/bookings.json"

class BookingService {
  constructor() {
    this.bookings = [...bookingsData]
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 350))
    return [...this.bookings]
  }

  async getById(id) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200))
    const booking = this.bookings.find(b => b.Id === id)
    if (!booking) {
      throw new Error("Booking not found")
    }
    return { ...booking }
  }

  async create(bookingData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    const newId = Math.max(...this.bookings.map(b => b.Id), 0) + 1
    const newBooking = {
      Id: newId,
      ...bookingData,
      status: bookingData.status || "pending",
      createdAt: new Date().toISOString()
    }
    this.bookings.push(newBooking)
    return { ...newBooking }
  }

  async update(id, bookingData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = this.bookings.findIndex(b => b.Id === id)
    if (index === -1) {
      throw new Error("Booking not found")
    }
    this.bookings[index] = { ...this.bookings[index], ...bookingData, Id: id }
    return { ...this.bookings[index] }
  }

  async delete(id) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 250))
    const index = this.bookings.findIndex(b => b.Id === id)
    if (index === -1) {
      throw new Error("Booking not found")
    }
    this.bookings.splice(index, 1)
    return true
  }
}

export default new BookingService()