import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserModel, userType } from '@shared/services/user.service';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';
import { SelectComponent } from '../select/select.component';
import { FormUtilitiesService } from '@shared/services/form-utilities.service';
import { ControlValueAccessorDirective } from '@shared/directives/control-value-accessor.directive';
import { CommonModule } from '@angular/common';
import { ModalService } from '@shared/services/modal.service';
import { confirmPasswordValidator } from './confirm-password.validator'

@Component({
  selector: 'c-user-form',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputComponent, SelectComponent, ControlValueAccessorDirective, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnChanges {
  @Input() user: UserModel | null = null;

  @Input() serverError: {message: string, field: string} | null = null;

  @Output() onCreateOrSave = new EventEmitter<Omit<UserModel, 'id'> & {repeatPassword: string}>();
  @Output() onDelete = new EventEmitter<UserModel>()

  @Output() onClose = new EventEmitter<void>();

  userForm: FormGroup;

  public modalService = inject(ModalService);

  public userTypeOptions = [
    {
      value: userType.admin, label: 'Admin'
    },
    {
      value: userType.driver, label: 'Driver'
    }
  ]

  private formBuilder = inject(FormBuilder);
  protected formUtilities = inject(FormUtilitiesService);

  public ngOnInit(): void {
    this.initForm();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
        this.initForm();
    }

    if (changes['serverError'] && this.serverError) {
      const control = this.userForm.get(this.serverError.field);

      if (control) {
        control.setErrors({ serverError: true, message: this.serverError.message });
      }
    }
  }


  public ngOnDestroy(): void {
    this.userForm.reset();
  }

  public handleClose(): void {
    this.onClose.emit();
  }

  public handleSubmit(): void {
      this.onCreateOrSave.emit(this.userForm.value);
  }

  public handleDelete(): void {
    if (this.user) {
      this.onDelete.emit(this.user);
    }
  }

  private initForm(): void {
    this.userForm = this.formBuilder.group({
      username: [this.user?.username || '', Validators.required],
      first_name: [this.user?.first_name || '', Validators.required],
      last_name: [this.user?.last_name || '', Validators.required],
      email: [this.user?.email || ''],
      password: [this.user?.password || '', [Validators.required, Validators.minLength(8)]],
      user_type: [this.user?.user_type || '', Validators.required],
      repeatPassword: [this.user?.password || '', Validators.required],
    }, { validators: confirmPasswordValidator });
  }

}
