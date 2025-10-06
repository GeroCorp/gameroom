import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Soyyo } from './components/soyyo/soyyo';
import { Home } from './components/home/home';
import { Log } from './pages/log/log';
import { Ahorcado } from './pages/ahorcado/ahorcado';
import { MayorMenor } from './pages/mayor-menor/mayor-menor';
import { Chat } from './components/chat/chat';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';
import { Preguntados } from './pages/preguntados/preguntados';
import { Scoreboard } from './components/scoreboard/scoreboard';

// Implementar lazy loading para optimizar <-- (login, register, quien soy)
// ademasd de guards para rutas que requieren auth


const routes: Routes = [
  {
    "path": "", 
    component: Home,
  },
  {
    "path": "login", 
    component: Log,
    canActivate: [guestGuard] // Solo usuarios NO autenticados pueden ver login
  },
  {
    "path": "register", 
    component: Log,
    canActivate: [guestGuard] // Solo usuarios NO autenticados pueden ver register
  },
  {
    "path": "quiensoy", 
    component: Soyyo,
  },
  {
    "path": "ahorcado", 
    component: Ahorcado,
    canActivate: [authGuard] // Solo usuarios autenticados
  },
  {
    "path": "mayormenor", 
    component: MayorMenor,
    canActivate: [authGuard] // Solo usuarios autenticados
  },
  {
    "path": "preguntados", 
    component: Preguntados,
    canActivate: [authGuard] // Solo usuarios autenticados
  },
  {
    "path": "chat", 
    component: Chat,
    canActivate: [authGuard] // Solo usuarios autenticados
  },
  {
    "path": "leaderboard", 
    component: Scoreboard,
    canActivate: [authGuard] // Solo usuarios autenticados
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
