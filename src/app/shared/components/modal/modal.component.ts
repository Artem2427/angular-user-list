import { Component, ElementRef, EventEmitter, Input, Output,ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ButtonComponent, UserFormComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() size? = 'md';
  @Input() title? = 'Modal title';

  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();

  constructor(private elementRef: ElementRef) {}

  close(): void {
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }

  submit(): void {
    this.elementRef.nativeElement.remove();
    this.submitEvent.emit();
  }
}
