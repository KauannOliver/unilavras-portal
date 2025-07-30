"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/components/auth/auth-provider"
import { User, Bell, Shield, Palette, Globe, Save, Camera, Mail, Phone, Lock } from "lucide-react"

export default function ConfiguracoesPage() {
  const { user } = useAuth()
  const [notificacoes, setNotificacoes] = useState({
    email: true,
    push: true,
    sms: false,
    notas: true,
    financeiro: true,
    eventos: true,
  })

  const [tema, setTema] = useState("claro")
  const [idioma, setIdioma] = useState("pt-BR")

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Configurações</h1>
          <p className="text-gray-600">Personalize sua experiência no portal</p>
        </div>

        <Tabs defaultValue="perfil" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 bg-white rounded-lg shadow-sm">
            <TabsTrigger value="perfil" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
              <User className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Perfil</span>
            </TabsTrigger>
            <TabsTrigger
              value="notificacoes"
              className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
            >
              <Bell className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Notificações</span>
            </TabsTrigger>
            <TabsTrigger value="seguranca" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
              <Shield className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Segurança</span>
            </TabsTrigger>
            <TabsTrigger value="aparencia" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
              <Palette className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Aparência</span>
            </TabsTrigger>
            <TabsTrigger value="geral" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
              <Globe className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Geral</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="perfil" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Perfil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Foto do Perfil */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={(user && user.fotoDataUrl) || "/placeholder-user.jpg"} alt="Foto do perfil" />
                    <AvatarFallback>{(user?.nomeCompleto?.split(" ").map(p=>p[0]).join("") || "US").slice(0,2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="text-center sm:text-left">
                    <h3 className="font-semibold">Foto do Perfil</h3>
                    <p className="text-sm text-gray-600 mb-2">JPG, PNG ou GIF. Máximo 2MB.</p>
                    <Button variant="outline" size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      Alterar Foto
                    </Button>
                  </div>
                </div>

                {/* Informações Pessoais */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input id="nome" defaultValue={user?.nomeCompleto || ""} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" defaultValue="emerson.silva@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input id="telefone" defaultValue="(35) 99876-5432" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nascimento">Data de Nascimento</Label>
                    <Input id="nascimento" type="date" defaultValue="1985-03-15" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-teal-600 hover:bg-teal-700">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Alterações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notificacoes" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-teal-600" />
                      <div>
                        <Label>Notificações por E-mail</Label>
                        <p className="text-sm text-gray-600">Receber notificações no seu e-mail</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificacoes.email}
                      onCheckedChange={(checked) => setNotificacoes({ ...notificacoes, email: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Bell className="h-5 w-5 text-teal-600" />
                      <div>
                        <Label>Notificações Push</Label>
                        <p className="text-sm text-gray-600">Receber notificações no navegador</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificacoes.push}
                      onCheckedChange={(checked) => setNotificacoes({ ...notificacoes, push: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-teal-600" />
                      <div>
                        <Label>Notificações por SMS</Label>
                        <p className="text-sm text-gray-600">Receber notificações no seu celular</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificacoes.sms}
                      onCheckedChange={(checked) => setNotificacoes({ ...notificacoes, sms: checked })}
                    />
                  </div>
                </div>

                <hr />

                <div className="space-y-4">
                  <h4 className="font-semibold">Tipos de Notificação</h4>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notas e Avaliações</Label>
                      <p className="text-sm text-gray-600">Quando novas notas forem lançadas</p>
                    </div>
                    <Switch
                      checked={notificacoes.notas}
                      onCheckedChange={(checked) => setNotificacoes({ ...notificacoes, notas: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Financeiro</Label>
                      <p className="text-sm text-gray-600">Vencimentos e pagamentos</p>
                    </div>
                    <Switch
                      checked={notificacoes.financeiro}
                      onCheckedChange={(checked) => setNotificacoes({ ...notificacoes, financeiro: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Eventos e Calendário</Label>
                      <p className="text-sm text-gray-600">Lembretes de provas e eventos</p>
                    </div>
                    <Switch
                      checked={notificacoes.eventos}
                      onCheckedChange={(checked) => setNotificacoes({ ...notificacoes, eventos: checked })}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-teal-600 hover:bg-teal-700">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Preferências
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seguranca" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Segurança da Conta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="senha-atual">Senha Atual</Label>
                    <Input id="senha-atual" type="password" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="nova-senha">Nova Senha</Label>
                    <Input id="nova-senha" type="password" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>
                    <Input id="confirmar-senha" type="password" className="mt-1" />
                  </div>
                </div>

                <hr />

                <div className="space-y-4">
                  <h4 className="font-semibold">Autenticação de Dois Fatores</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Ativar 2FA</Label>
                      <p className="text-sm text-gray-600">Adicione uma camada extra de segurança</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <hr />

                <div className="space-y-4">
                  <h4 className="font-semibold">Sessões Ativas</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Chrome - Windows</p>
                        <p className="text-sm text-gray-600">Último acesso: Agora</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Atual</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Safari - iPhone</p>
                        <p className="text-sm text-gray-600">Último acesso: 2 horas atrás</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Encerrar
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-teal-600 hover:bg-teal-700">
                    <Lock className="h-4 w-4 mr-2" />
                    Alterar Senha
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="aparencia" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Personalização da Interface</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-semibold">Tema</Label>
                    <p className="text-sm text-gray-600 mb-3">Escolha como você prefere visualizar o portal</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          tema === "claro" ? "border-teal-600 bg-teal-50" : "border-gray-200"
                        }`}
                        onClick={() => setTema("claro")}
                      >
                        <div className="w-full h-16 bg-white border rounded mb-2"></div>
                        <p className="text-sm font-medium text-center">Claro</p>
                      </div>
                      <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          tema === "escuro" ? "border-teal-600 bg-teal-50" : "border-gray-200"
                        }`}
                        onClick={() => setTema("escuro")}
                      >
                        <div className="w-full h-16 bg-gray-800 border rounded mb-2"></div>
                        <p className="text-sm font-medium text-center">Escuro</p>
                      </div>
                      <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          tema === "auto" ? "border-teal-600 bg-teal-50" : "border-gray-200"
                        }`}
                        onClick={() => setTema("auto")}
                      >
                        <div className="w-full h-16 bg-gradient-to-r from-white to-gray-800 border rounded mb-2"></div>
                        <p className="text-sm font-medium text-center">Automático</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-semibold">Tamanho da Fonte</Label>
                    <p className="text-sm text-gray-600 mb-3">Ajuste o tamanho do texto para melhor legibilidade</p>
                    <div className="flex items-center space-x-4">
                      <Button variant="outline" size="sm">
                        Pequeno
                      </Button>
                      <Button variant="default" size="sm" className="bg-teal-600">
                        Médio
                      </Button>
                      <Button variant="outline" size="sm">
                        Grande
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-semibold">Densidade da Interface</Label>
                    <p className="text-sm text-gray-600 mb-3">Controle o espaçamento entre elementos</p>
                    <div className="flex items-center space-x-4">
                      <Button variant="outline" size="sm">
                        Compacta
                      </Button>
                      <Button variant="default" size="sm" className="bg-teal-600">
                        Normal
                      </Button>
                      <Button variant="outline" size="sm">
                        Espaçosa
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-teal-600 hover:bg-teal-700">
                    <Save className="h-4 w-4 mr-2" />
                    Aplicar Mudanças
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="geral" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Gerais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="idioma" className="text-base font-semibold">
                      Idioma
                    </Label>
                    <p className="text-sm text-gray-600 mb-2">Selecione o idioma da interface</p>
                    <select
                      id="idioma"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={idioma}
                      onChange={(e) => setIdioma(e.target.value)}
                    >
                      <option value="pt-BR">Português (Brasil)</option>
                      <option value="en-US">English (US)</option>
                      <option value="es-ES">Español</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="fuso" className="text-base font-semibold">
                      Fuso Horário
                    </Label>
                    <p className="text-sm text-gray-600 mb-2">Ajuste para sua localização</p>
                    <select
                      id="fuso"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      defaultValue="America/Sao_Paulo"
                    >
                      <option value="America/Sao_Paulo">Brasília (GMT-3)</option>
                      <option value="America/New_York">Nova York (GMT-5)</option>
                      <option value="Europe/London">Londres (GMT+0)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-semibold">Modo Offline</Label>
                      <p className="text-sm text-gray-600">Permitir acesso limitado sem internet</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-semibold">Análise de Uso</Label>
                      <p className="text-sm text-gray-600">Ajudar a melhorar o portal compartilhando dados de uso</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-semibold">Atualizações Automáticas</Label>
                      <p className="text-sm text-gray-600">Baixar atualizações automaticamente</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <hr />

                <div className="space-y-4">
                  <h4 className="font-semibold text-red-600">Zona de Perigo</h4>
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <h5 className="font-medium text-red-800 mb-2">Excluir Conta</h5>
                    <p className="text-sm text-red-700 mb-3">
                      Esta ação não pode ser desfeita. Todos os seus dados serão permanentemente removidos.
                    </p>
                    <Button variant="destructive" size="sm">
                      Excluir Conta
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-teal-600 hover:bg-teal-700">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Configurações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
