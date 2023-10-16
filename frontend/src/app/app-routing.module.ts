import {NgModule} from '@angular/core';
import {RouterModule, Route, Data} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import { HomepageComponent } from './homepage/homepage.component';
import { PageMeta } from './common/page-meta';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';

interface TuamRouteData extends Data {
  meta?: PageMeta;
}

interface TuamRoute extends Route {
  data?: TuamRouteData;
}

const validationRoutes: TuamRoute[] = [
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


const routes: TuamRoute[] = [
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
