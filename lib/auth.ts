import type { User, Session, CreateUserData } from "@/types/auth"

const DEFAULT_PBKDF2_ITERATIONS = 100_000

// ──────────────────────────────────────────────────────────────
// Utilidades de segurança
// ──────────────────────────────────────────────────────────────

// Gera salt aleatório (16 bytes) em Base64
function generateSalt(): string {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  return btoa(String.fromCharCode(...array))
}

// Hash seguro de senha: PBKDF2-SHA256 (256 bits) + salt (Base64)
async function hashPassword(
  password: string,
  saltB64: string,
  iterations: number = DEFAULT_PBKDF2_ITERATIONS,
): Promise<string> {
  const enc = new TextEncoder()
  const salt = Uint8Array.from(atob(saltB64), (c) => c.charCodeAt(0))
  const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"])
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt, iterations }, keyMaterial, 256)
  const hashArray = new Uint8Array(bits)
  return btoa(String.fromCharCode(...hashArray))
}

// ──────────────────────────────────────────────────────────────
// Regras de RA e validações
// ──────────────────────────────────────────────────────────────

function generateRA(): string {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 999_999)
    .toString()
    .padStart(6, "0")
  return `RA-${year}-${random}`
}

function generateUniqueRA(users: User[]): string {
  while (true) {
    const ra = generateRA()
    if (!users.some((u) => u.ra === ra)) return ra
  }
}

function isEmailUnique(email: string, excludeId?: string): boolean {
  const users = getUsers()
  const e = email.trim().toLowerCase()
  return !users.some((user) => user.email === e && user.id !== excludeId)
}

// ──────────────────────────────────────────────────────────────
// Persistência local (localStorage)
// ──────────────────────────────────────────────────────────────

function getUsers(): User[] {
  const usersData = localStorage.getItem("portal.users")
  return usersData ? (JSON.parse(usersData) as User[]) : []
}

function saveUsers(users: User[]): void {
  localStorage.setItem("portal.users", JSON.stringify(users))
}

function getSession(): Session | null {
  const s = localStorage.getItem("portal.session")
  return s ? (JSON.parse(s) as Session) : null
}

function saveSession(session: Session): void {
  localStorage.setItem("portal.session", JSON.stringify(session))
}

function removeSession(): void {
  localStorage.removeItem("portal.session")
}

// ──────────────────────────────────────────────────────────────
// Imagem 3×4 (redimensionar e recortar para proporção 3:4)
// ──────────────────────────────────────────────────────────────

function resizeAndCropImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) {
      reject(new Error("Canvas context not available"))
      return
    }

    img.onload = () => {
      const targetWidth = 240
      const targetHeight = 320
      const targetRatio = 3 / 4

      // Cálculo do crop centralizado
      let sourceWidth = img.width
      let sourceHeight = img.height
      let sourceX = 0
      let sourceY = 0

      const sourceRatio = sourceWidth / sourceHeight

      if (sourceRatio > targetRatio) {
        // Imagem mais larga que o alvo → cortar nas laterais
        sourceWidth = sourceHeight * targetRatio
        sourceX = (img.width - sourceWidth) / 2
      } else {
        // Imagem mais alta que o alvo → cortar em cima/baixo
        sourceHeight = sourceWidth / targetRatio
        sourceY = (img.height - sourceHeight) / 2
      }

      // Canvas final
      canvas.width = targetWidth
      canvas.height = targetHeight

      // Desenhar recorte redimensionado
      ctx.drawImage(
        img,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        targetWidth,
        targetHeight,
      )

      // Exportar como DataURL JPEG (qualidade ~0.8)
      resolve(canvas.toDataURL("image/jpeg", 0.8))
    }

    img.onerror = () => reject(new Error("Failed to load image"))
    img.src = URL.createObjectURL(file)
  })
}

// ──────────────────────────────────────────────────────────────
// API pública (cadastro, login, sessão)
// ──────────────────────────────────────────────────────────────

export async function registerUser(
  data: CreateUserData,
): Promise<{ success: boolean; message: string; user?: User }> {
  try {
    // Validações básicas
    const nameParts = data.nomeCompleto
      .trim()
      .split(" ")
      .filter((p) => p.length > 0)
    if (nameParts.length < 2) {
      return { success: false, message: "Nome deve conter pelo menos 2 palavras" }
    }

    if (!isEmailUnique(data.email)) {
      return { success: false, message: "Este email já está cadastrado" }
    }

    if (data.senha.length < 8) {
      return { success: false, message: "Senha deve ter pelo menos 8 caracteres" }
    }

    if (data.senha !== data.confirmarSenha) {
      return { success: false, message: "Senhas não coincidem" }
    }

    if (!data.curso) {
      return { success: false, message: "Curso é obrigatório" }
    }

    if (!data.foto) {
      return { success: false, message: "Foto 3x4 é obrigatória" }
    }

    // Foto 3×4 processada
    const fotoDataUrl = await resizeAndCropImage(data.foto)

    // Salt + hash PBKDF2
    const saltB64 = generateSalt()
    const iterations = DEFAULT_PBKDF2_ITERATIONS
    const hashB64 = await hashPassword(data.senha, saltB64, iterations)

    // Criar usuário
    const users = getUsers()
    const newUser: User = {
      id: Date.now().toString(),
      nomeCompleto: data.nomeCompleto.trim(),
      email: data.email.toLowerCase().trim(),
      curso: data.curso,
      ra: generateUniqueRA(users),
      fotoDataUrl,
      saltB64,
      hashB64,
      iterations,
      createdAt: new Date().toISOString(),
      lastLoginAt: null,
    }

    users.push(newUser)
    saveUsers(users)

    return { success: true, message: "Usuário cadastrado com sucesso!", user: newUser }
  } catch (err) {
    return { success: false, message: "Erro ao processar cadastro" }
  }
}

export async function loginUser(
  email: string,
  password: string,
): Promise<{ success: boolean; message: string; user?: User }> {
  try {
    const users = getUsers()
    const user = users.find((u) => u.email === email.toLowerCase().trim())

    if (!user) {
      return { success: false, message: "Email ou senha incorretos" }
    }

    // Verificar senha com as iterações do usuário (fallback para default)
    const hash = await hashPassword(password, user.saltB64, (user as any).iterations ?? DEFAULT_PBKDF2_ITERATIONS)
    if (hash !== user.hashB64) {
      return { success: false, message: "Email ou senha incorretos" }
    }

    // Atualizar lastLoginAt
    user.lastLoginAt = new Date().toISOString()
    saveUsers(users)

    // Criar sessão
    const session: Session = {
      userId: user.id,
      email: user.email,
      loginAt: new Date().toISOString(),
    }
    saveSession(session)

    return { success: true, message: "Login realizado com sucesso!", user }
  } catch {
    return { success: false, message: "Erro ao fazer login" }
  }
}

export function getCurrentUser(): User | null {
  const session = getSession()
  if (!session) return null
  const users = getUsers()
  return users.find((u) => u.id === session.userId) || null
}

export function isAuthenticated(): boolean {
  return getSession() !== null
}

export function logout(): void {
  removeSession()
}

export function validateSession(): boolean {
  const session = getSession()
  if (!session) return false
  const user = getCurrentUser()
  return user !== null
}
