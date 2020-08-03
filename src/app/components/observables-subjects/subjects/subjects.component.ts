import { Component, OnInit, Input } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { DataModel } from 'src/app/models/dataModel.model';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  @Input() subject: Subject<DataModel>;
  @Input() name: string;
  log: string[] = [];
  connected = false;
  subscription: Subscription;

  constructor() { }

  ngOnInit(): void {
  }

  logData(data: DataModel) {
    this.log.push(`Timestamp: ${data.timestamp} Data: ${data.data}`);
  }

  connect() {
    this.log.push('Connected');
    this.connected = true;
    this.subscription = this.subject.subscribe(
      (res: DataModel) => {
        this.logData(res);
      },
      (error) => { this.connected = false; },
      () => { this.connected = false; this.log.push('Finished'); }
    );
  }

  disconnect() {

  }

}
