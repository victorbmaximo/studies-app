import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Department } from '../models/department.model';
import { Injectable } from '@angular/core';
import { tap, delay } from 'rxjs/operators';

@Injectable()
export class DepartmentService {

    constructor(private http: HttpClient) { }

    readonly url = 'http://localhost:3000/departments';

    private departmentSubject$: BehaviorSubject<Department[]> = new BehaviorSubject<Department[]>(null);
    private loaded = false;

    get(): Observable<Department[]> {
        if (!this.loaded) {
            this.http.get<Department[]>(this.url)
                // .pipe(
                //     delay(2000)
                // )
                .subscribe(this.departmentSubject$);

            this.loaded = true;
        }

        return this.departmentSubject$.asObservable();
    }

    add(dep: Department): Observable<Department> {
        return this.http.post<Department>(this.url, dep)
            .pipe(
                tap(
                    (d: Department) => this.departmentSubject$.getValue().push(d)
                )
            );
    }

    del(dep: Department): Observable<any> {
        return this.http.delete<any>(`${this.url}/${dep._id}`)
            .pipe(
                tap(
                    () => {
                        const departments = this.departmentSubject$.getValue();
                        const i = departments.findIndex(d => d._id === dep._id);
                        if (i >= 0) {
                            departments.splice(i, 1);
                        }
                    }
                )
            );
    }

    update(dep: Department): Observable<Department> {
        return this.http.patch<Department>(`${this.url}/${dep._id}`, dep)
            .pipe(
                tap(
                    (d) => {
                        const departments = this.departmentSubject$.getValue();
                        const i = departments.findIndex(dId => dId._id === dep._id);
                        if (i >= 0) {
                            departments[i].name = d.name;
                        }
                    }
                )
            );
    }
}
