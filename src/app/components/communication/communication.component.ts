import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss'],
})
export class CommunicationComponent implements OnInit {
  constructor(private communication: CommunicationService) { }

  dataToSend;
  receivedValue;

  ngOnInit(): void { }

  sendAnyData() {
    this.communication.sendData(this.dataToSend);
    this.dataToSend = '';
  }

  receiveValue(value) {
    this.receivedValue = value;
  }
}
