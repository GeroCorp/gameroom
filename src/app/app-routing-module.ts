import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Soyyo } from './components/soyyo/soyyo';
import { Home } from './components/home/home';
import { Log } from './pages/log/log';
import { Ahorcado } from './pages/ahorcado/ahorcado';
import { MayorMenor } from './pages/mayor-menor/mayor-menor';
import { SalaChat } from './components/sala-chat/sala-chat';

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
    "path": "chat", component: SalaChat
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
