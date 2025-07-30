"use client"

import type React from "react"
import { useState } from "react"
import { AdminHeader } from "./admin-header"
import { AdminSidebar } from "./admin-sidebar"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 lg:ml-16 xl:ml-64">
          <div className="p-4 sm:p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
