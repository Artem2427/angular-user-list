import { Injectable } from '@angular/core';

@Injectable({ providedIn:  'root'})
export class PersistanceService {
  public set<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  }

  public get<T>(key: string): T | null {
    const data: unknown = localStorage.getItem(key);

    if (!data) return null;

    let obj: T | null;
    try {
      obj = JSON.parse(data.toString()) as T;
    } catch (error) {
      obj = null;
    }

    return obj;
  }

  public remove(key: string) {
    localStorage.removeItem(key);
  }

  public clear() {
    localStorage.clear();
  }
}
