import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private communication: CommunicationService) { }

  dataFromCommunication;
  dataFromCommunication2;
  private _name: string;


  set name(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  ngOnInit(): void {
    this.receiveData();
    this.name = 'Isa';
  }

  dataChanged(e) {
    console.log(e);
  }

  receiveData() {
    this.communication.data2.subscribe((res) => {
      this.dataFromCommunication = res;
    });

    this.communication.data3.subscribe((res) => {
      this.dataFromCommunication2 = res;
    });
  }
}
