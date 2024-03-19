import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ValidationValue, ValidationValue2LabelMapping } from '../validation/model/validation-value';

@Component({
  selector: 'app-stakeholder',
  templateUrl: './stakeholder.component.html',
  styleUrls: ['./stakeholder.component.css']
})
export class StakeholderComponent {
  @Input() stakeholder: any;
  @Input() color: string;

  isToggled: boolean = false;

  toggleMenu(): void {
    this.isToggled = !this.isToggled;
  }
}