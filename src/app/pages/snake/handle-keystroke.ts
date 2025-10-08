import { Directive, ElementRef, Host, HostListener, Input, Renderer2 } from '@angular/core';
import { Keyboard } from '../../services/keyboard';
@Directive({
  selector: '[HandleKeystroke]',
  standalone: false
})
export class HandleKeystroke {

  // Recibe la acción asociada a la tecla, solo puede ser una de las siguientes
  @Input('HandleKeystroke') keyAction!: 'up' | 'down' | 'left' | 'right' | 'pause';

  private actions: { [key: string]: string[] } = {
    up: ['ArrowUp'],
    down: ['ArrowDown'],
    left: ['ArrowLeft'],
    right: ['ArrowRight'],
    pause: ['Space', 'KeyP']
  };

  constructor(
    private button: ElementRef,
    private renderer: Renderer2
  ) { }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    event.preventDefault();

    const actionKey = this.actions[this.keyAction];

    // comprobar si la tecla presionada corresponde a la acción del botón
    if (actionKey && actionKey.includes(event.code)) {

      this.activateButton();

      // simular click en el botón
      this.button.nativeElement.click();

    }

  }
  

  @HostListener('click')
  onButtonClick() {
    // activar efecto visual al presionar el botón (pero con click)
    this.activateButton();
  }

  private activateButton() {
    // activar efecto visual de botón presionado
    this.renderer.addClass(this.button.nativeElement, 'button-pressed');

    // eliminar la clase inmediatamente después de presionar
    setTimeout(() => {
      this.renderer.removeClass(this.button.nativeElement, 'button-pressed');
    }, 150);
  }

}
