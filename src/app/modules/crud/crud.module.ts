import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CRUDRoutingModule } from './crud-routing.module';
import { ProductComponent } from './components/product/product.component';
import { HomeComponent } from './components/home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DepartmentComponent } from './components/department/department.component';
import { ProductService } from './services/product.service';
import { DepartmentService } from './services/department.service';


@NgModule({
  declarations: [ProductComponent, HomeComponent, DepartmentComponent],
  imports: [
    CommonModule,
    CRUDRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ProductService, DepartmentService]
})
export class CRUDModule { }
