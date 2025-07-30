"use client"

import type React from "react"
import { useState } from "react"
import { Header } from "./header"
import { Sidebar } from "./sidebar"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 lg:ml-16 xl:ml-64">
          <div className="p-4 sm:p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
