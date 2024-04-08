import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

export const toastState = {
  success: 'success-toast',
  error: 'error-toast',
} as const;

export type ToastType = ValueOf<typeof toastState>

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public showsToast$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public toastMessage$: BehaviorSubject<string> = new BehaviorSubject<string>('Default toast message');
  public toastState$: BehaviorSubject<string> = new BehaviorSubject<ToastType>(toastState.success);
  constructor() { }

  showToast(toastState: ToastType, toastMessage: string): void {
    this.toastState$.next(toastState);
    this.toastMessage$.next(toastMessage);
    this.showsToast$.next(true);
  }

  dismissToast(): void {
    this.showsToast$.next(false);
  }
}
