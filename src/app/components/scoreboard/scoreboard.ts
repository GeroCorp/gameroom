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
  selectedGame: string = 'global'; // Juego actualmente seleccionado

  constructor(
    public supabase: Supabase
  ) { 
  }

  ngOnInit() {
    this.loadScoreboard();
  }

  async loadScoreboard(juego: string = 'global') {
    this.loadingScoreboard.set(true);
    this.selectedGame = juego; // Actualizar el juego seleccionado
    
    try{
      console.log('Cargando scoreboard para:', juego);
      
      if (juego !== 'global') {
        const scores = await this.supabase.getScores(juego);
        console.log('Datos recibidos para', juego, ':', scores);

        // Para juegos específicos, ordenar por puntuación y limitar a top 10
        this.scoreboard = scores
          .sort((a: any, b: any) => b.puntuacion - a.puntuacion)
          .slice(0, 10);
      } else {
        const scores = await this.supabase.getGlobalScores();
        console.log('Datos globales recibidos:', scores);
        this.scoreboard = scores; // Asignar antes de procesar
        await this.handleScoreData();
      }
      
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

  async handleScoreData() {
    console.log('Procesando datos del scoreboard...');
    
    // Primero agrupar por usuario y juego para encontrar el mejor puntaje de cada juego
    const userGameBestScores = new Map<string, Map<string, any>>();
    
    this.scoreboard.forEach(score => {
      const userId = score.user_id;
      const gameType = score.juego;
      
      if (!userGameBestScores.has(userId)) {
        userGameBestScores.set(userId, new Map());
      }
      
      const userGames = userGameBestScores.get(userId)!;
      
      if (!userGames.has(gameType) || score.puntuacion > userGames.get(gameType).puntuacion) {
        // Guardar el mejor puntaje de este juego para este usuario
        userGames.set(gameType, {
          user_id: userId,
          username: score.username,
          puntuacion: score.puntuacion,
          juego: gameType,
          id: score.id,
          created_at: score.created_at
        });
      }
    });
    
    // Ahora sumar los mejores puntajes de cada juego por usuario
    const userTotalBestScores: any[] = [];
    
    userGameBestScores.forEach((userGames, userId) => {
      let totalPuntuacion = 0;
      let username = '';
      let lastGameDate = '';
      
      // Sumar los mejores puntajes de cada juego
      userGames.forEach((gameScore) => {
        totalPuntuacion += gameScore.puntuacion;
        username = gameScore.username; // Tomar el username
        if (!lastGameDate || gameScore.created_at > lastGameDate) {
          lastGameDate = gameScore.created_at;
        }
      });
      
      userTotalBestScores.push({
        user_id: userId,
        username: username,
        puntuacion: totalPuntuacion,
        juego: 'Global (Mejores)',
        created_at: lastGameDate
      });
    });
    
    // Ordenar por puntuación total descendente y tomar top 10
    this.scoreboard = userTotalBestScores
      .sort((a, b) => b.puntuacion - a.puntuacion)
      .slice(0, 10);

    console.log('Scoreboard global procesado (suma de mejores puntajes):', this.scoreboard);
  }


}
