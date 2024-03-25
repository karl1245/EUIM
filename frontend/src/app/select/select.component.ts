import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { ValidationValue, ValidationValue2LabelMapping } from '../validation/model/validation-value';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {
  validationValue2LabelMapping = ValidationValue2LabelMapping;
  validationValues = Object.values(ValidationValue);
  selectedValue: ValidationValue;
  isToggled: boolean = false;

  @Output() selectionChange: EventEmitter<ValidationValue> = new EventEmitter<ValidationValue>();

  constructor(private elementRef: ElementRef) {}

  toggleSelect(): void {
    this.isToggled = !this.isToggled;
  }

  customSelectionValue(): string {
    if (!Object.keys(this.validationValue2LabelMapping).includes(this.selectedValue)){
      return "Vali";
    }
    return 'select.' + this.validationValue2LabelMapping[this.selectedValue];
  }

  onValueChange(validationValue: ValidationValue): void {
    this.selectedValue = validationValue;
    this.selectionChange.emit(validationValue)
    this.toggleSelect();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      // Clicked outside of the menu
      this.isToggled = false;
    }
  }
}