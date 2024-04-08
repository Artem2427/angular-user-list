import { Injectable, inject } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import isEmail from 'validator/lib/isEmail';

import { PASSWORD_REGEX } from '@utils/regex'

import { UtilsService } from './utils.service'

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

export type UserError = {
  error: boolean;
  message: string;
  field?: string;
};


@Injectable({
  providedIn: 'root'
})
export class UserService {
    private usersSubject = new BehaviorSubject<UserModel[]>([]);
    public users$: Observable<UserModel[]> = this.usersSubject.asObservable();

    // private users: UserModel[] = [];

    private utilsService = inject(UtilsService);

    // public create(user: Omit<UserModel, 'id'>): UserModel | UserError {
    //   if (this.isUsernameTaken(user.username)) {
    //     return { error: true, message: 'Username is already taken' };
    //   }
    //   const newUser: UserModel = { ...user, id: this.utilsService.generateUniqueId() };
    //   this.users.push(newUser);
    //   return newUser;
    // }

    public create(user: Omit<UserModel, 'id'> & { repeatPassword: string } ): Observable<UserModel | UserError> {
      if (!user.username || !user.first_name || !user.last_name || !user.email || !user.password || !user.user_type) {
        return new Observable(observer => observer.next({ error: true, message: 'All fields are required!' }));
      }


      if (this.isUsernameTaken(user.username)) {
        return new Observable(observer => observer.next({ error: true, message: 'Username must be unique', field: 'username' }));
      }

      if (this.isValidEmail(user.email)) {
        return new Observable(observer => observer.next({ error: true, message: 'Enter correct email format' }));
      }

      if (user.password && !this.isValidPassword(user.password)) {
        return new Observable(observer => observer.next({ error: true, message: 'Password must be at least 8 characters long, include a number and a letter' }));
      }

      if (user.password !== user.repeatPassword) {
        return new Observable(observer => observer.next({ error: true, message: `The passwords don't match` }));
      }

      const newUser: UserModel = { ...user, id: this.utilsService.generateUniqueId() };
      this.usersSubject.next([...this.usersSubject.getValue(), newUser]);
      return new Observable(observer => observer.next(newUser));
    }

    // public update(id: string, userData: Partial<Omit<UserModel, 'id'>>): UserModel | UserError {
    //   const userIndex = this.users.findIndex(user => user.id === id);
    //   if (userIndex === -1) {
    //     return { error: true, message: 'User not found' };
    //   }
    //   // Проверяем, не пытаемся ли мы изменить имя на уже существующее у другого пользователя
    //   if ('username' in userData && this.isUsernameTaken(userData.username!, id)) {
    //     return { error: true, message: 'Username is already taken' };
    //   }
    //   this.users[userIndex] = { ...this.users[userIndex], ...userData };
    //   return this.users[userIndex];
    // }

    public update(id: string, userData: Partial<Omit<UserModel, 'id'>> & { repeatPassword: string }): Observable<UserModel | UserError> {
      const users = this.usersSubject.getValue();
      const userIndex = users.findIndex(user => user.id === id);

      if (userIndex === -1) {
        return new Observable(observer => observer.next({ error: true, message: 'User not found' }));
      }

      if (userData.username && this.isUsernameTaken(userData.username, id)) {
        return new Observable(observer => observer.next({ error: true, message: 'Username must be unique' }));
      }

      const updatedUser = { ...users[userIndex], ...userData };
      this.usersSubject.next([
        ...users.slice(0, userIndex),
        updatedUser,
        ...users.slice(userIndex + 1),
      ]);
      return new Observable(observer => observer.next(updatedUser));
    }


    // public delete(id: string): boolean | UserError {
    //   const userIndex = this.users.findIndex(user => user.id === id);
    //   if (userIndex === -1) {
    //     return { error: true, message: 'User not found' };
    //   }
    //   this.users.splice(userIndex, 1);
    //   return true;
    // }

    public delete(id: string): Observable<boolean | UserError> {
      const users = this.usersSubject.getValue();
      const userIndex = users.findIndex(user => user.id === id);

      if (userIndex === -1) {
        return new Observable(observer => observer.next({ error: true, message: 'User not found' }));
      }

      this.usersSubject.next([...users.slice(0, userIndex), ...users.slice(userIndex + 1)]);
      return new Observable(observer => observer.next(true));
    }

    public getUserById(id: string): Observable<UserModel | undefined> {
      return this.users$.pipe(
        map(users => users.find(user => user.id === id))
      );
    }

    // public getUsers(): UserModel[] {
    //   return this.users;
    // }

    // private isUsernameTaken(username: string, userIdToExclude?: string): boolean {
    //   return this.users.some(user => user.username === username && user.id !== userIdToExclude);
    // }
    private isUsernameTaken(username: string, userIdToExclude?: string): boolean {
      return this.usersSubject.getValue().some(user => user.username === username && user.id !== userIdToExclude);
    }

    private isValidPassword(password: string): boolean {
      return PASSWORD_REGEX.test(password);
    }

    private isValidEmail(email: string): boolean {
      return isEmail(email);
    }
}
