import { Component } from '@angular/core';
import { Supabase } from '../../services/supabase';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {


  constructor(public supabase: Supabase){}
  
}
