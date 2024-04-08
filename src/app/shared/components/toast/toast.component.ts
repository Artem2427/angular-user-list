import { Component, OnDestroy, inject } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ToastService } from '@shared/services/toast.service';

import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'c-toast',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('toastTrigger', [
      state('close', style({ transform: 'translateY(-300%)' })),
      state('open', style({ transform: 'translateY(0%)' })),
      transition('open <=> close', [
        animate('300ms ease-in-out')
      ])
    ])
  ],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnDestroy {
  public toastClass!: string[];
  public toastMessage!: string;
  public showsToast!: boolean;

  public toastService = inject(ToastService);

  public timeout: ReturnType<typeof setTimeout> | null = null;

  private subscription: Subscription;

  constructor() {
    this.subscription = this.toastService.showsToast$.subscribe((value) => {
      if (value) {
        this.timeout = setTimeout(() => {
          this.toastService.dismissToast();
        }, 4000);
      }
    })
  }

  ngOnDestroy(): void {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.subscription.unsubscribe();
  }
}


// import { Component, OnInit } from '@angular/core';
// import { animate, state, style, transition, trigger } from '@angular/animations';

// import { ToastService } from './../../../services/toast.service';

// @Component({
//   selector: 'app-toast',
//   templateUrl: './toast.component.html',
//   styleUrls: ['./toast.component.scss'],
//   animations: [
//     trigger('toastTrigger', [
//       state('open', style({ transform: 'translateY(0%)' })),
//       state('close', style({ transform: 'translateY(-200%)' })),
//       transition('open <=> close', [
//         animate('300ms ease-in-out')
//       ])
//     ])
//   ]
// })
// export class ToastComponent implements OnInit {
//   toastClass!: string[];
//   toastMessage!: string;
//   showsToast!: boolean;

//   constructor(public toast: ToastService) { }

//   ngOnInit(): void {
//   }

//   dismiss(): void {
//     this.toast.dismissToast();
//   }

// }
