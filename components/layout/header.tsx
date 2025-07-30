"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, ChevronDown, LogOut } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderProps {
  onMenuToggle: () => void
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    if (confirm("Tem certeza que deseja sair?")) {
      logout()
    }
  }

  if (!user) return null

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
            <span className="font-bold text-lg sm:text-xl text-gray-800">UNILAVRAS</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-600">
          <Button variant="ghost" size="sm" className="text-gray-600 hidden sm:inline-flex">
            {user.curso.toUpperCase()}
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600 hidden md:inline-flex">
            {user.ra}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <span className="hidden sm:inline">{user.nomeCompleto.split(" ")[0].toUpperCase()}</span>
                <span className="sm:hidden">{user.nomeCompleto.split(" ")[0].charAt(0).toUpperCase()}</span>
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-orange-500">
                  <img
                    src={user.fotoDataUrl || "/placeholder.svg"}
                    alt="Foto do usuário"
                    className="w-full h-full object-cover"
                  />
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem disabled>
                <span className="font-medium">{user.nomeCompleto}</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <span className="text-xs text-gray-500">{user.email}</span>
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
