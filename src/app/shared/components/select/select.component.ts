import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ControlValueAccessorDirective } from '@shared/directives/control-value-accessor.directive';
import { ErrorInputComponent } from '../error-input/error-input.component';

@Component({
  selector: 'c-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorInputComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent <T> extends ControlValueAccessorDirective<T> {
  @Input() options: T[] = [];
  @Input()
  public id = '';
  @Input()
  public label = '';
  @Input()
  public isRequired = false;
  @Input()
  public name!: string;
}
