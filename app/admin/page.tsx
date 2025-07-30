"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Search, Edit, Trash2, UserPlus, AlertTriangle, Filter, Download } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for users
const mockUsers = [
  {
    id: 1,
    nome: "João Silva Santos",
    email: "joao.silva@email.com",
    curso: "Engenharia Civil",
    status: "Ativo",
    dataRegistro: "2024-01-15",
    foto: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    nome: "Maria Oliveira Costa",
    email: "maria.oliveira@email.com",
    curso: "Direito",
    status: "Pendente",
    dataRegistro: "2024-01-18",
    foto: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    nome: "Pedro Almeida Lima",
    email: "pedro.almeida@email.com",
    curso: "Arquitetura",
    status: "Ativo",
    dataRegistro: "2024-01-20",
    foto: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    nome: "Ana Carolina Ferreira",
    email: "ana.ferreira@email.com",
    curso: "Enfermagem",
    status: "Inativo",
    dataRegistro: "2024-01-22",
    foto: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    nome: "Carlos Eduardo Souza",
    email: "carlos.souza@email.com",
    curso: "Odontologia",
    status: "Ativo",
    dataRegistro: "2024-01-25",
    foto: "/placeholder.svg?height=40&width=40",
  },
]

export default function AdminDashboard() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCurso, setFilterCurso] = useState("todos")
  const [filterStatus, setFilterStatus] = useState("todos")
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])

  const cursos = ["Arquitetura", "Direito", "Enfermagem", "Engenharia Civil", "Odontologia"]
  const statusOptions = ["Ativo", "Pendente", "Inativo"]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCurso = filterCurso === "todos" || user.curso === filterCurso
    const matchesStatus = filterStatus === "todos" || user.status === filterStatus

    return matchesSearch && matchesCurso && matchesStatus
  })

  const handleSelectUser = (userId: number) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id))
    }
  }

  const handleDeleteUser = (userId: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId))
    setSelectedUsers((prev) => prev.filter((id) => id !== userId))
  }

  const handleBulkDelete = () => {
    setUsers((prev) => prev.filter((user) => !selectedUsers.includes(user.id)))
    setSelectedUsers([])
  }

  const handleDeleteAllUsers = () => {
    setUsers([])
    setSelectedUsers([])
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo":
        return "bg-green-100 text-green-800"
      case "Pendente":
        return "bg-yellow-100 text-yellow-800"
      case "Inativo":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Gerenciamento de Usuários</h1>
            <p className="text-gray-600">Administre contas de estudantes e suas informações</p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-teal-600 hover:bg-teal-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Novo Usuário
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total de Usuários</p>
                  <p className="text-2xl font-bold text-teal-600">{users.length}</p>
                </div>
                <Users className="h-8 w-8 text-teal-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Usuários Ativos</p>
                  <p className="text-2xl font-bold text-green-600">
                    {users.filter((u) => u.status === "Ativo").length}
                  </p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pendentes</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {users.filter((u) => u.status === "Pendente").length}
                  </p>
                </div>
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Inativos</p>
                  <p className="text-2xl font-bold text-red-600">
                    {users.filter((u) => u.status === "Inativo").length}
                  </p>
                </div>
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar por nome ou email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={filterCurso} onValueChange={setFilterCurso}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Curso" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os Cursos</SelectItem>
                    {cursos.map((curso) => (
                      <SelectItem key={curso} value={curso}>
                        {curso}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">
                    {selectedUsers.length} usuário(s) selecionado(s)
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setSelectedUsers([])}>
                    Cancelar
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir Selecionados
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir {selectedUsers.length} usuário(s)? Esta ação não pode ser
                          desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleBulkDelete} className="bg-red-600 hover:bg-red-700">
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Users Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Lista de Usuários ({filteredUsers.length})</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleSelectAll}>
                  {selectedUsers.length === filteredUsers.length ? "Desmarcar Todos" : "Selecionar Todos"}
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Excluir Todos
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Excluir Todos os Usuários</AlertDialogTitle>
                      <AlertDialogDescription>
                        <strong>ATENÇÃO:</strong> Esta ação irá excluir TODOS os usuários do sistema, exceto a conta de
                        administrador. Esta ação não pode ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteAllUsers} className="bg-red-600 hover:bg-red-700">
                        Excluir Todos
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-3 font-medium">
                      <input
                        type="checkbox"
                        checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                        onChange={handleSelectAll}
                        className="rounded"
                      />
                    </th>
                    <th className="text-left p-3 font-medium">Usuário</th>
                    <th className="text-left p-3 font-medium hidden md:table-cell">Curso</th>
                    <th className="text-center p-3 font-medium">Status</th>
                    <th className="text-center p-3 font-medium hidden lg:table-cell">Data Registro</th>
                    <th className="text-center p-3 font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleSelectUser(user.id)}
                          className="rounded"
                        />
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={user.foto || "/placeholder.svg"} alt={user.nome} />
                            <AvatarFallback>
                              {user.nome
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.nome}</div>
                            <div className="text-gray-500 text-xs">{user.email}</div>
                            <div className="md:hidden text-xs text-gray-500 mt-1">{user.curso}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 hidden md:table-cell text-gray-600">{user.curso}</td>
                      <td className="p-3 text-center">
                        <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                      </td>
                      <td className="p-3 text-center hidden lg:table-cell text-gray-600">
                        {new Date(user.dataRegistro).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700 bg-transparent"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja excluir o usuário <strong>{user.nome}</strong>? Esta ação não
                                  pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredUsers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Nenhum usuário encontrado com os filtros aplicados.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
