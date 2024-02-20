import {Component} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [HttpClientModule],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('et');
    translate.use('et');
  }
}
