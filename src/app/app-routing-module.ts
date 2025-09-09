import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './components/login/login';
import { App } from './app';
import { Soyyo } from './components/soyyo/soyyo';

const routes: Routes = [
  {
    "path": "", component: App
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
