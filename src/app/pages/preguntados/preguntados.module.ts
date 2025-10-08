import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { Preguntados } from './preguntados';
import { Popup } from './popup/popup';

@NgModule({
  declarations: [
    Preguntados,
    Popup
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: Preguntados }
    ])
  ]
})
export class PreguntadosModule { }