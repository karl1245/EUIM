import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  languages = ['ET', 'EN']

  constructor(private translate: TranslateService) {}

  questionnairePath = "/questionnaire"
  validationPath = "/validation"

  get currentLang(): string {
    return this.translate.currentLang.toUpperCase();
  }

  setLang(language: string): void {
    this.translate.use(language.toLowerCase());
  }

  isLanguageSelected(language: string): boolean {
    return this.currentLang == language;
  }
}
