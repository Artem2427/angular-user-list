import { Component, Input, HostBinding, ViewEncapsulation } from '@angular/core';

import { ButtonProps, ColorType, colors } from './type';

@Component({
  selector: 'button[cButton]',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent implements ButtonProps {
  @Input()
  public color: ColorType = colors.primary;

  @HostBinding('class.custom-button')
  _customButton = true;

  @HostBinding('class.custom-button--primary')
  get primary(): boolean {
    return this.color === 'primary'
  }

  @HostBinding('class.custom-button--secondary')
  get secondary(): boolean {
    return this.color === 'secondary'
  }
}
