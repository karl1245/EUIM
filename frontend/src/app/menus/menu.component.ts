import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Input() icon: string;
  @Input() actions: {name: string, icon: string, onClick: any}[] = [];

  isToggled: boolean = false;

  toggleMenu(): void {
    this.isToggled = !this.isToggled;
  }
}