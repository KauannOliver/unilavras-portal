import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, FileText, Search, Upload, Eye } from "lucide-react"

const documentos = [
  {
    id: 1,
    nome: "Histórico Acadêmico",
    tipo: "PDF",
    categoria: "Acadêmico",
    dataEmissao: "2024-01-15",
    status: "Disponível",
    tamanho: "245 KB",
  },
  {
    id: 2,
    nome: "Declaração de Matrícula",
    tipo: "PDF",
    categoria: "Acadêmico",
    dataEmissao: "2024-01-10",
    status: "Disponível",
    tamanho: "180 KB",
  },
  {
    id: 3,
    nome: "Comprovante de Pagamento - Janeiro",
    tipo: "PDF",
    categoria: "Financeiro",
    dataEmissao: "2024-01-05",
    status: "Disponível",
    tamanho: "120 KB",
  },
  {
    id: 4,
    nome: "Certificado de Conclusão - Módulo I",
    tipo: "PDF",
    categoria: "Certificado",
    dataEmissao: "2023-12-20",
    status: "Disponível",
    tamanho: "890 KB",
  },
  {
    id: 5,
    nome: "Atestado Médico",
    tipo: "PDF",
    categoria: "Pessoal",
    dataEmissao: "2024-01-08",
    status: "Em análise",
    tamanho: "156 KB",
  },
  {
    id: 6,
    nome: "Solicitação de Transferência",
    tipo: "PDF",
    categoria: "Acadêmico",
    dataEmissao: "2024-01-12",
    status: "Pendente",
    tamanho: "203 KB",
  },
]

const categorias = ["Todos", "Acadêmico", "Financeiro", "Certificado", "Pessoal"]

export default function DocumentosPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Documentos</h1>
            <p className="text-gray-600">Gerencie e baixe seus documentos acadêmicos</p>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700 w-full sm:w-auto">
            <Upload className="h-4 w-4 mr-2" />
            Enviar Documento
          </Button>
        </div>

        {/* Filtros */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Buscar documentos..." className="pl-10" />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {categorias.map((categoria) => (
                  <Button
                    key={categoria}
                    variant={categoria === "Todos" ? "default" : "outline"}
                    size="sm"
                    className={categoria === "Todos" ? "bg-teal-600 hover:bg-teal-700" : ""}
                  >
                    {categoria}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Documentos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {documentos.map((documento) => (
            <Card key={documento.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-teal-600" />
                    <Badge variant="outline" className="text-xs">
                      {documento.tipo}
                    </Badge>
                  </div>
                  <Badge
                    className={
                      documento.status === "Disponível"
                        ? "bg-green-100 text-green-800"
                        : documento.status === "Em análise"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                    }
                  >
                    {documento.status}
                  </Badge>
                </div>
                <CardTitle className="text-base leading-tight">{documento.nome}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Categoria:</span>
                    <span className="font-medium">{documento.categoria}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data de emissão:</span>
                    <span>{new Date(documento.dataEmissao).toLocaleDateString("pt-BR")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tamanho:</span>
                    <span>{documento.tamanho}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {documento.status === "Disponível" && (
                    <>
                      <Button size="sm" className="flex-1 bg-teal-600 hover:bg-teal-700">
                        <Download className="h-3 w-3 mr-1" />
                        Baixar
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </>
                  )}
                  {documento.status !== "Disponível" && (
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent" disabled>
                      {documento.status}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-teal-600">12</div>
              <p className="text-sm text-gray-600">Total de Documentos</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">8</div>
              <p className="text-sm text-gray-600">Disponíveis</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">2</div>
              <p className="text-sm text-gray-600">Em Análise</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-600">2</div>
              <p className="text-sm text-gray-600">Pendentes</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
