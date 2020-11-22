import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CommunicationComponent } from './components/communication/communication.component';
import { ObservablesSubjectsComponent } from './components/observables-subjects/observables-subjects.component';
import { RxjsComponent } from './components/rxjs/rxjs.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'communication', component: CommunicationComponent },
  { path: 'observables', component: ObservablesSubjectsComponent },
  { path: 'rxjs', component: RxjsComponent },
  { path: 'crud', loadChildren: () => import('./modules/crud/crud.module').then((m) => m.CRUDModule) },
  { path: 'books-and-dvds', loadChildren: () => import('./modules/books-dvds/books-dvds.module').then((m) => m.BooksDvdsModule) },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
