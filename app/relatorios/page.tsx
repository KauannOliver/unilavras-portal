import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Download, TrendingUp, TrendingDown, Award, Clock } from "lucide-react"

const relatorios = {
  desempenhoGeral: {
    mediaAtual: 8.4,
    mediaSemestre: 8.1,
    tendencia: "up",
    posicaoTurma: 5,
    totalAlunos: 45,
  },
  disciplinas: [
    { nome: "Algoritmos", media: 9.2, frequencia: 95, status: "Excelente" },
    { nome: "Banco de Dados", media: 8.8, frequencia: 92, status: "Muito Bom" },
    { nome: "Desenvolvimento Web", media: 8.5, frequencia: 98, status: "Muito Bom" },
    { nome: "Engenharia de Software", media: 7.9, frequencia: 88, status: "Bom" },
    { nome: "Redes", media: 7.2, frequencia: 85, status: "Bom" },
  ],
  frequencia: {
    totalAulas: 120,
    aulasPresentes: 108,
    percentual: 90,
    faltas: 12,
  },
  evolucao: [
    { periodo: "1º Sem", media: 7.8 },
    { periodo: "2º Sem", media: 8.1 },
    { periodo: "3º Sem", media: 8.3 },
    { periodo: "4º Sem", media: 8.4 },
    { periodo: "5º Sem", media: 8.4 },
  ],
}

export default function RelatoriosPage() {
  const { desempenhoGeral, disciplinas, frequencia, evolucao } = relatorios

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Relatórios de Desempenho</h1>
            <p className="text-gray-600">Análise detalhada do seu progresso acadêmico</p>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700 w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Exportar Relatório
          </Button>
        </div>

        {/* Resumo Geral */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Award className="h-4 w-4" />
                Média Geral
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-teal-600">{desempenhoGeral.mediaAtual}</div>
                {desempenhoGeral.tendencia === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
              </div>
              <p className="text-xs text-gray-500">
                {desempenhoGeral.tendencia === "up" ? "+" : "-"}
                {Math.abs(desempenhoGeral.mediaAtual - desempenhoGeral.mediaSemestre).toFixed(1)} vs semestre anterior
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Posição na Turma
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{desempenhoGeral.posicaoTurma}º</div>
              <p className="text-xs text-gray-500">de {desempenhoGeral.totalAlunos} alunos</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Frequência
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{frequencia.percentual}%</div>
              <p className="text-xs text-gray-500">{frequencia.faltas} faltas</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Aulas Assistidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {frequencia.aulasPresentes}/{frequencia.totalAulas}
              </div>
              <Progress value={frequencia.percentual} className="h-2 mt-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Desempenho por Disciplina */}
          <Card>
            <CardHeader>
              <CardTitle>Desempenho por Disciplina</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {disciplinas.map((disciplina, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{disciplina.nome}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{disciplina.media}</span>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            disciplina.status === "Excelente"
                              ? "bg-green-100 text-green-800"
                              : disciplina.status === "Muito Bom"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {disciplina.status}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Nota</span>
                        <span>{disciplina.media}/10</span>
                      </div>
                      <Progress value={disciplina.media * 10} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Frequência</span>
                        <span>{disciplina.frequencia}%</span>
                      </div>
                      <Progress value={disciplina.frequencia} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Evolução das Notas */}
          <Card>
            <CardHeader>
              <CardTitle>Evolução das Médias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {evolucao.map((periodo, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{periodo.periodo}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32">
                        <Progress value={periodo.media * 10} className="h-3" />
                      </div>
                      <span className="text-sm font-bold w-8">{periodo.media}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-teal-50 rounded-lg">
                <div className="flex items-center gap-2 text-teal-800">
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-medium text-sm">Tendência Positiva</span>
                </div>
                <p className="text-xs text-teal-700 mt-1">
                  Sua média tem se mantido estável nos últimos semestres, demonstrando consistência no aprendizado.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Análise Detalhada */}
        <Card>
          <CardHeader>
            <CardTitle>Análise Detalhada</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-600 mb-2">Pontos Fortes</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Excelente desempenho em Algoritmos (9.2)</li>
                  <li>• Alta frequência nas aulas (90%)</li>
                  <li>• Consistência nas notas ao longo dos semestres</li>
                  <li>• Boa posição na turma (5º lugar)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-600 mb-2">Áreas para Melhoria</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Melhorar desempenho em Redes (7.2)</li>
                  <li>• Aumentar frequência em Engenharia de Software</li>
                  <li>• Focar em atividades práticas</li>
                  <li>• Participar mais das discussões em aula</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
