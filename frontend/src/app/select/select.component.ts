import { Component, Input, Output, EventEmitter, HostListener, ElementRef, OnInit } from '@angular/core';
import { ValidationValue, ValidationValue2LabelMapping } from '../validation/model/validation-value';
import { TranslateService } from '@ngx-translate/core';
import { GlobalConstants } from '../constants/global-constants';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  validationValue2LabelMapping = ValidationValue2LabelMapping;
  validationValues = Object.values(ValidationValue);
  selectedValue: ValidationValue;
  isToggled: boolean = false;
  storageKey: string;

  @Input() instanceId: string; // Unique identifier for each instance
  @Output() selectionChange: EventEmitter<ValidationValue> = new EventEmitter<ValidationValue>();

  constructor(
    private elementRef: ElementRef,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.storageKey = `selectedValue_${this.instanceId}`;
    const storedValue = localStorage.getItem(this.storageKey);
    if (storedValue) {
      this.selectedValue = JSON.parse(storedValue);
    }
  }

  toggleSelect(): void {
    this.isToggled = !this.isToggled;
  }

  customSelectionValue(): string {
    if (!Object.keys(this.validationValue2LabelMapping).includes(this.selectedValue)){
      if (this.translateService.currentLang === GlobalConstants.ET) {
        return "Vali";
      }
      return "Select";
    }
    return 'select.' + this.validationValue2LabelMapping[this.selectedValue];
  }

  onValueChange(validationValue: ValidationValue): void {
    this.selectedValue = validationValue;
    localStorage.setItem(this.storageKey, JSON.stringify(validationValue));
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
