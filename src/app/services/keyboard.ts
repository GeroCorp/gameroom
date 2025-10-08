import { Injectable, computed, signal } from '@angular/core';

export interface KeyboardState {
  up: boolean;
  left: boolean;
  right: boolean;
  pause: boolean;
  down: boolean;
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
    down: false
  });

  // Mapeo de teclas para facil acceso
  private keyMap: { [key: string]: keyof KeyboardState } = {
    // 'tecla del teclado': 'acción'
    'ArrowUp': 'up',
    'ArrowLeft': 'left',
    'ArrowRight': 'right',
    'ArrowDown': 'down',
    'Space': 'pause',
    'KeyP': 'pause',
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
    // event.code = tecla presionada en teclado
    const mappedKey = this.keyMap[event.code];
    if (mappedKey) {
      event.preventDefault();
      
      // Solo activar si la tecla no estaba ya presionada (evitar repetición)
      if (!this.keyboardState()[mappedKey]) {
        this.setKeyState(mappedKey, true);
        
        
        // Volver a false para simular un "tap" y no mantener
        setTimeout(() => {
          this.setKeyState(mappedKey, false);
        }, 50); // 50ms es suficiente para que los effects lo detecten
      }
    }
  }

  // Setear el estado de una tecla específica
  // Key: tecla a actualizar
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
      down: false
    });
  }
}
