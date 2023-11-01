import {NgModule} from '@angular/core';
import {RouterModule, Route, Data} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import { HomepageComponent } from './homepage/homepage.component';
import { PageMeta } from './common/page-meta';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';

interface EuimRouteData extends Data {
  meta?: PageMeta;
}

interface EuimRoute extends Route {
  data?: EuimRouteData;
}

const validationRoutes: EuimRoute[] = [
  {
    path: 'validation',
    component: HomepageComponent,
    data: {
      meta: {
        title: {
          value: 'nontranslatedpagemeta'
        }
      }
    }
  },
  {
    path: 'questionnaire',
    component: QuestionnaireComponent,
    data: {
      meta: {
        title: {
          value: 'nontranslatedpagemeta'
        }
      }
    }
  }
];


const routes: EuimRoute[] = [
  {path: '', redirectTo: 'questionnaire', pathMatch: 'full'},
  ...validationRoutes,
  {path: '**', pathMatch: 'full', redirectTo: 'questionnaire'}
];


@NgModule({
  imports: [BrowserModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
