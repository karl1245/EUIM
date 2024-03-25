import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GlobalConstants } from '../constants/global-constants';

@Component({
  selector: 'app-stakeholderselect',
  templateUrl: './stakeholderselect.component.html',
  styleUrls: ['./stakeholderselect.component.css']
})
export class StakeholderselectComponent {
  @Input() stakeholders: {name: string, color: string}[] = [];

  isToggled: boolean = false;

  toggleMenu(): void {
    this.isToggled = !this.isToggled;
  }

  getStakeholderColorClass(i: number): string {
    let colorIndex = i % GlobalConstants.STAKEHOLDER_COLOR_ORDER.length;
    return GlobalConstants.STAKEHOLDER_COLOR_ORDER[colorIndex];
  }
}