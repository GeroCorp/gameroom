import { Component } from '@angular/core';

// referencias:
// 0 = vacía | 1 = borde | 2 = bloque fijo
export type Celda = number;

@Component({
  selector: 'app-grilla',
  standalone: false,
  templateUrl: './grilla.html',
  styleUrl: './grilla.css'
})
export class Grilla {

  rows = 10;
  cols = 20;

  public grid: Celda[][] = [];

  constructor() {
    this.initializeGrid();
  }

  private initializeGrid() {
    // inicializa la grilla con 0, osea está vacía
    this.grid = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
  }

  getCellClass(celda: Celda): string {
    return `color-${celda}`;
  }

}
