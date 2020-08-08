import { Component, OnInit } from '@angular/core';
import { Observable, from, of, interval, timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-basic-creation',
  templateUrl: './basic-creation.component.html',
  styleUrls: ['./basic-creation.component.scss']
})
export class BasicCreationComponent implements OnInit {

  constructor() { }

  observableFromAndOf$: Observable<any>;
  intervalCount: number;
  timerCount = 5;
  timerIteration: number;

  ngOnInit(): void {
    this.observableFrom();
    this.observableTimerAndInterval();
  }

  observableFrom() {
    // this.observableFromAndOf$ = from([{ name: 'Isa', lastName: 'Rebelo' }]);
    this.observableFromAndOf$ = of({ name: 'Isa', lastName: 'Rebelo' });
  }


  observableTimerAndInterval() {
    const count = interval(1000);
    const source = timer(0, 1000);

    let subscriptionInterval: Subscription;
    let subscriptionTimer: Subscription;

    subscriptionInterval = count.subscribe(interval => {
      if (interval + 1 === 5) {
        subscriptionInterval.unsubscribe();

        subscriptionTimer = source.subscribe((iteration) => {
          this.timerIteration = iteration;

          if (iteration + 1 > 10) {
            subscriptionTimer.unsubscribe();
          }
        });
      }

      this.timerCount = --this.timerCount;
    });
  }

}
