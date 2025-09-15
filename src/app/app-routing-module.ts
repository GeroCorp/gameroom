import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Soyyo } from './components/soyyo/soyyo';
import { Home } from './components/home/home';
import { Log } from './pages/log/log';
import { Register } from './components/register/register';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
