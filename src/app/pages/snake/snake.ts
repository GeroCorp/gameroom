import { Component, OnInit, signal } from '@angular/core';
import { Supabase } from '../../services/supabase';

// Definiciones para la cuadricula
const Cell_type = {
  EMPTY: 0,
  SNAKE: 1,
  SNAKE_HEAD: 2,
  OBSTACLE: 3,
  FOOD: 4
}
type Cell = number;

const enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

const DIFICULTAD ={
  FACIL: 300,
  MEDIO: 200,
  DIFICIL: 100
}

@Component({
  selector: 'app-snake',
  standalone: false,
  templateUrl: './snake.html',
  styleUrl: './snake.css'
})
export class Snake implements OnInit {

  // Variables para display
  cols = 15; 
  rows = 15;
  cellSize = 20;

  public grid = signal<Cell[][]>([]);

  // Almacenar coordenadas para renderización
  public snake = signal<[number, number][]>([]);
  public food = signal<[y: number, x: number]>([0, 0]);
  public obstacles = signal<[number, number][]>([]);

  // Variable de carga
  loadingScoreboard= signal<boolean>(true);

  // Variables de estado del juego
  gameState = signal<string>('pregame');
  puntuacion: number = 0;
  scoreboard= signal<any[]>([]);
  lastDirection: Direction = Direction.RIGHT;
  snakeDirection: Direction = Direction.RIGHT;
  gameInterval: any = null; // Para manejar el interval del juego
  gameSpeed: number = DIFICULTAD.FACIL; // Velocidad del juego

  constructor(
    private supabase: Supabase
  ){
  }

  async ngOnInit() {
    await this.getScoreboard();
  }

  startGame() {
    this.puntuacion = 0;
    this.gameSpeed = DIFICULTAD.FACIL;
    this.snakeDirection = Direction.RIGHT;
    this.lastDirection = Direction.RIGHT;
    this.obstacles.set([]);
    this.initializeGrid();
    this.snakeInit();
    this.gameState.set('running');
    this.gameLoop();
  }


  togglePause() {
    if (this.gameState() === 'running') {
      this.gameState.set('paused');
      if (this.gameInterval) {
        clearInterval(this.gameInterval);
        this.gameInterval = null;
      }
    } else if (this.gameState() === 'paused') {
      this.gameState.set('running');
      this.gameLoop();
    }
  }


  // DISPLAY

  // Iniciar cuadricula
  initializeGrid() {
    this.grid.set(Array.from({ length: this.rows }, () =>
      Array(this.cols).fill(Cell_type.EMPTY)))
    
    // Generar comida inicial
    this.spawnFood();
  }
  cleanGrid(){
    const newGrid = Array.from({ length: this.rows }, () =>
      Array(this.cols).fill(Cell_type.EMPTY));
    this.grid.set(newGrid);
  }  
  
  moveSnake() {
    const currentSnake = this.snake();
    const head = currentSnake[0];
    let newHead: [number, number] = [...head];

    switch(this.snakeDirection) {
      case Direction.UP: newHead[0]--; break
      case Direction.DOWN: newHead[0]++; break
      case Direction.LEFT: newHead[1]--; break
      case Direction.RIGHT: newHead[1]++; break
    }
    this.lastDirection = this.snakeDirection;

    if (this.checkCollision(newHead)) {
      this.gameState.set('gameover');
      return;
    }

    let nextSnake = [newHead, ...currentSnake];

    const foodCoords = this.food();
    let ateFood = newHead[0] === foodCoords[0] && newHead[1] === foodCoords[1];

    if (ateFood){
      this.puntuacion += 10;
      this.spawnFood();
      this.updateDifficulty();
    }else{
      nextSnake.pop(); // Remover la cola si no comió
    }

    // Actualizar la serpiente
    this.snake.set(nextSnake);
    
    // Actualizar el grid completo
    this.updateGrid();
  }

  // Handlers de movimientos
  moveUp(){
    if (this.lastDirection !== Direction.DOWN) {
      this.snakeDirection = Direction.UP;
    }
  }
  moveDown(){
    if (this.lastDirection !== Direction.UP) {
      this.snakeDirection = Direction.DOWN;
    }
  }
  moveLeft(){
    if (this.lastDirection !== Direction.RIGHT) {
      this.snakeDirection = Direction.LEFT;
    }
  }
  moveRight(){
    if (this.lastDirection !== Direction.LEFT) {
      this.snakeDirection = Direction.RIGHT;
    }
  }

  // Main loop
  gameLoop(){
    // Limpiar interval anterior si existe
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
    }
    
