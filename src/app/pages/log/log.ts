import { Component } from '@angular/core';
import { Login } from '../../components/login/login';
import { ActivatedRoute, Router } from '@angular/router';
import { Register } from '../../components/register/register';

@Component({
  selector: 'app-log',
  standalone: false,
  templateUrl: './log.html',
  styleUrl: './log.css'
})
export class Log {

  url : string = "";

  constructor(public route: ActivatedRoute, private router: Router) {}
  
  ngOnInit() {
    // Obtener la URL actual para determinar si es login o register
    const currentUrl = this.router.url;
    console.log('Current URL:', currentUrl);
    
    // Detectar basándose en la URL completa
    if (currentUrl === '/login' || currentUrl.startsWith('/login')) {
      this.url = 'login';
    } else if (currentUrl === '/register' || currentUrl.startsWith('/register')) {
      this.url = 'register';
    } else {
      // Por defecto mostrar login
      this.url = 'login';
    }
    
    console.log('URL set to:', this.url);
  }
}
