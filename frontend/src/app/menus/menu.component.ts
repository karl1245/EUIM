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
  @Input() toggle: string;
  @Input() isStakeholdersCell:boolean;

  isToggled: boolean = false;
  stakeholderListToggled: boolean = false;
  colorListToggled:boolean = false;
  constructor(private elementRef: ElementRef) {}

  toggleMenu(component: string): void {
    if (component == "Menu"){
      if(this.stakeholderListToggled == true){
        this.isToggled = false;
        this.stakeholderListToggled = !this.stakeholderListToggled;
      }
      else{
        this.isToggled = !this.isToggled;
      }
    }
    else if (component == "Stakeholders"){
      this.isToggled = false;
      this.stakeholderListToggled = !this.stakeholderListToggled;
    }
    else if (component == "Colors"){
      this.colorListToggled = !this.colorListToggled;
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      // Clicked outside of the menu
      this.isToggled = false;
    }
  }
}
