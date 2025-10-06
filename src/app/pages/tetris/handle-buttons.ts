import { Directive, ElementRef, HostListener, Renderer2, Input, inject } from '@angular/core';
import { Keyboard } from '../../services/keyboard';

@Directive({
  selector: '[appHandleButtons]',
  standalone: false
})
export class HandleButtons {
  @Input('appHandleButtons') buttonAction!: 'up' | 'left' | 'right' | 'drop' | 'pause' | 'reset' | 'hold';
  
  private keyboard = inject(Keyboard);
  
  // Mapeo de acciones a teclas
  private actionKeyMap: { [key: string]: string[] } = {
    'up': ['ArrowUp'],
    'left': ['ArrowLeft'],
    'right': ['ArrowRight'],
    'drop': ['ArrowDown'],
    'pause': ['KeyP'],
    'reset': ['KeyR'],
    'hold': ['Space']
  };

  constructor(
    private button: ElementRef,
    private renderer: Renderer2
  ) { }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    // Verificar si la tecla presionada corresponde a la acción de este botón
    const actionKeys = this.actionKeyMap[this.buttonAction];
    
    if (actionKeys && actionKeys.includes(event.code)) {
      console.log(`Tecla ${event.code} presionada para acción: ${this.buttonAction}`);
      
      this.activateButton();
      
      // click en el botón
      this.button.nativeElement.click();
    }
  }

  @HostListener('click')
  onButtonClick() {
    // Cuando se hace click en el botón, también activar el efecto visual
    this.activateButton();
  }

  private activateButton() { // Metodo para activar el botón visualmente
    // agrega la clase de activación
    this.renderer.addClass(this.button.nativeElement, 'button-pressed');
    
    // eliminar la clase después de un tiempo
    setTimeout(() => {
      this.renderer.removeClass(this.button.nativeElement, 'button-pressed');
    }, 150);
  }
}
