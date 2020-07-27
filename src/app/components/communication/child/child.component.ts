import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent implements OnInit, OnChanges {
  constructor() { }

  @Output() emitedValue = new EventEmitter<any>();
  @Input() writedData: string;
  writedBeforeData: string;

  ngOnInit(): void { }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (changes.hasOwnProperty('writedData')) {
      this.writedBeforeData = changes['writedData'].previousValue;
    }
  }

  generateValue() {
    this.emitedValue.emit('Qualquer Coisa');
  }
}
