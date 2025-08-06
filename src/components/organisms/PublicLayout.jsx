import React from "react"
import { Outlet } from "react-router-dom"
import PublicHeader from "@/components/organisms/PublicHeader"
import PublicFooter from "@/components/organisms/PublicFooter"

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main>
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  )
}

export default PublicLayout