import { Injectable } from '@angular/core';
import { ConnectableObservable, Observable, Observer, of } from 'rxjs';
import { publish } from 'rxjs/operators';
import { DataModel } from '../models/dataModel.model';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class ObservablesSubjectsService {

  public dataObservable: ConnectableObservable<DataModel>;

  constructor(private http: HttpClient) {
    this.dataObservable = new Observable(
      (observer: Observer<DataModel>) => {
        let n = 0;
        console.log('Observable Created');

        const f = () => {
          n++;
          if (n <= 10) {
            let timestamp = Math.round(Math.random() * 2000 + 500);
            observer.next({ timestamp, data: n });
            setTimeout(f, timestamp);
          } else { observer.complete(); }
        };

        f();

      }
    ).pipe(
      publish()
    ) as ConnectableObservable<DataModel>;
  }

  getNames(): Observable<any> {
    return this.http.get<any>('https://run.mocky.io/v3/9f9e2e68-9bf6-49ec-9fe8-5eba83ec03a2');
  }

  getPeople(data): Observable<Person[]> {
    console.log(data)
    if (data.length === 0) {
      return of([]);
    } else {
      return this.http.get<Person[]>(`http://localhost:9000/${data}`);
    }
  }
}
