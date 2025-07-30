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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Mail, Lock, Upload, ArrowLeft, GraduationCap } from "lucide-react"
import { registerUser } from "@/lib/auth"
import type { CreateUserData } from "@/types/auth"

const cursos = ["Arquitetura", "Direito", "Enfermagem", "Engenharia Civil", "Odontologia"]

export default function RegistroPage() {
  const [formData, setFormData] = useState<CreateUserData>({
    nomeCompleto: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    curso: "",
    foto: null,
  })
  const [previewFoto, setPreviewFoto] = useState<string | null>(null)
  const [erro, setErro] = useState("")
  const [carregando, setCarregando] = useState(false)
  const router = useRouter()

  const handleInputChange = (field: keyof CreateUserData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErro("")
  }

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErro("A foto deve ter no máximo 2MB")
        return
      }

      if (!file.type.startsWith("image/")) {
        setErro("Por favor, selecione uma imagem válida")
        return
      }

      setFormData((prev) => ({ ...prev, foto: file }))
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewFoto(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      setErro("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCarregando(true)
    setErro("")

    const result = await registerUser(formData)

    if (result.success) {
      alert(result.message)
      router.push("/login")
    } else {
      setErro(result.message)
    }

    setCarregando(false)
  }

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-white shadow-lg">
        <CardContent className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Login
              </Button>
            </Link>
          </div>

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
            <p className="text-sm text-gray-600 mt-1">Cadastro de Novo Estudante</p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome Completo */}
            <div className="space-y-2">
              <Label htmlFor="nomeCompleto" className="text-sm font-medium text-gray-700">
                Nome Completo *
              </Label>
              <div className="relative">
                <Input
                  id="nomeCompleto"
                  type="text"
                  value={formData.nomeCompleto}
                  onChange={(e) => handleInputChange("nomeCompleto", e.target.value)}
                  placeholder="Digite seu nome completo"
                  className="pl-4 pr-10 py-3 bg-gray-50 border-gray-200 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
                <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                E-mail *
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  className="pl-4 pr-10 py-3 bg-gray-50 border-gray-200 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Curso */}
            <div className="space-y-2">
              <Label htmlFor="curso" className="text-sm font-medium text-gray-700">
                Curso *
              </Label>
              <Select value={formData.curso} onValueChange={(value) => handleInputChange("curso", value)}>
                <SelectTrigger className="py-3 bg-gray-50 border-gray-200 rounded-lg focus:bg-white focus:border-blue-500">
                  <SelectValue placeholder="Selecione seu curso" />
                </SelectTrigger>
                <SelectContent>
                  {cursos.map((curso) => (
                    <SelectItem key={curso} value={curso}>
                      {curso}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <Label htmlFor="senha" className="text-sm font-medium text-gray-700">
                Senha *
              </Label>
              <div className="relative">
                <Input
                  id="senha"
                  type="password"
                  value={formData.senha}
                  onChange={(e) => handleInputChange("senha", e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  className="pl-4 pr-10 py-3 bg-gray-50 border-gray-200 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Confirmar Senha */}
            <div className="space-y-2">
              <Label htmlFor="confirmarSenha" className="text-sm font-medium text-gray-700">
                Confirmar Senha *
              </Label>
              <div className="relative">
                <Input
                  id="confirmarSenha"
                  type="password"
                  value={formData.confirmarSenha}
                  onChange={(e) => handleInputChange("confirmarSenha", e.target.value)}
                  placeholder="Digite a senha novamente"
                  className="pl-4 pr-10 py-3 bg-gray-50 border-gray-200 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Upload de Foto */}
            <div className="space-y-2">
              <Label htmlFor="foto" className="text-sm font-medium text-gray-700">
                Foto 3x4 *
              </Label>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Input
                      id="foto"
                      type="file"
                      accept="image/*"
                      onChange={handleFotoChange}
                      className="hidden"
                      required
                    />
                    <Label
                      htmlFor="foto"
                      className="flex items-center justify-center w-full py-3 px-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <Upload className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        {formData.foto ? formData.foto.name : "Clique para fazer upload"}
                      </span>
                    </Label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG ou GIF. Máximo 2MB.</p>
                </div>
                {previewFoto && (
                  <div className="w-20 h-24 border-2 border-gray-200 rounded overflow-hidden">
                    <img src={previewFoto || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            {/* Mensagem de erro */}
            {erro && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200">
                {erro}
              </div>
            )}

            {/* Botão Cadastrar */}
            <Button
              type="submit"
              disabled={carregando}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-3 rounded-lg font-medium text-base transition-colors"
            >
              {carregando ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </form>

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
