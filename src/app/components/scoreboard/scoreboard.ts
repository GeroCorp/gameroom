import { Component, OnInit, signal } from '@angular/core';
import { Supabase } from '../../services/supabase';


@Component({
  selector: 'app-scoreboard',
  standalone: false,
  templateUrl: './scoreboard.html',
  styleUrl: './scoreboard.css'
})
export class Scoreboard implements OnInit {

  loadingScoreboard = signal<boolean>(true);
  scoreboard: any[] = []
  selectedGame: string = 'ahorcado'; // Juego actualmente seleccionado

  constructor(
    public supabase: Supabase
  ) { 
  }

  ngOnInit() {
    this.loadScoreboard();
  }

  async loadScoreboard(juego: string = 'ahorcado') {
    this.loadingScoreboard.set(true);
    this.selectedGame = juego; // Actualizar el juego seleccionado
    
    try{
      console.log('Cargando scoreboard para:', juego);
      
      
        const scores = await this.supabase.getScores(juego);
        console.log('Datos recibidos para', juego, ':', scores);

        // Para juegos específicos, ordenar por puntuación y limitar a top 10
        this.scoreboard = scores
          .sort((a: any, b: any) => b.puntuacion - a.puntuacion)
          .slice(0, 10);
      
      
      console.log('Scoreboard final:', this.scoreboard);
      
    } catch(e) {
      console.error('Error al cargar el scoreboard:', e);
      this.scoreboard = []; // Limpiar en caso de error
    } finally {
      // Asegurar que siempre se desactive el loading
      this.loadingScoreboard.set(false);
      console.log('Loading terminado, loadingScoreboard:', this.loadingScoreboard);
    }
  }

  // Método para cambiar el juego desde los botones
  async changeGame(gameType: string) {
    console.log('Cambiando a juego:', gameType);
    await this.loadScoreboard(gameType);
  }

  


}
