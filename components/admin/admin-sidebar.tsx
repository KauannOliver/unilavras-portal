"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Users, BarChart3, Settings, FileText, Shield, Database } from "lucide-react"

interface AdminSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { icon: Users, href: "/admin", label: "Usuários" },
  { icon: BarChart3, href: "/admin/relatorios", label: "Relatórios" },
  { icon: FileText, href: "/admin/documentos", label: "Documentos" },
  { icon: Database, href: "/admin/backup", label: "Backup" },
  { icon: Settings, href: "/admin/configuracoes", label: "Configurações" },
]

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50 lg:z-auto
          h-screen bg-red-600 text-white
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          w-64 lg:w-16 xl:w-64
          flex flex-col
        `}
      >
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 border-b border-red-500">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span className="lg:hidden xl:inline-block font-semibold">Painel Admin</span>
            </div>
          </div>

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
                        w-full justify-start text-white hover:bg-red-700 
                        ${isActive ? "bg-red-700" : ""}
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
