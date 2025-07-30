"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Home,
  User,
  BookOpen,
  Star,
  GraduationCap,
  FileText,
  DollarSign,
  Calendar,
  Settings,
  BarChart3,
} from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { icon: Home, href: "/", label: "Início" },
  { icon: User, href: "/perfil", label: "Perfil" },
  { icon: BookOpen, href: "/disciplinas", label: "Disciplinas" },
  { icon: Star, href: "/notas", label: "Notas" },
  { icon: GraduationCap, href: "/historico", label: "Histórico" },
  { icon: FileText, href: "/documentos", label: "Documentos" },
  { icon: DollarSign, href: "/financeiro", label: "Financeiro" },
  { icon: Calendar, href: "/calendario", label: "Calendário" },
  { icon: BarChart3, href: "/relatorios", label: "Relatórios" },
  { icon: Settings, href: "/configuracoes", label: "Configurações" },
]

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50 lg:z-auto
          h-screen bg-teal-600 text-white
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          w-64 lg:w-16 xl:w-64
          flex flex-col
        `}
      >
        <div className="flex-1 overflow-y-auto">
          <nav className="py-4">
            <div className="space-y-1 px-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Link key={item.href} href={item.href} onClick={onClose}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`
                        w-full justify-start text-white hover:bg-teal-700 
                        ${isActive ? "bg-teal-700" : ""}
                        h-12 px-3
                      `}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span className="ml-3 lg:hidden xl:inline-block">{item.label}</span>
                    </Button>
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>
      </aside>
    </>
  )
}
