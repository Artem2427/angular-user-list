import { Component, TemplateRef, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InputComponent } from '@shared/components/input/input.component';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { SelectComponent } from '@shared/components/select/select.component';
import { ControlValueAccessorDirective } from '@shared/directives/control-value-accessor.directive';
import { FormUtilitiesService } from '@shared/services/form-utilities.service';
import { ModalService } from '@shared/services/modal.service';
import { ToastService, toastState } from '@shared/services/toast.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ButtonComponent, InputComponent, SelectComponent, ModalComponent, ControlValueAccessorDirective, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  private formBuilder = inject(FormBuilder);
  protected formUtilities = inject(FormUtilitiesService);

  private toastService = inject(ToastService);

  private modalService = inject(ModalService)

  formRegister!: FormGroup;

  ngOnInit(): void {
    this.formRegister = this.formBuilder.group({
      email: [''],
      password: [''],
      age: ['0']
    });
  }

  handleSubmit() {
    console.log(this.formRegister.value, 'form value')
  }

  handleButtonClick() {
    this.toastService.showToast(toastState.error, 'Success message');
  }


  openModal(modalTemplate: TemplateRef<any>) {
    this.modalService
      .open(modalTemplate, { size: 'lg', title: 'Foo' })
      .subscribe((action) => {
        console.log('modalAction', action);
      });
  }
}
