export enum Role {
  ADMIN = "ADMIN",
  BASIC = "BASIC"
}

export interface User {
  id: number
  email: string
  name?: string
  surname?: string
  patronymic?: string
  birthdate?: Date
  role: Role
}
