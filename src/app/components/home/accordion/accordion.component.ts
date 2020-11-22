import {
  Component,
  OnInit,
  ContentChildren,
  QueryList,
  AfterContentInit,
} from '@angular/core';
import { PanelComponent } from '../panel/panel.component';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit, AfterContentInit {
  constructor() {}

  ngOnInit(): void {}

  @ContentChildren(PanelComponent) panels: QueryList<PanelComponent>;

  ngAfterContentInit() {
    // console.log(this.panels.toArray());
    // Open the first panel
    this.panels.toArray()[0].opened = true;
    // Loop through all panels
    this.panels.toArray().forEach((panel) => {
      // subscribe panel toggle event
      panel.toggle.subscribe(() => {
        // Open the panel
        this.openPanel(panel);
      });
    });
  }

  openPanel(panel: PanelComponent) {
    console.log(panel);
    // close all panels
    this.panels.toArray().forEach((p) => (p.opened = false));
    // open the selected panel
    panel.opened = true;
  }
}
