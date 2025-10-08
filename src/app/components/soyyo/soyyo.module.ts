import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Soyyo } from './soyyo';

@NgModule({
  declarations: [
    Soyyo
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: Soyyo }
    ])
  ]
})
export class SoyyoModule { }