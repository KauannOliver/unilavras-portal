import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Users, Calendar } from "lucide-react"

const disciplinas = [
  {
    id: 1,
    nome: "Algoritmos e Estruturas de Dados",
    codigo: "AED001",
    professor: "Prof. Dr. João Silva",
    cargaHoraria: 80,
    horasCompletas: 65,
    status: "Em andamento",
    proximaAula: "2024-01-15 19:00",
    sala: "Lab 01",
  },
  {
    id: 2,
    nome: "Banco de Dados",
    codigo: "BD001",
    professor: "Prof. Dra. Maria Santos",
    cargaHoraria: 60,
    horasCompletas: 45,
    status: "Em andamento",
    proximaAula: "2024-01-16 19:00",
    sala: "Sala 205",
  },
  {
    id: 3,
    nome: "Engenharia de Software",
    codigo: "ES001",
    professor: "Prof. Carlos Oliveira",
    cargaHoraria: 80,
    horasCompletas: 80,
    status: "Concluída",
    proximaAula: null,
    sala: "Sala 301",
  },
  {
    id: 4,
    nome: "Desenvolvimento Web",
    codigo: "DW001",
    professor: "Prof. Ana Costa",
    cargaHoraria: 60,
    horasCompletas: 30,
    status: "Em andamento",
    proximaAula: "2024-01-17 19:00",
    sala: "Lab 02",
  },
]

export default function DisciplinasPage() {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Disciplinas</h1>
          <p className="text-gray-600">Acompanhe suas disciplinas do semestre atual</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {disciplinas.map((disciplina) => (
            <Card key={disciplina.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{disciplina.nome}</CardTitle>
                    <p className="text-sm text-gray-500 mb-2">{disciplina.codigo}</p>
                    <Badge
                      variant={disciplina.status === "Concluída" ? "default" : "secondary"}
                      className={disciplina.status === "Concluída" ? "bg-green-100 text-green-800" : ""}
                    >
                      {disciplina.status}
                    </Badge>
                  </div>
                  <BookOpen className="h-6 w-6 text-teal-600" />
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{disciplina.professor}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso da carga horária</span>
                    <span>
                      {disciplina.horasCompletas}h / {disciplina.cargaHoraria}h
                    </span>
                  </div>
                  <Progress value={(disciplina.horasCompletas / disciplina.cargaHoraria) * 100} className="h-2" />
                </div>

                {disciplina.proximaAula && (
                  <div className="bg-teal-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 text-sm text-teal-800 mb-1">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">Próxima aula</span>
                    </div>
                    <div className="text-sm text-teal-700">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(disciplina.proximaAula).toLocaleString("pt-BR")}</span>
                      </div>
                      <div className="mt-1">
                        <span className="font-medium">Local:</span> {disciplina.sala}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
