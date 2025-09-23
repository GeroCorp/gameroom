import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: false,
  templateUrl: './popup.html',
  styleUrl: './popup.css'
})
export class Popup {

  @Input() state: 'win' | 'lose' = 'win';
  @Input() points: number = 0;
  // @Output() nuevoJuego = new EventEmitter<void>();

}
