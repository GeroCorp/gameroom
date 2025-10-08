import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { Snake } from './snake';
import { HandleKeystroke } from './handle-keystroke';
import { SnakePopup } from './snake-popup/snake-popup';

@NgModule({
  declarations: [
    Snake,
    HandleKeystroke,
    SnakePopup
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: Snake }
    ])
  ]
})
export class SnakeModule { }