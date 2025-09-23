import { Component, OnInit, Output, Input } from '@angular/core';
import { Hangman } from '../../services/hangman';
import { Supabase } from '../../services/supabase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ahorcado',
  standalone: false,
  templateUrl: './ahorcado.html',
  styleUrl: './ahorcado.css'
})
export class Ahorcado implements OnInit{
  palabras: string[] = [];
  palabraSecreta: string = '';
  display: string[] = [];
  nroIntentos: number = 6;
  letras: string[] = [];
  letrasIncorrectas: string[] = [];
  estado: 'jugando' | 'ganado' | 'perdido' = 'jugando';
  abcdario: string[] = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');


  constructor (private hangmanService: Hangman, private supabase: Supabase, private router: Router) {
  }

  ///////////
  // TO DO //

  // Modo endless <-- ahora solo permite 1 juego y reiniciar manualmente
  // Cargar puntos a supabase
  // Get puntos de supabase para leaderboard

  ngOnInit() {
    if (this.supabase.user()){
      console.log("Usuario logueado:", this.supabase.user()?.email);
    }else{
      console.log("No hay usuario logueado");
      this.router.navigate(['/']);
      return;
    }
    


    this.hangmanService.getWords().subscribe(
      (wordsArray: string[]) => {
        
        this.palabras = wordsArray;
        console.log("Palabras cargadas:", this.palabras);
        this.startNewGame();
    });
  }



  private seleccionarPalabra(): string {
    if (this.palabras.length === 0) {
      console.warn('No hay palabras disponibles para seleccionar.');
      return '';
    }

    return this.palabras[Math.floor(Math.random() * this.palabras.length)];
  
  }

  adivinarLetra(letra: string) {
    if (this.estado !== 'jugando' || this.letras.includes(letra)) {
      return;
    }

    this.letras.push(letra); // Agregar la letra a la lista de letras adivinadas

    if (this.palabraSecreta.includes(letra)) {
      for (let i = 0; i < this.palabraSecreta.length; i++) {
        if (this.palabraSecreta[i] === letra) {
          this.display[i] = letra;
        }
      }
    }else{
      this.nroIntentos--;
      this.letrasIncorrectas.push(letra);
    }
    this.estadoDelJuego();
    
  }

  estadoDelJuego(){
    if (this.display.join('') === this.palabraSecreta) {
      this.estado = 'ganado';
    }else if (this.nroIntentos === 0) {
      this.estado = 'perdido';
    }
    console.log(this.estado);
  }

  startNewGame() {
    this.palabraSecreta = this.seleccionarPalabra().toUpperCase();
    this.display = Array(this.palabraSecreta.length).fill('_');
    this.letras = [];
    this.letrasIncorrectas = [];
    this.nroIntentos = 6;
    this.estado = 'jugando';
    console.log('Palabra secreta seleccionada:', this.palabraSecreta);
  }

}
