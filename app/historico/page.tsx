import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Award } from "lucide-react"

const historico = {
  resumo: {
    cargaHorariaTotal: 2400,
    cargaHorariaCumprida: 1920,
    disciplinasConcluidas: 32,
    disciplinasReprovadas: 2,
    mediaGeral: 8.4,
    coeficienteRendimento: 0.85,
  },
  periodos: [
    {
      periodo: "1º Período",
      ano: "2022.1",
      disciplinas: [
        { nome: "Algoritmos I", codigo: "ALG001", nota: 8.5, situacao: "Aprovado", cargaHoraria: 80 },
        { nome: "Matemática Discreta", codigo: "MAT001", nota: 7.8, situacao: "Aprovado", cargaHoraria: 60 },
        { nome: "Introdução à Computação", codigo: "ICC001", nota: 9.2, situacao: "Aprovado", cargaHoraria: 40 },
        { nome: "Português Instrumental", codigo: "POR001", nota: 8.0, situacao: "Aprovado", cargaHoraria: 40 },
      ],
    },
    {
      periodo: "2º Período",
      ano: "2022.2",
      disciplinas: [
        { nome: "Algoritmos II", codigo: "ALG002", nota: 7.5, situacao: "Aprovado", cargaHoraria: 80 },
        { nome: "Estruturas de Dados", codigo: "EDD001", nota: 8.8, situacao: "Aprovado", cargaHoraria: 80 },
        { nome: "Banco de Dados I", codigo: "BD001", nota: 9.0, situacao: "Aprovado", cargaHoraria: 60 },
        { nome: "Inglês Técnico", codigo: "ING001", nota: 7.2, situacao: "Aprovado", cargaHoraria: 40 },
      ],
    },
    {
      periodo: "3º Período",
      ano: "2023.1",
      disciplinas: [
        {
          nome: "Programação Orientada a Objetos",
          codigo: "POO001",
          nota: 8.7,
          situacao: "Aprovado",
          cargaHoraria: 80,
        },
        { nome: "Banco de Dados II", codigo: "BD002", nota: 8.3, situacao: "Aprovado", cargaHoraria: 60 },
        { nome: "Redes de Computadores", codigo: "RED001", nota: 7.9, situacao: "Aprovado", cargaHoraria: 60 },
        { nome: "Estatística", codigo: "EST001", nota: 6.8, situacao: "Aprovado", cargaHoraria: 40 },
      ],
    },
    {
      periodo: "4º Período",
      ano: "2023.2",
      disciplinas: [
        { nome: "Engenharia de Software I", codigo: "ES001", nota: 9.1, situacao: "Aprovado", cargaHoraria: 80 },
        { nome: "Desenvolvimento Web I", codigo: "DW001", nota: 8.9, situacao: "Aprovado", cargaHoraria: 80 },
        { nome: "Sistemas Operacionais", codigo: "SO001", nota: 7.6, situacao: "Aprovado", cargaHoraria: 60 },
        { nome: "Metodologia Científica", codigo: "MET001", nota: 8.2, situacao: "Aprovado", cargaHoraria: 40 },
      ],
    },
    {
      periodo: "5º Período",
      ano: "2024.1",
      disciplinas: [
        { nome: "Engenharia de Software II", codigo: "ES002", nota: 8.6, situacao: "Aprovado", cargaHoraria: 80 },
        { nome: "Desenvolvimento Web II", codigo: "DW002", nota: 9.3, situacao: "Aprovado", cargaHoraria: 80 },
        { nome: "Segurança da Informação", codigo: "SEG001", nota: 8.1, situacao: "Aprovado", cargaHoraria: 60 },
        { nome: "Gestão de Projetos", codigo: "GP001", nota: 8.7, situacao: "Aprovado", cargaHoraria: 40 },
      ],
    },
  ],
}

export default function HistoricoPage() {
  const { resumo, periodos } = historico

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Histórico Acadêmico</h1>
            <p className="text-gray-600">Acompanhe seu desempenho ao longo do curso</p>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700 w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Baixar Histórico
          </Button>
        </div>

        {/* Resumo Acadêmico */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Média Geral</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-teal-600">{resumo.mediaGeral}</div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">CR</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{resumo.coeficienteRendimento}</div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Disciplinas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{resumo.disciplinasConcluidas}</div>
              <p className="text-xs text-gray-500">Concluídas</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Reprovações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{resumo.disciplinasReprovadas}</div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow sm:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Carga Horária</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-purple-600">
                {resumo.cargaHorariaCumprida}h / {resumo.cargaHorariaTotal}h
              </div>
              <p className="text-xs text-gray-500">
                {((resumo.cargaHorariaCumprida / resumo.cargaHorariaTotal) * 100).toFixed(1)}% concluída
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Histórico por Período */}
        <div className="space-y-6">
          {periodos.map((periodo, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Award className="h-5 w-5 text-teal-600" />
                      {periodo.periodo}
                    </CardTitle>
                    <p className="text-sm text-gray-500">{periodo.ano}</p>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {periodo.disciplinas.length} disciplinas
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left p-3 font-medium">Disciplina</th>
                        <th className="text-center p-3 font-medium hidden sm:table-cell">Código</th>
                        <th className="text-center p-3 font-medium">Nota</th>
                        <th className="text-center p-3 font-medium hidden md:table-cell">CH</th>
                        <th className="text-center p-3 font-medium">Situação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {periodo.disciplinas.map((disciplina, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="p-3">
                            <div>
                              <div className="font-medium">{disciplina.nome}</div>
                              <div className="text-xs text-gray-500 sm:hidden">{disciplina.codigo}</div>
                            </div>
                          </td>
                          <td className="p-3 text-center hidden sm:table-cell text-gray-600">{disciplina.codigo}</td>
                          <td className="p-3 text-center">
                            <span
                              className={`font-bold ${
                                disciplina.nota >= 7
                                  ? "text-green-600"
                                  : disciplina.nota >= 5
                                    ? "text-yellow-600"
                                    : "text-red-600"
                              }`}
                            >
                              {disciplina.nota.toFixed(1)}
                            </span>
                          </td>
                          <td className="p-3 text-center hidden md:table-cell text-gray-600">
                            {disciplina.cargaHoraria}h
                          </td>
                          <td className="p-3 text-center">
                            <Badge
                              className={
                                disciplina.situacao === "Aprovado"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }
                            >
                              {disciplina.situacao}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
