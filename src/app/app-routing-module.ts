import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Soyyo } from './components/soyyo/soyyo';
import { Home } from './components/home/home';
import { Log } from './pages/log/log';
import { Ahorcado } from './pages/ahorcado/ahorcado';
import { MayorMenor } from './pages/mayor-menor/mayor-menor';
import { Chat } from './components/chat/chat';

// Implementar lazy loading para optimizar <-- (login, register, quien soy)
// ademasd de guards para rutas que requieren auth


const routes: Routes = [
  {
    "path": "", component:Home
  },
  {
    "path": "login", component: Log
  },
  {
    "path": "register", component: Log
  },
  {
    "path": "quiensoy", component: Soyyo
  },
  {
    "path": "ahorcado", component: Ahorcado
  },
  {
    "path": "mayormenor", component: MayorMenor
  },
  {
    "path": "chat", component: Chat
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
