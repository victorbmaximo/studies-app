import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

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
import { PanelComponent } from './components/home/panel/panel.component';
import { AccordionComponent } from './components/home/accordion/accordion.component';

registerLocaleData(localePt);

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
    PanelComponent,
    AccordionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
