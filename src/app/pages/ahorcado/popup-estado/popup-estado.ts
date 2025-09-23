import { Component , Input, Output, EventEmitter, output} from '@angular/core';

@Component({
  selector: 'app-popup-estado',
  standalone: false,
  templateUrl: './popup-estado.html',
  styleUrl: './popup-estado.css'
})
export class PopupEstado {

  @Input() estado: 'ganado' | 'perdido' = 'ganado';
  @Input() palabraSecreta: string = '';
  @Output() nuevoJuego = new EventEmitter<void>();


}
