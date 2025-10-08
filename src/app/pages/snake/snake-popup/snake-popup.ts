import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-snake-popup',
  standalone: false,
  templateUrl: './snake-popup.html',
  styleUrl: './snake-popup.css'
})
export class SnakePopup {

  @Input() puntaje: number = 0;
  @Output() nuevoJuego = new EventEmitter<void>();
}
