import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './components/home/home';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

// Lazy loading implementado para optimizar la carga de la aplicación
// Los módulos se cargan solo cuando son necesarios

const routes: Routes = [
  {
    path: "", 
    component: Home,
  },
  {
    path: "login", 
    loadChildren: () => import('./pages/log/auth.module').then(m => m.AuthModule),
    canActivate: [guestGuard] // Solo usuarios NO autenticados pueden ver login
  },
  {
    path: "register", 
    loadChildren: () => import('./pages/log/auth.module').then(m => m.AuthModule),
    canActivate: [guestGuard] // Solo usuarios NO autenticados pueden ver register
  },
  {
    path: "quiensoy", 
    loadChildren: () => import('./components/soyyo/soyyo.module').then(m => m.SoyyoModule),
  },
  {
    path: "ahorcado", 
    loadChildren: () => import('./pages/ahorcado/ahorcado.module').then(m => m.AhorcadoModule),
    canActivate: [authGuard] // Solo usuarios autenticados
  },
  {
    path: "mayormenor", 
    loadChildren: () => import('./pages/mayor-menor/mayor-menor.module').then(m => m.MayorMenorModule),
    canActivate: [authGuard] // Solo usuarios autenticados
  },
  {
    path: "preguntados", 
    loadChildren: () => import('./pages/preguntados/preguntados.module').then(m => m.PreguntadosModule),
    canActivate: [authGuard] // Solo usuarios autenticados
  },
  {
    path: "snake", 
    loadChildren: () => import('./pages/snake/snake.module').then(m => m.SnakeModule),
    canActivate: [authGuard] // Solo usuarios autenticados
  },
  {
    path: "chat", 
    loadChildren: () => import('./components/chat/chat.module').then(m => m.ChatModule),
    canActivate: [authGuard] // Solo usuarios autenticados
  },
  {
    path: "leaderboard", 
    loadChildren: () => import('./components/scoreboard/scoreboard.module').then(m => m.ScoreboardModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
