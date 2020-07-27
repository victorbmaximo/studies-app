import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(private communication: CommunicationService) {}

  brandFooter: string;

  ngOnInit(): void {
    this.receiveDataFromHeader();
  }

  receiveDataFromHeader() {
    // this.communication.data.subscribe((res) => {
    //   this.brandFooter = res;
    // });
  }
}
