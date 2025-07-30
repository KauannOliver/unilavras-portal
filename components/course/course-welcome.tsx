"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { courseTexts } from "@/lib/course-texts"

export function CourseWelcome() {
  const { user } = useAuth()

  if (!user) return null

  const texts = courseTexts[user.curso]

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{texts.saudacao}</h1>
      <p className="text-gray-600">Olá, {user.nomeCompleto}! Acesse todas as informações acadêmicas em um só lugar</p>
      <div className="mt-4 p-4 bg-teal-50 rounded-lg border border-teal-200">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-20 rounded overflow-hidden border-2 border-teal-300">
            <img src={user.fotoDataUrl || "/placeholder.svg"} alt="Sua foto" className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-semibold text-teal-800">{user.nomeCompleto}</h3>
            <p className="text-sm text-teal-700">RA: {user.ra}</p>
            <p className="text-sm text-teal-700">Curso: {user.curso}</p>
            <p className="text-sm text-teal-700">Email: {user.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
