import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import PublicLayout from "@/components/organisms/PublicLayout"
import AdminLayout from "@/components/organisms/AdminLayout"
import Homepage from "@/components/pages/Homepage"
import Rooms from "@/components/pages/Rooms"
import RoomDetail from "@/components/pages/RoomDetail"
import Booking from "@/components/pages/Booking"
import Contact from "@/components/pages/Contact"
import About from "@/components/pages/About"
import Login from "@/components/pages/Login"
import Signup from "@/components/pages/Signup"
import Profile from "@/components/pages/Profile"
import UserBookings from "@/components/pages/UserBookings"
import AdminDashboard from "@/components/pages/AdminDashboard"
import AdminRooms from "@/components/pages/AdminRooms"
import AdminBookings from "@/components/pages/AdminBookings"
import AdminReports from "@/components/pages/AdminReports"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
<Route path="/" element={<PublicLayout />}>
            <Route index element={<Homepage />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="rooms/:id" element={<RoomDetail />} />
            <Route path="booking" element={<Booking />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="profile" element={<Profile />} />
            <Route path="my-bookings" element={<UserBookings />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="rooms" element={<AdminRooms />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="reports" element={<AdminReports />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </>
  )
}

export default App