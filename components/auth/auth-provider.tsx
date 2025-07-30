// components/auth/auth-provider.tsx
"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import type { User } from "@/types/auth"
import { getCurrentUser, validateSession, logout as authLogout } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  loading: boolean
  logout: () => void
  refreshUser: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  const refreshUser = () => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
  }

  const logout = () => {
    authLogout()
    setUser(null)
    router.push("/login")
  }

  // Checagem de sessão no cliente
  useEffect(() => {
    const hasSession = validateSession()
    if (!hasSession) {
      setUser(null)
      setLoading(false)
      // se tentar abrir rota protegida sem sessão → volta pro login
      if (pathname !== "/login" && pathname !== "/registro") {
        router.push("/login")
      }
    } else {
      const currentUser = getCurrentUser()
      setUser(currentUser)
      setLoading(false)
      // se já está logado e está em /login ou /registro → manda pra home
      if (pathname === "/login" || pathname === "/registro") {
        router.push("/")
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Sincroniza login/logout entre abas
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "portal.session" || e.key === "portal.users") {
        const currentUser = getCurrentUser()
        setUser(currentUser)
        // Se sessão removida em outra aba, volta ao login
        if (!currentUser && pathname !== "/login" && pathname !== "/registro") {
          router.push("/login")
        }
      }
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Carregando…
      </div>
    )
  }

  return <AuthContext.Provider value={{ user, loading, logout, refreshUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
  return ctx
}
