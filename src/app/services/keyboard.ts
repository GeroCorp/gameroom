import { Injectable, computed, signal } from '@angular/core';

export interface KeyboardState {
  up: boolean;
  left: boolean;
  right: boolean;
  pause: boolean;
  reset: boolean;
  drop: boolean;
  hold: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class Keyboard {
  // Estado de las teclas presionadas
  private keyboardState = signal<KeyboardState>({
    up: false,
    left: false,
    right: false,
    pause: false,
    reset: false,
    drop: false,
    hold: false
  });

  // Mapeo de teclas para facil acceso
  private keyMap: { [key: string]: keyof KeyboardState } = {
    'ArrowUp': 'up',
    'ArrowLeft': 'left',
    'ArrowRight': 'right',
    'ArrowDown': 'drop',
    'KeyS': 'drop',
    'Space': 'hold',
    'KeyP': 'pause',
    'KeyR': 'reset',
    'KeyH': 'hold'
  };

  constructor() {
    this.initKeyboardListeners();
  }

  // listeners del teclado
  private initKeyboardListeners() {
    // Solo escuchar cuando se presiona una tecla
    document.addEventListener('keydown', (event) => {
      this.handleKeyDown(event);
    });
  }

  private handleKeyDown(event: KeyboardEvent) {
    const mappedKey = this.keyMap[event.code];
    if (mappedKey) {
      event.preventDefault();
      
      // Solo activar si la tecla no estaba ya presionada (evitar repetición)
      if (!this.keyboardState()[mappedKey]) {
        this.setKeyState(mappedKey, true);
        console.log(`Tecla presionada: ${event.code} -> ${mappedKey}`);
        
        // Volver a false para simular un "tap" y no mantener
        setTimeout(() => {
          this.setKeyState(mappedKey, false);
        }, 50); // 50ms es suficiente para que los effects lo detecten
      }
    }
  }

  private setKeyState(key: keyof KeyboardState, pressed: boolean) {
    this.keyboardState.update(state => ({
      ...state,
      [key]: pressed
    }));
  }

  // Método para verificar si una tecla específica está presionada
  isKeyPressed(key: keyof KeyboardState): boolean {
    return this.keyboardState()[key];
  }

  // Limpiar estados 
  clearAllKeys() {
    this.keyboardState.set({
      up: false,
      left: false,
      right: false,
      pause: false,
      reset: false,
      drop: false,
      hold: false
    });
  }
}
