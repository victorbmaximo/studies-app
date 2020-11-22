import { Component, OnInit, OnDestroy } from '@angular/core';
import { Department } from '../../models/department.model';
import { DepartmentService } from '../../services/department.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit, OnDestroy {

  constructor(
    private depService: DepartmentService,
    private snackBar: MatSnackBar
  ) { }

  depName: string;
  departments: Department[] = [];
  depEdit: Department = null;

  private unsubscribe$: Subject<any> = new Subject();

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments() {
    this.depService.get()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (deps) => {
          this.departments = deps;
        }
      );
  }

  save() {
    if (this.depEdit) {
      this.depService.update({ name: this.depName, _id: this.depEdit._id })
        .subscribe(
          (dep) => {
            this.notify('Updated!');
            this.clearFields();
          },
          (err) => {
            this.notify('Error!');
            console.log(err);
          }
        );

    } else {
      this.depService.add({ name: this.depName })
        .subscribe(
          (dep) => {
            this.notify('Inserted!');
            console.log(dep);
            this.clearFields();
          },
          (err) => {
            this.notify('Error!');
            console.log(err);
          }
        );
    }
  }

  cancel() {
    this.clearFields();
  }

  edit(dep: Department) {
    this.depName = dep.name;
    this.depEdit = dep;
  }

  delete(dep: Department) {
    this.depService.del(dep)
      .subscribe(
        () => { this.notify('Removed!'); },
        (err) => { this.notify(err.error.msg); }
      );
  }

  clearFields() {
    this.depName = '';
    this.depEdit = null;
  }

  notify(msg: string) {
    this.snackBar.open(msg, "OK", { duration: 3000 });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

}
