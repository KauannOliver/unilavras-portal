"use client"
import Image from "next/image"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"

export default function PerfilPage() {
  const { user } = useAuth()
  if (!user) return null

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho do aluno */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
            <div className="flex-shrink-0">
              <div className="w-32 h-40 bg-gray-200 rounded-lg overflow-hidden">
                <Image
                  src={user.fotoDataUrl || "/placeholder-user.jpg"}
                  alt="Foto do estudante"
                  width={128}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{user.nomeCompleto}</h1>
              <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded text-sm mb-4">Ativo</div>

              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-semibold">Registro acadêmico:</span>
                  <span className="ml-2">{user.ra}</span>
                </div>
                <div>
                  <span className="font-semibold">Curso:</span>
                  <span className="ml-2">{user.curso}</span>
                </div>
                <div>
                  <span className="font-semibold">Email:</span>
                  <span className="ml-2">{user.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="dados" className="w-full">
          <TabsList className="bg-white rounded-lg shadow-sm">
            <TabsTrigger value="dados">Dados Pessoais</TabsTrigger>
            <TabsTrigger value="academico">Dados Acadêmicos</TabsTrigger>
          </TabsList>

          <TabsContent value="dados">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded">{user.nomeCompleto}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded">{user.email}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                    <p className="text-gray-500 bg-gray-50 p-2 rounded">Não informado</p>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Phone className="w-4 h-4" />
                    <span>Não informado</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <MapPin className="w-4 h-4" />
                    <span>Não informado</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="academico">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Registro Acadêmico (RA)</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded">{user.ra}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Curso</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded">{user.curso}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Situação</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded">Ativo</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Período</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded">Não informado</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-mail Institucional</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded">{user.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
