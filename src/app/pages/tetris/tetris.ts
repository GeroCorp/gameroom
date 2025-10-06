import { Component, OnInit, OnDestroy } from '@angular/core';
import { Keyboard } from '../../services/keyboard';

@Component({
  selector: 'app-tetris',
  standalone: false,
  templateUrl: './tetris.html',
  styleUrl: './tetris.css',
})
export class Tetris implements OnInit, OnDestroy {

  puntuacion: number = 0;
  gameState: 'pregame' | 'playing' | 'won' | 'lost' | 'paused' = 'pregame';
  scoreboard: any[] = [];
  loadingScoreboard: boolean = false;

  constructor(private keyboard: Keyboard) {
    // Ya no necesitamos effects, los signals se manejan directamente
  }

  ngOnInit() {
    console.log('Tetris component initialized');
  }

  ngOnDestroy() {
    // Limpiar el estado del teclado cuando se destruye el componente
    this.keyboard.clearAllKeys();
  }

  togglePause(){
    this.gameState = this.gameState === 'paused' ? 'playing' : 'paused';
  }

  // Métodos de juego públicos (para usar en template y directiva)
  resetGame() {
    this.puntuacion = 0;
    this.gameState = 'pregame';
    console.log('Juego reiniciado');
    // Agregar lógica de reset del tablero
  }

  movePieceLeft() {
    if (this.gameState === 'playing') {
      console.log('Moviendo pieza a la izquierda');
      // Implementar movimiento a la izquierda
    }
  }

  movePieceRight() {
    if (this.gameState === 'playing') {
      console.log('Moviendo pieza a la derecha');
      // Implementar movimiento a la derecha
    }
  }

  rotatePiece() {
    if (this.gameState === 'playing') {
      console.log('Rotando pieza');
      // Implementar rotación de pieza
    }
  }

  dropPiece() {
    if (this.gameState === 'playing') {
      console.log('Caída rápida de pieza');
      // Implementar caída rápida
    }
  }

  holdPiece() {
    if (this.gameState === 'playing') {
      console.log('Guardando pieza');
      // Implementar función hold
    }
  }

  

  startGame(){
    this.gameState = 'playing';
    console.log('Juego iniciado');
  }
}
