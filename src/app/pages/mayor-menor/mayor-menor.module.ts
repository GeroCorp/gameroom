import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MayorMenor } from './mayor-menor';
import { Popup } from './popup/popup';

@NgModule({
  declarations: [
    MayorMenor,
    Popup
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: MayorMenor }
    ])
  ]
})
export class MayorMenorModule { }