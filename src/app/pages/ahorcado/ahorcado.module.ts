import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { Ahorcado } from './ahorcado';
import { PopupEstado } from './popup-estado/popup-estado';

@NgModule({
  declarations: [
    Ahorcado,
    PopupEstado
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: Ahorcado }
    ])
  ]
})
export class AhorcadoModule { }