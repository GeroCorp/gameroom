import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { Chat } from './chat';
import { FormatearTiempoPipe } from '../../pipes/formatear-tiempo-pipe';
import { Supabase } from '../../services/supabase';

@NgModule({
  declarations: [
    Chat,
    FormatearTiempoPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: Chat }
    ])
  ],
  providers: [
    Supabase
  ]
})
export class ChatModule { }