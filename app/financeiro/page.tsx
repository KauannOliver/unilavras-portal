import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, Calendar, Download, CreditCard } from "lucide-react"

const financeiro = {
  resumo: {
    valorTotal: 24000.0,
    valorPago: 18000.0,
    valorPendente: 6000.0,
    proximoVencimento: "2024-02-05",
  },
  parcelas: [
    { id: 1, vencimento: "2024-01-05", valor: 2000.0, status: "Pago", dataPagamento: "2024-01-03" },
    { id: 2, vencimento: "2024-02-05", valor: 2000.0, status: "Pago", dataPagamento: "2024-02-02" },
    { id: 3, vencimento: "2024-03-05", valor: 2000.0, status: "Pago", dataPagamento: "2024-03-01" },
    { id: 4, vencimento: "2024-04-05", valor: 2000.0, status: "Pago", dataPagamento: "2024-04-03" },
    { id: 5, vencimento: "2024-05-05", valor: 2000.0, status: "Pago", dataPagamento: "2024-05-02" },
    { id: 6, vencimento: "2024-06-05", valor: 2000.0, status: "Pago", dataPagamento: "2024-06-01" },
    { id: 7, vencimento: "2024-07-05", valor: 2000.0, status: "Pago", dataPagamento: "2024-07-03" },
    { id: 8, vencimento: "2024-08-05", valor: 2000.0, status: "Pago", dataPagamento: "2024-08-02" },
    { id: 9, vencimento: "2024-09-05", valor: 2000.0, status: "Pago", dataPagamento: "2024-09-01" },
    { id: 10, vencimento: "2024-10-05", valor: 2000.0, status: "Vencido", dataPagamento: null },
    { id: 11, vencimento: "2024-11-05", valor: 2000.0, status: "Pendente", dataPagamento: null },
    { id: 12, vencimento: "2024-12-05", valor: 2000.0, status: "Pendente", dataPagamento: null },
  ],
}

export default function FinanceiroPage() {
  const { resumo, parcelas } = financeiro
  const percentualPago = (resumo.valorPago / resumo.valorTotal) * 100

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Financeiro</h1>
          <p className="text-gray-600">Acompanhe suas mensalidades e pagamentos</p>
        </div>

        {/* Resumo Financeiro */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Total do Curso</CardTitle>
              <DollarSign className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {resumo.valorTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Pago</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                R$ {resumo.valorPago.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">{percentualPago.toFixed(1)}% do total</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Pendente</CardTitle>
              <DollarSign className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                R$ {resumo.valorPendente.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próximo Vencimento</CardTitle>
              <Calendar className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {new Date(resumo.proximoVencimento).toLocaleDateString("pt-BR")}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Parcelas */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Histórico de Parcelas</CardTitle>
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-3 font-medium">Parcela</th>
                    <th className="text-center p-3 font-medium">Vencimento</th>
                    <th className="text-center p-3 font-medium">Valor</th>
                    <th className="text-center p-3 font-medium">Status</th>
                    <th className="text-center p-3 font-medium">Data Pagamento</th>
                    <th className="text-center p-3 font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {parcelas.map((parcela) => (
                    <tr key={parcela.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{parcela.id}ª Parcela</td>
                      <td className="p-3 text-center">{new Date(parcela.vencimento).toLocaleDateString("pt-BR")}</td>
                      <td className="p-3 text-center font-medium">
                        R$ {parcela.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="p-3 text-center">
                        <Badge
                          className={
                            parcela.status === "Pago"
                              ? "bg-green-100 text-green-800"
                              : parcela.status === "Vencido"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {parcela.status}
                        </Badge>
                      </td>
                      <td className="p-3 text-center">
                        {parcela.dataPagamento ? new Date(parcela.dataPagamento).toLocaleDateString("pt-BR") : "-"}
                      </td>
                      <td className="p-3 text-center">
                        {parcela.status !== "Pago" && (
                          <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                            <CreditCard className="h-3 w-3 mr-1" />
                            Pagar
                          </Button>
                        )}
                        {parcela.status === "Pago" && (
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3 mr-1" />
                            Comprovante
                          </Button>
                        )}
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
