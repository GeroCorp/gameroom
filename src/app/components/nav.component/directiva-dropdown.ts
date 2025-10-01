import { Directive, ElementRef, HostListener, Renderer2, OnDestroy } from '@angular/core';

@Directive({
  selector: '[dropDownMenu]',
  standalone: false
})
export class DirectivaDropdown implements OnDestroy {
  private isOpen = false;
  private clickListener?: () => void;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) { }

  @HostListener('click', ['$event']) toggleOpen(event: Event) { 
    event.preventDefault();
    event.stopPropagation();
    
    const dropdownMenu = this.element.nativeElement.nextElementSibling;
    
    if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
      this.isOpen = !this.isOpen;
      
      if (this.isOpen) {
        this.renderer.addClass(dropdownMenu, 'show');
        this.renderer.setAttribute(this.element.nativeElement, 'aria-expanded', 'true');
        this.addGlobalClickListener();
      } else {
        this.closeDropdown();
      }
    }
  }

  private closeDropdown() {
    const dropdownMenu = this.element.nativeElement.nextElementSibling;
    if (dropdownMenu) {
      this.renderer.removeClass(dropdownMenu, 'show');
      this.renderer.setAttribute(this.element.nativeElement, 'aria-expanded', 'false');
    }
    this.isOpen = false;
    this.removeGlobalClickListener();
  }

  private addGlobalClickListener() {
    this.clickListener = this.renderer.listen('document', 'click', (event) => {
      if (!this.element.nativeElement.contains(event.target)) {
        this.closeDropdown();
      }
    });
  }

  private removeGlobalClickListener() {
    if (this.clickListener) {
      this.clickListener();
      this.clickListener = undefined;
    }
  }

  ngOnDestroy() {
    this.removeGlobalClickListener();
  }
}
