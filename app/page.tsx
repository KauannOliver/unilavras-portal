import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Calendar, FileText, TrendingUp } from "lucide-react"
import { CourseWelcome } from "@/components/course/course-welcome"

export default function HomePage() {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <CourseWelcome />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Disciplinas Ativas</CardTitle>
              <BookOpen className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Este semestre</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próximas Provas</CardTitle>
              <Calendar className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Nos próximos 7 dias</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documentos</CardTitle>
              <FileText className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Disponíveis</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Média Geral</CardTitle>
              <TrendingUp className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.7</div>
              <p className="text-xs text-muted-foreground">Semestre atual</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Últimas Atividades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Nova nota disponível em Algoritmos</p>
                    <p className="text-xs text-gray-500">Há 2 horas</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Material de aula adicionado</p>
                    <p className="text-xs text-gray-500">Há 1 dia</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Prova agendada para próxima semana</p>
                    <p className="text-xs text-gray-500">Há 2 dias</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próximos Eventos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-teal-600 pl-4">
                  <p className="text-sm font-medium">Prova de Banco de Dados</p>
                  <p className="text-xs text-gray-500">15 de Dezembro, 19:00</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="text-sm font-medium">Entrega do Projeto Final</p>
                  <p className="text-xs text-gray-500">20 de Dezembro, 23:59</p>
                </div>
                <div className="border-l-4 border-orange-600 pl-4">
                  <p className="text-sm font-medium">Início das Férias</p>
                  <p className="text-xs text-gray-500">22 de Dezembro</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
