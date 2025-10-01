import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Supabase } from '../../services/supabase';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  formSubmitted = false;
  regForm: FormGroup;
  constructor (private fb: FormBuilder, public supabase: Supabase, private router: Router) {
    this.regForm = this.fb.group({
      email: ['',[Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
      password2: ['', [Validators.minLength(8), Validators.required]],
      name: ['', [Validators.required, Validators.minLength(4)]],
      age: ['', [Validators.required, Validators.min(10), Validators.max(100)]],
    });
    
  }

  
  async onSubmit(){

    this.formSubmitted = true;

    if (this.regForm.invalid){
      console.error('Formulario inválido');
      return;
    }
    try{
      const {email, password, name, surname, age} = this.regForm.value;
      this.supabase.register(email, password, name, age);
    }catch (err: any){
      console.error('Error en registro:', err);
    }
    
  }

  
  
}
