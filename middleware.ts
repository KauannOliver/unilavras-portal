// middleware.ts — NO-OP para autenticação via localStorage
import { NextResponse } from "next/server"

// Não faça nenhuma checagem de autenticação aqui.
// Toda a proteção fica no cliente (AuthProvider).
export function middleware() {
  return NextResponse.next()
}

// Sem matcher para não executar em nenhuma rota.
// (Se você já tinha um matcher, remova.)
export const config = {
  matcher: [],
}
