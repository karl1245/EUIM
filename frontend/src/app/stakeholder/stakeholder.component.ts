import { Component, Input, Output, EventEmitter } from '@angular/core';

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