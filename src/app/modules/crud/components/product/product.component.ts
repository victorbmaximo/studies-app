import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { Product } from '../../models/product.model';
import { DepartmentService } from '../../services/department.service';
import { Department } from '../../models/department.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  constructor(
    private prodService: ProductService,
    private fb: FormBuilder,
    private depService: DepartmentService,
    private snackbar: MatSnackBar
  ) { }

  productForm = this.fb.group({
    _id: [null],
    name: ['', [Validators.required]],
    stock: ['', [Validators.required, Validators.min(0)]],
    price: ['', [Validators.required, Validators.min(0)]],
    departments: [[], [Validators.required]],
  });

  @ViewChild('form') form: NgForm;

  products: Product[] = [];
  departments: Department[] = [];

  private unsubscribe$: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.getDepartments();
    this.getProducts();
  }

  getProducts() {
    this.prodService.get()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => this.products = res);
  }

  getDepartments() {
    this.depService.get()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => { this.departments = res; });
  }

  save() {
    const data = this.productForm.value;
    console.log(data);

    if (data._id != null) {
      this.prodService.update(data)
        .subscribe();
    } else {
      this.prodService.add(data)
        .subscribe();
    }

    this.resetForm();
  }

  delete(prod: Product) {
    this.prodService.del(prod)
      .subscribe(
        () => this.notify('Deleted!'),
        (err) => console.log(err)
      );
  }

  edit(prod: Product) {
    this.productForm.setValue(prod);
  }

  notify(msg: string) {
    this.snackbar.open(msg, 'OK', { duration: 3000 });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  resetForm() {
    // this.productForm.reset();
    this.form.resetForm();
  }

}
