import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  fromEvent,
  of,
  from,
  Observable,
  Subject,
  BehaviorSubject,
  interval,
  Subscription,
} from 'rxjs';
import {
  map,
  filter,
  tap,
  debounceTime,
  switchMap,
  takeUntil,
  mergeAll,
  mergeMap,
  switchAll,
} from 'rxjs/operators';
import { ObservablesSubjectsService } from 'src/app/services/observables-subjects.service';
import { Person } from 'src/app/models/person.model';

interface Names {
  name: string;
}

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss'],
})
export class OperatorsComponent implements OnInit, OnDestroy {
  constructor(private service: ObservablesSubjectsService) {}

  positionClick = {
    screenX: 0,
    screenY: 0,
  };

  evenNumbers = [];
  printTapResult = [];
  test = [1, 2];

  names$: Observable<Names[]>;

  namesAux$: BehaviorSubject<any> = new BehaviorSubject<any>('');

  unsubscribeAll$: Subject<any> = new Subject();

  searchInput: string;

  @ViewChild('searchBox2', { static: true }) searchBox2: ElementRef;
  searchInput2: string;
  people$: Observable<Person[]>;

  ngOnInit(): void {
    // this.operatorMap();
    // this.operatorFilter();
    // this.operatorTap();
    this.operetorMergeSwitchMap4();

    // this.names$.next([
    //   { name: 'victor' },
    //   { name: 'isadora' },
    //   { name: 'nathan' },
    //   { name: 'cristina' },
    //   { name: 'marcelo' }
    // ]);

    this.service.getNames().subscribe((res) => (this.names$ = res.data));
  }

  operetorMergeSwitchMap1() {
    fromEvent(this.searchBox2.nativeElement, 'keyup')
      .pipe(debounceTime(1000))
      .subscribe((e) => {
        this.service
          .getPeople(this.searchInput2)
          .subscribe((peoples) => console.log(peoples));
      });
  }

  operetorMergeSwitchMap2() {
    const keyup$ = fromEvent(this.searchBox2.nativeElement, 'keyup');
    const fetch$ = keyup$.pipe(
      debounceTime(500),
      map((e) => this.service.getPeople(this.searchInput2))
    );

    fetch$.pipe(mergeAll()).subscribe((res) => console.log(res));

    this.people$ = fetch$.pipe(mergeAll());
  }

  operetorMergeSwitchMap3() {
    const keyup$ = fromEvent(this.searchBox2.nativeElement, 'keyup');

    this.people$ = keyup$.pipe(
      // debounceTime(500),
      mergeMap((e) => this.service.getPeople(this.searchInput2))
    );
  }

  operetorMergeSwitchMap4() {
    const keyup$ = fromEvent(this.searchBox2.nativeElement, 'keyup');

    this.people$ = keyup$.pipe(
      debounceTime(700),
      switchMap((e) => this.service.getPeople(this.searchInput2))
    );
  }

  operatorMap() {
    fromEvent(document, 'click')
      .pipe(
        takeUntil(this.unsubscribeAll$),
        map((e: MouseEvent) => {
          this.positionClick.screenX = e.screenX;
          this.positionClick.screenY = e.screenY;
        })
      )
      .subscribe();
  }

  operatorFilter() {
    of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
      .pipe(filter((i) => i % 2 === 0))
      .subscribe((res) => {
        this.evenNumbers.push(res);
      });
  }

  operatorTap() {
    of(1, 2)
      .pipe(
        map((n) => n * 10),
        tap({
          next: (res) => {
            this.printTapResult.push('Number on tap: ', res);
          },
          error: (error) => console.log(error),
          complete: () => console.log('complete'),
        })
      )
      .subscribe();
  }

  searchBy(searchValue: string) {
    // console.log(this.names$)
    // this.names$
    //   .pipe(
    //     filter(res => res.name.includes(searchValue))
    //   );
  }

  ngOnDestroy() {
    this.unsubscribeAll$.next();
  }
}
