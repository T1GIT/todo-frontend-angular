
export type LoginForm = {
  email: string
  psw: string
}

export type RegisterForm = LoginForm & {
  name?: string,
  surname?: string,
  patronymic?: string,
  birthdate?: Date
}

export type JwtPayload = {
  iat: number
  exp: number
  userId: number
}

export type JwtResponse = {
  jwt: string
}
