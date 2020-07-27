import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent implements OnInit {
  constructor() {}

  @Output() emitedValue = new EventEmitter<any>();

  ngOnInit(): void {}

  generateValue() {
    this.emitedValue.emit('Qualquer Coisa');
  }
}
