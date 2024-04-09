import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ToastService, toastState } from '@shared/services/toast.service';
import { UserModel, UserService } from '@shared/services/user.service';
import { UserFormComponent } from '@shared/components/user-form/user-form.component';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public selectedUser = new BehaviorSubject<UserModel | null>(null);

  public serverError = new BehaviorSubject<{message: string, field: string} | null>(null);

  private toastService = inject(ToastService);
  private userService = inject(UserService);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if ('userId' in params) {
        this.userService.getUserById(params['userId']).subscribe(user => {
          if (user) {
            this.selectedUser.next(user);
          } else {
            this.handleNavigateToUsers();
          }
        });
      }
    })
  }

  public handleSaveUser(user: Omit<UserModel, 'id'> & { repeatPassword: string }): void {
    const currentUser = this.selectedUser.getValue();
    if (currentUser) {
      this.userService.update(currentUser.id, user).subscribe((result) => {
        if ('error' in result) {
          this.toastService.showToast(toastState.error, result.message);
          this.serverError.next({message: result.message, field: result.field || ''})
        } else {
          this.toastService.showToast(toastState.success, `User (${user.username}) was successfully updated!`);
        }
      })
    }

  }

  public handleDeleteUser(user: UserModel): void {
    this.userService.delete(user.id).subscribe((value) => {
      if (value) {
        this.toastService.showToast(toastState.success, `User (${user.username}) was successfully deleted!`);
        this.selectedUser.next(null);
        this.handleNavigateToUsers();
      } else {
        this.toastService.showToast(toastState.error, 'Something go wrong!');
      }
    })
  }

  public handleNavigateToUsers(): void {
    this.router.navigate(['/users'])
  }
}
