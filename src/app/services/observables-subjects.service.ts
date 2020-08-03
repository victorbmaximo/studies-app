import { Injectable } from '@angular/core';
import { ConnectableObservable, Observable, Observer } from 'rxjs';
import { publish } from 'rxjs/operators';
import { DataModel } from '../models/dataModel.model';

@Injectable({
  providedIn: 'root'
})
export class ObservablesSubjectsService {

  public dataObservable: ConnectableObservable<DataModel>;

  constructor() {
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
}
