import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksDvdsRoutingModule } from './books-dvds-routing.module';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BookComponent } from './book/book.component';
import { DvdComponent } from './dvd/dvd.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BookComponent, DvdComponent, PageNotFoundComponent],
  entryComponents: [DvdComponent],
  imports: [
    CommonModule,
    BooksDvdsRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
  ],
})
export class BooksDvdsModule {}
