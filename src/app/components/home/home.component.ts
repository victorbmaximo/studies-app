import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private communication: CommunicationService) {}

  dataFromCommunication;
  dataFromCommunication2;
  private _name: string;

  myDate = new Date();

  dates = [
    'Segunda, 24/08 - a partir de R$ 1.300,00',
    'Terça, 25/08 - a partir de R$ 1.094,17',
    'Quarta, 26/08 - a partir de R$ 1.250,00',
    'Quinta, 27/08 - a partir de R$ 1.250,00',
    'Sexta, 28/08 - a partir de R$ 1.250,00',
    'Sábado, 29/08 - a partir de R$ 1.250,00',
    'Domingo, 30/08 - a partir de R$ 1.250,00',
  ];

  arrayNumbers = [1, 5, 9, 23];

  persons = [
    { type: 'person', name: 'victor', age: 23 },
    { type: 'person', name: 'isa', age: 17 },
  ];

  seriesNames = [
    { type: 'serie', serie: 'got' },
    { type: 'serie', serie: 'dark' },
  ];

  spread = [...this.seriesNames, ...this.persons];

  ngOnInit(): void {
    // this.receiveData();
    this.name = 'Isa';
    console.log(this.spread);
    // let i = this.spread.findIndex((person) => person.name == 'isa');
    // console.log(i);

    let filtered = this.spread.filter((obj) => obj.type === 'person');
    // console.log(filtered);

    // let maped = this.spread.map((obj) =>
    //   obj.type === 'serie' ? (obj.type = 'new type') : ''
    // );
    // console.log(maped);
  }

  set name(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
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
