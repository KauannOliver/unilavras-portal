import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const notas = [
  {
    disciplina: "Algoritmos e Estruturas de Dados",
    codigo: "AED001",
    avaliacoes: [
      { tipo: "P1", nota: 8.5, peso: 3, data: "2024-01-10" },
      { tipo: "P2", nota: 7.8, peso: 3, data: "2024-01-20" },
      { tipo: "Trabalho", nota: 9.2, peso: 2, data: "2024-01-25" },
      { tipo: "P3", nota: null, peso: 2, data: "2024-02-05" },
    ],
  },
  {
    disciplina: "Banco de Dados",
    codigo: "BD001",
    avaliacoes: [
      { tipo: "P1", nota: 9.0, peso: 4, data: "2024-01-12" },
      { tipo: "Projeto", nota: 8.7, peso: 3, data: "2024-01-22" },
      { tipo: "P2", nota: null, peso: 3, data: "2024-02-08" },
    ],
  },
  {
    disciplina: "Desenvolvimento Web",
    codigo: "DW001",
    avaliacoes: [
      { tipo: "P1", nota: 8.2, peso: 3, data: "2024-01-15" },
      { tipo: "Projeto 1", nota: 9.5, peso: 2, data: "2024-01-28" },
      { tipo: "P2", nota: null, peso: 3, data: "2024-02-10" },
      { tipo: "Projeto Final", nota: null, peso: 2, data: "2024-02-20" },
    ],
  },
]

function calcularMedia(avaliacoes: any[]) {
  const avaliacoesComNota = avaliacoes.filter((av) => av.nota !== null)
  if (avaliacoesComNota.length === 0) return 0

  const somaNotas = avaliacoesComNota.reduce((acc, av) => acc + av.nota * av.peso, 0)
  const somaPesos = avaliacoesComNota.reduce((acc, av) => acc + av.peso, 0)

  return somaPesos > 0 ? somaNotas / somaPesos : 0
}

export default function NotasPage() {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Notas e Avaliações</h1>
          <p className="text-gray-600">Acompanhe seu desempenho acadêmico</p>
        </div>

        <div className="space-y-6">
          {notas.map((disciplina, index) => {
            const media = calcularMedia(disciplina.avaliacoes)
            const statusMedia = media >= 7 ? "Aprovado" : media >= 5 ? "Recuperação" : "Reprovado"
            const corStatus =
              media >= 7
                ? "bg-green-100 text-green-800"
                : media >= 5
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"

            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl mb-1">{disciplina.disciplina}</CardTitle>
                      <p className="text-sm text-gray-500">{disciplina.codigo}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-teal-600 mb-1">{media.toFixed(1)}</div>
                      <Badge className={corStatus}>{statusMedia}</Badge>
                    </div>
                  </div>
                  <Progress value={Math.min((media / 10) * 100, 100)} className="h-2" />
                </CardHeader>

                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="text-left p-3 font-medium">Avaliação</th>
                          <th className="text-center p-3 font-medium">Nota</th>
                          <th className="text-center p-3 font-medium">Peso</th>
                          <th className="text-center p-3 font-medium">Data</th>
                          <th className="text-center p-3 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {disciplina.avaliacoes.map((avaliacao, idx) => (
                          <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="p-3 font-medium">{avaliacao.tipo}</td>
                            <td className="p-3 text-center">
                              {avaliacao.nota !== null ? (
                                <span
                                  className={`font-bold ${avaliacao.nota >= 7 ? "text-green-600" : avaliacao.nota >= 5 ? "text-yellow-600" : "text-red-600"}`}
                                >
                                  {avaliacao.nota.toFixed(1)}
                                </span>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                            <td className="p-3 text-center">{avaliacao.peso}</td>
                            <td className="p-3 text-center">{new Date(avaliacao.data).toLocaleDateString("pt-BR")}</td>
                            <td className="p-3 text-center">
                              {avaliacao.nota !== null ? (
                                <Badge
                                  variant="outline"
                                  className={
                                    avaliacao.nota >= 7
                                      ? "border-green-500 text-green-700"
                                      : avaliacao.nota >= 5
                                        ? "border-yellow-500 text-yellow-700"
                                        : "border-red-500 text-red-700"
                                  }
                                >
                                  Realizada
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="border-gray-400 text-gray-600">
                                  Pendente
                                </Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </MainLayout>
  )
}
