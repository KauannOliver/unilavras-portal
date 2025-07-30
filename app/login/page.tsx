"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { User, Eye, EyeOff, GraduationCap, UserPlus } from "lucide-react"
import { loginUser } from "@/lib/auth"
import { useAuth } from "@/components/auth/auth-provider"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [erro, setErro] = useState("")
  const [carregando, setCarregando] = useState(false)
  const router = useRouter()
  const { refreshUser } = useAuth()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCarregando(true)
    setErro("")

    try {
      const result = await loginUser(email, senha)

      if (result.success) {
        // Atualiza o contexto do usuário antes de navegar
        refreshUser()

        // Tenta navegação com o router
        router.push("/")

        // Fallback: se por algum motivo continuar em /login, força a navegação
        setTimeout(() => {
          if (window.location.pathname === "/login") {
            window.location.href = "/"
          }
        }, 120)
      } else {
        setErro(result.message || "Não foi possível fazer login.")
      }
    } catch {
      setErro("Erro inesperado ao fazer login.")
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardContent className="p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="mb-4">
              <Image
                src="/images/logo-unilavras-oficial.png"
                alt="UNILAVRAS Logo"
                width={80}
                height={80}
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-xl font-bold text-gray-800">UNILAVRAS</h1>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                E-mail
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  className="pl-4 pr-10 py-3 bg-gray-50 border-gray-200 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
                <User className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Campo Senha */}
            <div className="space-y-2">
              <Label htmlFor="senha" className="text-sm font-medium text-gray-700">
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="senha"
                  type={mostrarSenha ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="••••••••"
                  className="pl-4 pr-10 py-3 bg-gray-50 border-gray-200 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {mostrarSenha ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Links de ajuda */}
            <div className="flex flex-col items-end space-y-1 text-sm">
              <button type="button" className="text-blue-600 hover:text-blue-800 hover:underline">
                Meu primeiro acesso
              </button>
              <button type="button" className="text-blue-600 hover:text-blue-800 hover:underline">
                Esqueceu sua senha?
              </button>
            </div>

            {/* Mensagem de erro */}
            {erro && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200">
                {erro}
              </div>
            )}

            {/* Botão Acessar */}
            <Button
              type="submit"
              disabled={carregando}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-3 rounded-lg font-medium text-base transition-colors"
            >
              {carregando ? "Acessando..." : "Acessar"}
            </Button>
          </form>

          {/* Link para Cadastro */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-2">Não tem uma conta?</p>
            <Link href="/registro">
              <Button variant="outline" className="w-full border-blue-500 text-blue-600 hover:bg-blue-50 bg-transparent">
                <UserPlus className="h-4 w-4 mr-2" />
                Cadastrar-se
              </Button>
            </Link>
          </div>

          {/* Seção inferior */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                  <GraduationCap className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-sm text-blue-600 font-medium">Diploma</span>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-600">Precisa de atendimento?</p>
                <button className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium">
                  Ligar para 0800 283 2833
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
