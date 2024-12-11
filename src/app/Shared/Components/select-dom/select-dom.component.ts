import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select-dom',
  templateUrl: './select-dom.component.html',
  styleUrl: './select-dom.component.css',
  standalone: false
})
export class SelectDOMComponent {
  @Input({ required: true }) data: any;
  @Input({ required: true }) label!: string;
  @Output() selectedValue = new EventEmitter();

  sendValueSelected(event: Event) {
    this.selectedValue.emit(event)
  }
}
