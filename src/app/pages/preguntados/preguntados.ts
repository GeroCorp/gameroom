import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Supabase } from '../../services/supabase';

@Component({
  selector: 'app-preguntados',
  standalone: false,
  templateUrl: './preguntados.html',
  styleUrl: './preguntados.css'
})
export class Preguntados implements OnInit{
  questions: any[] = [];
  selectedQuestion: any = null;
  questionOptions: string[] = [];
  puntuacion: number = 0;
  scoreboard: any[] = [];
  loadingScoreboard: boolean = true;
  timer: number = 20; // Segundos por pregunta
  gameState: 'pregame' | 'playing' | 'won' | 'lost' = 'pregame';
  private timerInterval: any = null;

  constructor(
    public supabase: Supabase,
    private cdr: ChangeDetectorRef
  ) {
  }

  async ngOnInit() {
    await this.getScoreboard();
  }

  async getQuestions() {
    try {
      this.questions = await this.supabase.getQuestions();
      console.log(this.questions);
    } catch (error) {
      console.error('Error al obtener preguntas:', error);
    }
  }

  async getScoreboard() {
    this.loadingScoreboard = true;
    try {
      this.scoreboard = await this.supabase.getScores('preguntados')
    }catch (e){
      console.error('Error al obtener el scoreboard:', e);
    }
    this.loadingScoreboard = false;
  }

  test(test: string){
    console.log(test);
  }

  async selectRandomQuestion() {
    if (this.questions.length === 0) {
      console.warn('No hay preguntas disponibles para seleccionar.');
      this.gameState = 'won'; // Ganar si no hay más preguntas
      
      // Esperar a que se suba el puntaje antes de actualizar el scoreboard
      await this.supabase.uploadScore('preguntados', this.puntuacion);
      await this.getScoreboard();
      this.cdr.detectChanges();
      return
    }

    const randomIndex = Math.floor(Math.random() * this.questions.length);
    this.selectedQuestion = this.questions[randomIndex];

    const splitOptions = this.selectedQuestion.opciones.split(',') // Separar opciones por comas
    this.questionOptions = splitOptions.map((opt: string) => opt.trim()); // Eliminar espacios extra

    console.log('Pregunta seleccionada:', this.selectedQuestion, "\nRespuestas:", this.questionOptions);
    this.cdr.detectChanges();
  }

  async handleAnswer(selectedOption: string) {
    if (this.gameState !== 'playing') {
      console.warn('El juego no está en estado de juego activo.');
      return;
    }
    
    const wasCorrect = selectedOption == this.selectedQuestion.respuesta;
    
    if (wasCorrect) {
      switch (this.selectedQuestion.dificultad) {
        case 1:
          this.puntuacion += 5;
        break;
        case 2:
          this.puntuacion += 10;
        break;
        case 3:
          this.puntuacion += 15;
        break;
      }
    } else if (!wasCorrect) {
      this.gameState = 'lost';
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
      return;
    }
    
    this.cdr.detectChanges(); // Forzar actualización de la vista
    
    this.questions = this.questions.filter(q => q !== this.selectedQuestion); // Eliminar la pregunta actual
    await this.selectRandomQuestion();
    this.timer = 20;
  }

  startTimer(){
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    
    this.timer = 20;
    this.timerInterval = setInterval(() => {
      this.timer--;
      this.cdr.detectChanges();
      if (this.timer === 0) {
        clearInterval(this.timerInterval);
        this.endGame();
      }
      console.log(this.timer);
    }, 1000);
  }

  async startGame() {
    console.log('Iniciando juego...');
    
    // Limpiar estado anterior
    this.puntuacion = 0;
    this.selectedQuestion = null;
    this.questionOptions = [];
    
    await this.getQuestions();
    if (this.questions.length === 0) {
      console.error('No hay preguntas disponibles para iniciar el juego.');
      return;
    }

    this.gameState = 'playing';
    console.log('Estado cambiado a playing');
    this.cdr.detectChanges();
    
    await this.selectRandomQuestion();
    this.startTimer();
  }
  
  async endGame() {
    this.gameState = 'lost';
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    
    // Subir puntaje cuando el juego termina y actualizar scoreboard
    await this.supabase.uploadScore('preguntados', this.puntuacion);
    await this.getScoreboard();
    this.cdr.detectChanges();
  }
}

