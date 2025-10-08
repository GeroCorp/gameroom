import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Supabase } from '../../services/supabase';

@Component({
  selector: 'app-mayor-menor',
  standalone: false,
  templateUrl: './mayor-menor.html',
  styleUrl: './mayor-menor.css'
})
export class MayorMenor implements OnInit {


  userGuessed: boolean = false;
  userPoints: number = 0;
  backCardImage: string = 'assets/cards/back.png';
  cards: any[] = [];
  currentCard: any = null;
  nextCard: any = null;
  state: 'start' | 'playing' | 'win' | 'lose' = 'start';
  userGuess: 'higher' | 'lower' | null = null;
  scoreboard: any[] = [];
  loadingScoreboard: boolean = true;

  constructor(
    public supabase: Supabase,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Solo cargar las cartas, pero no iniciar el juego automáticamente
    this.getScoreboard();
  }


  async loadCards(){
    this.cards = await this.supabase.getCards();
  }

    
  private async startCards(){
    try {
      await this.loadCards();
      
      if (this.cards.length === 0) {
        console.error('No se pudieron cargar las cartas');
        return;
      }
      
      this.currentCard = this.pickRandomCard();
      this.nextCard = this.pickRandomCard();
      
      // Solo cambiar estado si tenemos cartas válidas
      if (this.currentCard && this.nextCard) {
        this.state = 'playing';
      } else {
        console.error('Error al asignar cartas');
      }
    } catch (error) {
      console.error('Error al iniciar cartas:', error);
    }
  }
  
  async handleUserGuess(guess: 'higher' | 'lower') {
    this.userGuess = guess;
    this.userGuessed = true;
    
    if ((this.userGuess === 'higher' && this.nextCard.value > this.currentCard.value) || 
    (this.userGuess === 'lower' && this.nextCard.value < this.currentCard.value)||
    (this.nextCard.value === this.currentCard.value)) {
      
      // en caso de adivinar sumar punto
      this.userPoints++;

      // preparar siguiente ronda
      await this.nextRound();
      
      this.userGuessed = false;
      this.userGuess = null;
    }
    else {
      this.state = 'lose';
      // Subir puntaje cuando se pierde
      try {
        await this.supabase.uploadScore('mayor-menor', this.userPoints);
        await this.getScoreboard();
      } catch (error) {
        console.error('Error al guardar puntaje:', error);
      }
    }
    
    // Forzar detección de cambios
    this.cdr.detectChanges();
  }
  
  private async nextRound(){
    // Eliminar la carta actual del mazo y actualizar la carta revelada
    this.cards = this.cards.filter(card => card.id !== this.currentCard.id);

    if (!this.pickRandomCard()){
      await this.endGame();
      return;
    }

    this.currentCard = this.nextCard;

    // Seleccionar una nueva carta para la siguiente ronda
    this.nextCard = this.pickRandomCard();
  }

  private async endGame(){
    if (this.state === 'lose'){
      return;
    }
    if (this.cards.length === 0){
      this.state = 'win';
      // Subir puntaje cuando se gana
      try {
        await this.supabase.uploadScore('mayor-menor', this.userPoints);
        await this.getScoreboard();
      } catch (error) {
        console.error('Error al guardar puntaje:', error);
      }
      return;
    }
  }

  private pickRandomCard(): any {
    if (this.cards.length === 0) {
      console.error('No hay cartas disponibles para seleccionar.');
      return null;
    }
    return this.cards[Math.floor(Math.random() * this.cards.length)];
  }

  async startNewGame() {
    // Reiniciar valores
    this.userPoints = 0;
    this.userGuessed = false;
    this.userGuess = null;
    this.currentCard = null;
    this.nextCard = null;
    
    // Iniciar las cartas y cambiar estado
    await this.startCards();
    
    // Forzar detección de cambios
    this.cdr.detectChanges();
    
  }

  continueGame() {
    this.userGuessed = false;
    this.userGuess = null;
    this.cdr.detectChanges();
  }

  async getScoreboard(){
    try {
      this.loadingScoreboard = true;
      const scores = await this.supabase.getScores('mayor-menor');
      this.scoreboard = scores || [];
    } catch (error) {
      console.error('Error al obtener scoreboard:', error);
      this.scoreboard = [];
    } finally {
      this.loadingScoreboard = false;
      this.cdr.detectChanges();
    }
  }
}
