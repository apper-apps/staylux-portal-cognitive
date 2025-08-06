import roomsData from "@/services/mockData/rooms.json"

class RoomService {
  constructor() {
    this.rooms = [...roomsData]
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...this.rooms]
  }

  async getById(id) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200))
    const room = this.rooms.find(r => r.Id === id)
    if (!room) {
      throw new Error("Room not found")
    }
    return { ...room }
  }

  async create(roomData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400))
    const newId = Math.max(...this.rooms.map(r => r.Id), 0) + 1
    const newRoom = {
      Id: newId,
      ...roomData,
      status: roomData.status || "available"
    }
    this.rooms.push(newRoom)
    return { ...newRoom }
  }

  async update(id, roomData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 350))
    const index = this.rooms.findIndex(r => r.Id === id)
    if (index === -1) {
      throw new Error("Room not found")
    }
    this.rooms[index] = { ...this.rooms[index], ...roomData, Id: id }
    return { ...this.rooms[index] }
  }

  async delete(id) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = this.rooms.findIndex(r => r.Id === id)
    if (index === -1) {
      throw new Error("Room not found")
    }
    this.rooms.splice(index, 1)
    return true
  }
}

export default new RoomService()