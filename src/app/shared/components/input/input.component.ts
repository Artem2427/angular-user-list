import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ErrorInputComponent } from '../error-input/error-input.component';
import { InputType } from './type';
import { ControlValueAccessorDirective } from '@shared/directives/control-value-accessor.directive';

@Component({
  selector: 'c-input',
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
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent<T> extends ControlValueAccessorDirective<T> implements InputType {
  @Input()
  public id = '';
  @Input()
  public label = '';
  @Input()
  public isRequired = false;
  @Input()
  public placeholder?: string;
  @Input()
  public value?: string | number;
  @Input()
  public customErrorMessages: Record<string, string> = {};
  @Input()
  public name!: string;
  @Input()
  public emailIcon: boolean = false;
}
