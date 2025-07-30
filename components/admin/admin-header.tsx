"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, ChevronDown, LogOut, Shield } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface AdminHeaderProps {
  onMenuToggle: () => void
}

export function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
  const handleLogout = () => {
    if (confirm("Tem certeza que deseja sair?")) {
      // Limpar cookies e localStorage
      document.cookie = "authenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
      document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
      document.cookie = "userType=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
      localStorage.removeItem("authenticated")
      localStorage.removeItem("user")
      localStorage.removeItem("userType")

      // Redirecionar para login
      window.location.href = "/login"
    }
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onMenuToggle} className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-3">
            <Image
              src="/images/logo-unilavras-oficial.png"
              alt="UNILAVRAS Logo"
              width={32}
              height={32}
              className="object-contain"
            />
            <div>
              <span className="font-bold text-lg sm:text-xl text-gray-800">UNILAVRAS</span>
              <div className="flex items-center space-x-1">
                <Shield className="h-3 w-3 text-red-600" />
                <span className="text-xs text-red-600 font-medium">ADMIN</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-600">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <span className="hidden sm:inline">ADMINISTRADOR</span>
                <span className="sm:hidden">ADMIN</span>
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">A</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem disabled>
                <span className="font-medium">admin</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
