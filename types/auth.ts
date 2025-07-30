export interface User {
  id: string
  nomeCompleto: string
  email: string
  curso: string
  ra: string
  fotoDataUrl: string
  saltB64: string
  hashB64: string
  iterations: number
  createdAt: string
  lastLoginAt: string | null
}

export interface Session {
  userId: string
  email: string
  loginAt: string
}

export interface CreateUserData {
  nomeCompleto: string
  email: string
  senha: string
  confirmarSenha: string
  curso: string
  foto: File | null
}

export interface CourseTexts {
  [key: string]: {
    saudacao: string
    tituloBoletim: string
    descricaoCurso: string
    coordenador: string
    duracao: string
    modalidade: string
  }
}
