import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private communication: CommunicationService) {}

  @Input() brand: string;

  ngOnInit(): void {}

  sendInfoToFooter() {
    this.communication.sendData('rodapé');
  }
}
