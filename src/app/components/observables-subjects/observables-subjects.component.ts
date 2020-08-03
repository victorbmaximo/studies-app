import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, Observer, fromEvent, Subject, ReplaySubject, AsyncSubject, BehaviorSubject } from 'rxjs';
import { publish, refCount, share } from 'rxjs/operators';
import { ObservablesSubjectsService } from 'src/app/services/observables-subjects.service';
import { DataModel } from 'src/app/models/dataModel.model';

@Component({
  selector: 'app-observables-subjects',
  templateUrl: './observables-subjects.component.html',
  styleUrls: ['./observables-subjects.component.scss']
})
export class ObservablesSubjectsComponent implements OnInit {

  @ViewChild('myButton', { static: true }) button: ElementRef;

  constructor(private service: ObservablesSubjectsService) { }

  n1: number;
  n2: number;
  s1: string;
  s2: string;

  resultClicked: string;

  myFirstObservable = new Observable(
    (observer: Observer<number>) => {
      observer.next(1);
      observer.next(2);
      // observer.error('error aqui');
      observer.complete();
    }
  );

  coldObservable: Observable<number> = new Observable(
    (observer: Observer<number>) => {
      let i = 0;

      setInterval(() => {
        i++;
        console.log(i);
        (i === 100) ? observer.complete() : observer.next(i);
      }, 1000);

    });

  subject: Subject<DataModel>;
  replaySubject: ReplaySubject<DataModel>;
  asyncSubject: AsyncSubject<DataModel>;
  behaviorSubject: BehaviorSubject<DataModel>;

  ngOnInit(): void {
    // this.myFirstObservable.subscribe(
    //   (res: number) => console.log(res),
    //   (error) => console.log(error),
    //   () => console.log('completed')
    // );

    this.observableFromEvent();
    // this.usingSubjects();
    // this.usingPublish();
    // this.usingShare();

    this.createSubjects();
  }

  observableFromEvent() {
    const myBtnClickObservable: Observable<any> = fromEvent(this.button.nativeElement, 'click');

    myBtnClickObservable.subscribe(
      (event) => this.resultClicked = 'Button Clicked'
    );
  }

  // Turn the cold observables into a hot

  usingSubjects() {
    const subject = new Subject<number>();
    // Gera os dados desde o subscribe do subject
    this.coldObservable.subscribe(subject);

    this.s1 = 'waiting for interval';
    // Subscriber 1
    setTimeout(() => {
      subject.subscribe((res) => {
        this.n1 = res;
        this.s1 = 'OK';
      });
    }, 2000);

    this.s2 = 'waiting for interval';
    // Subscriber 1
    setTimeout(() => {
      subject.subscribe((res) => {
        this.n2 = res;
        this.s2 = 'OK';
      });
    }, 4000);
  }

  usingPublish() {
    const multicasted = this.coldObservable.pipe(publish(), refCount());

    this.s1 = 'waiting for interval';
    // Subscriber 1
    setTimeout(() => {
      multicasted.subscribe((res) => {
        this.n1 = res;
        this.s1 = 'OK';
      });
    }, 5000);

    this.s2 = 'waiting for interval';
    // Subscriber 1
    setTimeout(() => {
      multicasted.subscribe((res) => {
        this.n2 = res;
        this.s2 = 'OK';
      });
    }, 10000);
  }

  usingShare() {
    const multicasted = this.coldObservable.pipe(share());

    this.s1 = 'waiting for interval';
    // Subscriber 1
    setTimeout(() => {
      multicasted.subscribe((res) => {
        this.n1 = res;
        this.s1 = 'OK';
      });
    }, 5000);

    this.s2 = 'waiting for interval';
    // Subscriber 1
    setTimeout(() => {
      multicasted.subscribe((res) => {
        this.n2 = res;
        this.s2 = 'OK';
      });
    }, 10000);
  }

  createSubjects() {
    this.subject = new Subject<DataModel>();
    this.replaySubject = new ReplaySubject<DataModel>();
    this.asyncSubject = new AsyncSubject<DataModel>();
    this.behaviorSubject = new BehaviorSubject<DataModel>({ timestamp: 0, data: 0 });

    this.service.dataObservable.subscribe(this.subject);
    this.service.dataObservable.subscribe(this.replaySubject);
    this.service.dataObservable.subscribe(this.asyncSubject);
    this.service.dataObservable.subscribe(this.behaviorSubject);
  }

  connect() {
    this.service.dataObservable.connect();
  }

}
