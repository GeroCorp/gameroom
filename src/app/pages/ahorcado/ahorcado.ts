import { Component, OnInit, ChangeDetectorRef, signal } from '@angular/core';
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
  puntuacion: number = 0;
  scoreboard: any[] = [];
  loadingScoreboard: boolean = true;
  loadingImages= signal<boolean>(true);
  hangImages=  signal<string[]>([]);

  abcdario: string[] = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');

  constructor (
    private hangmanService: Hangman, 
    private supabase: Supabase, 
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
  }

  ///////////
  // TO DO //

  // Modo endless <-- ahora solo permite 1 juego y reiniciar manualmente
  // Cargar puntos a supabase
  // Get puntos de supabase para leaderboard

  async ngOnInit() {
    if (this.supabase.user()){
      console.log("Usuario logueado:", this.supabase.user()?.email);
    }else{
      console.log("No hay usuario logueado");
      this.router.navigate(['/']);
      return;
    }
    
    // Cargar scoreboard inicial
    await this.getScoreboard();
    this.cdr.detectChanges(); // Forzar detección de cambios
    await this.firstLoad();
    
  }


  async firstLoad(){
    this.loadingImages.set(true);
    try{
      this.hangmanService.getWords().subscribe(
        (wordsArray: string[]) => {
          
          this.palabras = wordsArray;
          this.startNewGame();
      });
      this.hangImages.set(this.hangmanService.getHangmanImages()) ;
    }catch(error){
      console.error("Error cargando palabras:", error);
    }
    this.loadingImages.set(false);
    this.cdr.detectChanges(); // Forzar detección de cambios
  }

  private seleccionarPalabra(): string {
    if (this.palabras.length === 0) {
      console.warn('No hay palabras disponibles para seleccionar.');
      return '';
    }

    return this.palabras[Math.floor(Math.random() * this.palabras.length)];
  
  }

  async adivinarLetra(letra: string) {
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
      if(this.puntuacion > 0) this.puntuacion -= 1; // Penalizar puntuacion solo si es mayor a 0
      this.letrasIncorrectas.push(letra);
    }
    await this.estadoDelJuego();
    
  }

  async handleAdivino(){
      this.puntuacion += 10;
      this.palabras = this.palabras.filter(p => p !== this.palabraSecreta);
      
      // Verificar si quedan palabras disponibles
      if (this.palabras.length === 0) {
        try {
          await this.supabase.uploadScore('ahorcado', this.puntuacion);
          await this.getScoreboard(); // Actualizar el leaderboard
        } catch (error) {
          console.error('Error al guardar puntaje:', error);
        }
        this.estado = 'ganado';
        return;
      }
      
      // Seleccionar nueva palabra y reiniciar el juego
      this.palabraSecreta = this.seleccionarPalabra().toUpperCase();
      this.display = Array(this.palabraSecreta.length).fill('_');
      this.letras = [];
      this.letrasIncorrectas = [];
      this.nroIntentos = 6;
      this.estado = 'jugando';
      
  }

  async estadoDelJuego(){
    if (this.display.join('') === this.palabraSecreta) {
      // En lugar de terminar el juego, llamar a handleAdivino
      await this.handleAdivino();
    }else if (this.nroIntentos === 0) {
      this.estado = 'perdido';
      try {
        await this.supabase.uploadScore('ahorcado', this.puntuacion);
        await this.getScoreboard(); // Actualizar el leaderboard
      } catch (error) {
        console.error('Error al guardar puntaje:', error);
      }
    }
  }

  startNewGame() {
    this.palabraSecreta = this.seleccionarPalabra().toUpperCase();
    this.display = Array(this.palabraSecreta.length).fill('_');
    this.letras = [];
    this.letrasIncorrectas = [];
    this.nroIntentos = 6;
    this.puntuacion = 0;
    this.estado = 'jugando';
  }

  async getScoreboard(){
    try {
      this.loadingScoreboard = true;
      const scores = await this.supabase.getScores('ahorcado');
      this.scoreboard = scores || []; // Asegurar que siempre sea un array
    } catch (error) {
      console.error('Error al obtener scoreboard:', error);
      this.scoreboard = []; // Array vacío en caso de error
    } finally {
      this.loadingScoreboard = false;
      this.cdr.detectChanges(); // Forzar detección de cambios
    }
  }

}
