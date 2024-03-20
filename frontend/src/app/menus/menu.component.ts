import { Component, HostListener, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Input() icon: string;
  @Input() actions: {name: string, icon: string, onClick: any}[] = [];
  @Input() stakeholders: any;

  isToggled: boolean = false;
  stakeholderListToggled: boolean = false;
  constructor(private elementRef: ElementRef) {}

  toggleMenu(): void {
    this.isToggled = !this.isToggled;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      // Clicked outside of the menu
      this.isToggled = false;
      this.stakeholderListToggled = false;
    } else {
      // Clicked inside the menu, check if it's the button
      const clickedElement = event.target as HTMLElement;
      if (clickedElement.classList.contains('stakeholderList')) {
        // Clicked on a button with the specified class
        this.stakeholderListToggled = true;
      }
    }
  }
}
