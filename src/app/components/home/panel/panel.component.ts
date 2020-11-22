import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['../accordion/accordion.component.scss'],
})
export class PanelComponent implements OnInit {
  constructor() {}

  @Input() opened = false;
  @Input() title: string;
  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {}
}
