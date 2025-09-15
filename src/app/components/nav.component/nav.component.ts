import { Component } from '@angular/core';
import { Supabase } from '../../services/supabase';

@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {


  constructor(public supabase: Supabase){

  }

  

  logout(){
    this.supabase.logout();
  }

}
