import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './template/header/header.component';
import { FooterComponent } from './template/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { CommunicationComponent } from './components/communication/communication.component';
import { ChildComponent } from './components/communication/child/child.component';
import { ObservablesSubjectsComponent } from './components/observables-subjects/observables-subjects.component';
import { SubjectsComponent } from './components/observables-subjects/subjects/subjects.component';
import { RxjsComponent } from './components/rxjs/rxjs.component';
import { BasicCreationComponent } from './components/rxjs/basic-creation/basic-creation.component';
import { OperatorsComponent } from './components/rxjs/operators/operators.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CommunicationComponent,
    ChildComponent,
    ObservablesSubjectsComponent,
    SubjectsComponent,
    RxjsComponent,
    BasicCreationComponent,
    OperatorsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
