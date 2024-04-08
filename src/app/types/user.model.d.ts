export type UserModel = {
  id: string
  username: string
  first_name: string
  last_name: string
  email: string
  password: string
  user_type: UserType
}

export const userType  = {
  admin: 'admin',
  driver: 'driver'
} as const

export type UserType = ValueOf<typeof userType>
