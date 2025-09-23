import { Component, OnInit } from '@angular/core';
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
  state: 'start' | 'win' | 'lose' = 'start';
  userGuess: 'higher' | 'lower' | null = null;

  constructor(public supabase: Supabase) {}

  ngOnInit() {
    this.startCards();
  }


  async loadCards(){
    this.cards = await this.supabase.getCards();
    console.log("Cartas cargadas:" + this.cards.length);
  }

    
  private async startCards(){
    await this.loadCards();
    this.currentCard = this.pickRandomCard();
    this.nextCard = this.pickRandomCard();
    console.log(this.currentCard);
    console.log(this.nextCard);
  }
  
  handleUserGuess(guess: 'higher' | 'lower') {
    this.userGuess = guess;
    this.userGuessed = true;
    
    if ((this.userGuess === 'higher' && this.nextCard.value > this.currentCard.value) || 
    (this.userGuess === 'lower' && this.nextCard.value < this.currentCard.value)||
    (this.nextCard.value === this.currentCard.value)) {
      
      // en caso de adivinar sumar punto
      this.userPoints++;

      // preparar siguiente ronda
      this.nextRound();
      console.log("Puntos actuales: " + this.userPoints);
      
      this.userGuessed = false;
      this.userGuess = null;
    }
    else {
      this.state = 'lose';
      console.log("Juego terminado. Puntos totales: " + this.userPoints);
    }

  }
  
  private nextRound(){
    // Eliminar la carta actual del mazo y actualizar la carta revelada
    this.cards = this.cards.filter(card => card.id !== this.currentCard.id);

    if (!this.pickRandomCard()){
      this.endGame();
      return;
    }

    this.currentCard = this.nextCard;

    // Seleccionar una nueva carta para la siguiente ronda
    this.nextCard = this.pickRandomCard();
    console.log(this.currentCard);
    console.log(this.nextCard);
  }

  private endGame(){
    if (this.state === 'lose'){
      console.log("Juego terminado. Puntos totales: " + this.userPoints);
      return;
    }
    if (this.cards.length === 0){
      this.state = 'win';
      console.log("¡Has ganado el juego! Puntos totales: " + this.userPoints);
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
    this.state = 'start';
    this.userPoints = 0;
    this.userGuessed = false;
    this.userGuess = null;
    Promise.resolve().then(() => {
        this.startCards();
    });
  }
}
