import { UserModel } from '@shared/services/user.service'
import { v4 as uuidv4 } from 'uuid'

export const defaultUsers: UserModel[] = [
  {
    id: uuidv4(),
    username: 'Artem41',
    first_name: 'Artem',
    last_name: 'Danko',
    email: 'q2qwe@gmail.com',
    password: '11111wsx',
    user_type: 'driver',
  },
  {
    id: uuidv4(),
    username: 'Ivanov',
    first_name: 'Ivan',
    last_name: 'Dank',
    email: 'q2az@gmail.com',
    password: '111111qaz',
    user_type: 'admin',
  },
]
