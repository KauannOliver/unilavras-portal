"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, CalendarIcon, Clock, MapPin } from "lucide-react"

const eventos = [
  {
    id: 1,
    titulo: "Prova de Algoritmos",
    data: "2024-01-15",
    hora: "19:00",
    tipo: "Prova",
    local: "Sala 101",
    disciplina: "Algoritmos e Estruturas de Dados",
  },
  {
    id: 2,
    titulo: "Entrega do Projeto",
    data: "2024-01-18",
    hora: "23:59",
    tipo: "Entrega",
    local: "Portal Online",
    disciplina: "Desenvolvimento Web",
  },
  {
    id: 3,
    titulo: "Aula Prática",
    data: "2024-01-20",
    hora: "19:00",
    tipo: "Aula",
    local: "Lab 02",
    disciplina: "Banco de Dados",
  },
  {
    id: 4,
    titulo: "Seminário",
    data: "2024-01-22",
    hora: "20:00",
    tipo: "Apresentação",
    local: "Auditório",
    disciplina: "Engenharia de Software",
  },
  {
    id: 5,
    titulo: "Prova Final",
    data: "2024-01-25",
    hora: "19:00",
    tipo: "Prova",
    local: "Sala 205",
    disciplina: "Banco de Dados",
  },
]

const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

export default function CalendarioPage() {
  const [mesAtual, setMesAtual] = useState(new Date().getMonth())
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear())

  const proximoMes = () => {
    if (mesAtual === 11) {
      setMesAtual(0)
      setAnoAtual(anoAtual + 1)
    } else {
      setMesAtual(mesAtual + 1)
    }
  }

  const mesAnterior = () => {
    if (mesAtual === 0) {
      setMesAtual(11)
      setAnoAtual(anoAtual - 1)
    } else {
      setMesAtual(mesAtual - 1)
    }
  }

  const getDiasDoMes = () => {
    const primeiroDia = new Date(anoAtual, mesAtual, 1)
    const ultimoDia = new Date(anoAtual, mesAtual + 1, 0)
    const diasDoMes = ultimoDia.getDate()
    const diaDaSemana = primeiroDia.getDay()

    const dias = []

    // Dias vazios do início
    for (let i = 0; i < diaDaSemana; i++) {
      dias.push(null)
    }

    // Dias do mês
    for (let dia = 1; dia <= diasDoMes; dia++) {
      dias.push(dia)
    }

    return dias
  }

  const temEvento = (dia: number) => {
    const dataStr = `${anoAtual}-${String(mesAtual + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`
    return eventos.some((evento) => evento.data === dataStr)
  }

  const eventosProximos = eventos
    .filter((evento) => new Date(evento.data) >= new Date())
    .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
    .slice(0, 5)

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Calendário Acadêmico</h1>
          <p className="text-gray-600">Acompanhe suas aulas, provas e eventos importantes</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Calendário */}
          <div className="xl:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    {meses[mesAtual]} {anoAtual}
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={mesAnterior}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={proximoMes}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((dia) => (
                    <div key={dia} className="p-2 text-center text-sm font-medium text-gray-500">
                      {dia}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {getDiasDoMes().map((dia, index) => (
                    <div
                      key={index}
                      className={`
                        p-2 h-12 flex items-center justify-center text-sm relative
                        ${dia ? "hover:bg-gray-100 cursor-pointer" : ""}
                        ${dia && temEvento(dia) ? "bg-teal-50 border border-teal-200 rounded" : ""}
                        ${
                          dia === new Date().getDate() &&
                          mesAtual === new Date().getMonth() &&
                          anoAtual === new Date().getFullYear()
                            ? "bg-teal-600 text-white rounded font-bold"
                            : ""
                        }
                      `}
                    >
                      {dia}
                      {dia && temEvento(dia) && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-teal-600 rounded-full"></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Próximos Eventos */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-teal-600" />
                  Próximos Eventos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {eventosProximos.map((evento) => (
                  <div key={evento.id} className="border-l-4 border-teal-600 pl-4 py-2">
                    <div className="font-medium text-sm">{evento.titulo}</div>
                    <div className="text-xs text-gray-500 mb-2">{evento.disciplina}</div>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        {new Date(evento.data).toLocaleDateString("pt-BR")}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {evento.hora}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                      <MapPin className="h-3 w-3" />
                      {evento.local}
                    </div>
                    <Badge
                      variant="outline"
                      className={`mt-2 text-xs ${
                        evento.tipo === "Prova"
                          ? "border-red-500 text-red-700"
                          : evento.tipo === "Entrega"
                            ? "border-orange-500 text-orange-700"
                            : "border-blue-500 text-blue-700"
                      }`}
                    >
                      {evento.tipo}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Lista de Todos os Eventos */}
        <Card>
          <CardHeader>
            <CardTitle>Todos os Eventos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-3 font-medium">Evento</th>
                    <th className="text-left p-3 font-medium hidden sm:table-cell">Disciplina</th>
                    <th className="text-center p-3 font-medium">Data</th>
                    <th className="text-center p-3 font-medium hidden md:table-cell">Hora</th>
                    <th className="text-center p-3 font-medium hidden lg:table-cell">Local</th>
                    <th className="text-center p-3 font-medium">Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  {eventos.map((evento) => (
                    <tr key={evento.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="font-medium">{evento.titulo}</div>
                        <div className="text-xs text-gray-500 sm:hidden">{evento.disciplina}</div>
                      </td>
                      <td className="p-3 hidden sm:table-cell text-gray-600">{evento.disciplina}</td>
                      <td className="p-3 text-center">{new Date(evento.data).toLocaleDateString("pt-BR")}</td>
                      <td className="p-3 text-center hidden md:table-cell">{evento.hora}</td>
                      <td className="p-3 text-center hidden lg:table-cell">{evento.local}</td>
                      <td className="p-3 text-center">
                        <Badge
                          variant="outline"
                          className={
                            evento.tipo === "Prova"
                              ? "border-red-500 text-red-700"
                              : evento.tipo === "Entrega"
                                ? "border-orange-500 text-orange-700"
                                : "border-blue-500 text-blue-700"
                          }
                        >
                          {evento.tipo}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
