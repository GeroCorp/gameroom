import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { Log } from './log';
import { Login } from '../../components/login/login';
import { Register } from '../../components/register/register';

@NgModule({
  declarations: [
    Log,
    Login,
    Register
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: Log }
    ])
  ]
})
export class AuthModule { }