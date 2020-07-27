import { Injectable, Input, EventEmitter } from '@angular/core';
import { Subject, BehaviorSubject, of, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  constructor() {}

  data = new EventEmitter<any>();
  data2: BehaviorSubject<any> = new BehaviorSubject<any>('');
  data3: Observable<any> = new Observable<any>();

  sendData(value) {
    this.data.emit(value);
    this.data2.next(value);
    this.data3 = of(value);
  }
}

// Subject
// BehaviorSubject
// ReplaySubject
// AsyncSubject
