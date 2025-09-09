import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Soyyo } from './components/soyyo/soyyo';
import { Home } from './components/home/home';

const routes: Routes = [
  {
    "path": "", component:Home
  },
  {
    "path": "login", component: Login
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
