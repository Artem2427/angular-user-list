import { Component, OnDestroy, TemplateRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InputComponent } from '@shared/components/input/input.component';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { SelectComponent } from '@shared/components/select/select.component';
import { ControlValueAccessorDirective } from '@shared/directives/control-value-accessor.directive';
import { FormUtilitiesService } from '@shared/services/form-utilities.service';
import { ModalService } from '@shared/services/modal.service';
import { ToastService, toastState } from '@shared/services/toast.service';
import { UserModel, UserService } from '@shared/services/user.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { prepareColumns } from './user-table-config';
import { TableComponent } from '@shared/components/table/table.component';
import { Router, ActivatedRoute } from '@angular/router';

import { UserFormComponent } from '@shared/components/user-form/user-form.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ButtonComponent, UserFormComponent, InputComponent, TableComponent, SelectComponent, ModalComponent, ControlValueAccessorDirective, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnDestroy {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected formUtilities = inject(FormUtilitiesService);


  private toastService = inject(ToastService);

  private modalService = inject(ModalService);
  private userService = inject(UserService);

  formRegister!: FormGroup;

  private usersSubscriptions: Subscription;

  public users: UserModel[] = [];

  public isCreateUser = false;

  public serverError = new BehaviorSubject<{message: string, field: string} | null>(null);

  public userColumnsConfig = prepareColumns();

  ngOnInit(): void {
    this.formRegister = this.formBuilder.group({
      email: [''],
      password: [''],
      age: ['0']
    });

    this.usersSubscriptions = this.userService.users$.subscribe((users) => {
        this.users = users;
    })
  }

  ngOnDestroy(): void {
      this.usersSubscriptions.unsubscribe();
  }

  public handleRedirectToUserPage(userItem: UserModel): void {
    this.router.navigate(['/users', userItem['id']]);
  }

  public handleCreateUser(user: Omit<UserModel, 'id'> & { repeatPassword: string }): void {
    this.userService.create(user).subscribe((result) => {
      if ('error' in result) {
        this.toastService.showToast(toastState.error, result.message);
        this.serverError.next({message: result.message, field: result.field || ''})
      } else {
        this.toastService.showToast(toastState.success, `User (${user.username}) was successfully added!`);
        this.handleClose();
      }
    })
  }

  public handleClose(): void {
    this.isCreateUser = false;
  }

  public handleOpenCreateUser(): void {
    this.isCreateUser = !this.isCreateUser;
  }

  handleButtonClick() {
    this.toastService.showToast(toastState.error, 'Success message');
  }


  public openModal(modalTemplate: TemplateRef<any>) {
    this.modalService
      .open(modalTemplate, { size: 'lg', title: 'Create new user',  })
      .subscribe((action) => {
        console.log('modalAction', action);
      });
  }
}