    this.gameInterval = setInterval(() => {
      if (this.gameState() === 'paused') {
        clearInterval(this.gameInterval);
        this.gameInterval = null;
        return;
      }

      if (this.gameState() === 'gameover') {
        clearInterval(this.gameInterval);
        this.gameInterval = null;
        this.uploadScore();
        return;
      }

      if (this.gameState() === 'running') {
        this.moveSnake();
      }
      // this.updateDifficulty();
    }, this.gameSpeed); // Usar gameSpeed en lugar de intervalTime
  }
  
  /////////////
  // SPAWNS //

  // Snake
  snakeInit() {
    // Margen de los bordes para no perder instantaneamente
    const margin = 4;
    const randomHeadY = Math.floor(Math.random() * (this.rows - 2 * margin)) + margin;
    const randomHeadX = Math.floor(Math.random() * (this.cols - 2 * margin)) + margin;
    
    this.snake.set([[randomHeadY, randomHeadX]]);
    
    // Agregar segmentos adicionales detrás de la cabeza
    for (let i = 1; i < 3; i++) {
      this.snake.set([...this.snake(), [randomHeadY, randomHeadX - i]]);
    }
    
    // Actualizar el grid con la serpiente inicial
    this.updateGrid();
  }
  // Snake food Funciona como spawn y handler
  spawnFood() {
    let newFood: [y: number, x: number];
    do {
      const y = Math.floor(Math.random() * this.rows);
      const x = Math.floor(Math.random() * this.cols);
      newFood = [y, x]
    } while (this.snake().some(([sy, sx]) => sy === newFood[0] && sx === newFood[1]) ||
             this.obstacles().some(([oy, ox]) => oy === newFood[0] && ox === newFood[1])); // evitar spawn en obstáculos
    
    this.food.set(newFood);
    
    this.spawnObstacle();
    
    // Actualizar el grid para mostrar la nueva comida y obstáculos
    this.updateGrid();
  }

  spawnObstacle() {
    let newObstacle: [y: number, x: number];
    const head = this.snake()[0]; // Guardar posicion de la cabeza 
    const safeRadius = 4; // Radio de seguridad alrededor de la cabeza
    
    do {
      const y = Math.floor(Math.random() * this.rows);
      const x = Math.floor(Math.random() * this.cols);
      newObstacle = [y, x]
    } while (
      // Evitar spawn en la serpiente
      this.snake().some(([snakeY, snakeX]) => snakeY === newObstacle[0] && snakeX === newObstacle[1]) || 
      // Evitar spawn en la comida
      (this.food()[0] === newObstacle[0] && this.food()[1] === newObstacle[1]) ||  
      // Evitar spawn en obstáculos existentes
      this.obstacles().some(([obstY, obstX]) => obstY === newObstacle[0] && obstX === newObstacle[1]) 
    );
             
    // Agregar el nuevo obstáculo a la lista
    this.obstacles.set([...this.obstacles(), newObstacle]);

  }

  ///////////////
  // UTILITIES //
  checkCollision(head: [number, number]): boolean {
    const [y, x] = head;
    // Verificar colisiones con los bordes
    if (y < 0 || y >= this.rows || x < 0 || x >= this.cols) {
      return true;
    }
    // Verificar colisiones con el cuerpo de la serpiente
    if (this.snake().some(([snakey, snakex], index) => 
      index > 0 && snakey == y && snakex == x)){
      return true;
    }
    // Verificar colisiones con obstáculos
    if (this.obstacles().some(([obstacley, obstaclex]) => 
      obstacley == y && obstaclex == x)){
      return true;
    }

    return false;
  }

  drawCell(coord: [number, number], color: number) {
    const [y, x] = coord;
    this.grid.update(grid => {
      const newGrid = grid.map(row => [...row]);
      newGrid[y][x] = color;
      return newGrid;
    });
  }

  updateDifficulty(){
    const oldSpeed = this.gameSpeed;
    
    if (this.puntuacion >= 130) {
      this.gameSpeed = DIFICULTAD.DIFICIL;
    } else if (this.puntuacion >= 70) {
      this.gameSpeed = DIFICULTAD.MEDIO;
    }
    
    // Si la velocidad cambió y el juego está corriendo, reiniciar el game loop
    if (oldSpeed !== this.gameSpeed && this.gameState() === 'running') {
      this.gameLoop(); // Reinicia el interval con la nueva velocidad
    }
  }

  updateGrid() {
  // Limpiar el grid
  this.cleanGrid();
  
  // Dibujar los obstáculos primero
  this.obstacles().forEach(([y, x]) => {
    if (y >= 0 && y < this.rows && x >= 0 && x < this.cols) {
      this.drawCell([y, x], Cell_type.OBSTACLE);
    }
  });
  
  // Dibujar la comida
  this.drawCell(this.food(), Cell_type.FOOD);
  
  // Dibujar la serpiente
  this.snake().forEach(([y, x], index) => {
    if (y >= 0 && y < this.rows && x >= 0 && x < this.cols) {
      if (index === 0) {
        this.drawCell([y, x], Cell_type.SNAKE_HEAD);
      } else {
        this.drawCell([y, x], Cell_type.SNAKE);
      }
    }
  });
  }


  //////////////////
  // LEADERBOARD //

  async getScoreboard(){
    this.loadingScoreboard.set(true);

    try{
      const data = await this.supabase.getScores('snake');

      this.scoreboard.set(data || []);

    } catch (err) {
      this.scoreboard.set([]); // Limpiar en caso de error
      console.error('Error al obtener scoreboard:', err);
    }

    this.loadingScoreboard.set(false);
  }

  async uploadScore(){

    try {
      this.supabase.uploadScore('snake', this.puntuacion);
      await this.getScoreboard();
    }catch (error) {
      console.error('Error al subir score:', error);
    }
  }


}