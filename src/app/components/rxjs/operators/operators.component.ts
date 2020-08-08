import { Component, OnInit } from '@angular/core';
import { fromEvent, of, from } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss']
})
export class OperatorsComponent implements OnInit {

  constructor() { }

  positionClick = {
    screenX: 0,
    screenY: 0
  };

  evenNumbers = [];
  printTapResult = [];

  ngOnInit(): void {
    this.operatorMap();
    this.operatorFilter();
    this.operatorTap();
  }

  operatorMap() {
    fromEvent(document, 'click')
      .pipe(
        map((e: MouseEvent) => {
          this.positionClick.screenX = e.screenX;
          this.positionClick.screenY = e.screenY;
        })
      )
      .subscribe();
  }

  operatorFilter() {
    of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
      .pipe(
        filter(i => i % 2 === 0)
      )
      .subscribe((res) => {
        this.evenNumbers.push(res);
      });
  }

  operatorTap() {
    of(1, 2)
      .pipe(
        map(n => n * 10),
        tap({
          next: res => {
            this.printTapResult.push('Number on tap: ', res);
          },
          error: error => console.log(error),
          complete: () => console.log('complete')
        })
      )
      .subscribe();
  }

}
