import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Supabase } from '../../services/supabase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  formSubmitted = false;
  loginForm: FormGroup;
  constructor (private fb: FormBuilder, public supabase: Supabase, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['',[Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]]
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.loginForm.valid){
      const {email, password} = this.loginForm.value;
      this.supabase.login(email, password);
    }else{
      console.log('Formulario invalido: ');
    }
  }

  fastLog(btn: any){

    console.log(btn.target.value);
    switch (btn.target.value) {
      case "gero.":
        this.loginForm.setValue({email: "geromcorpus@gmail.com", password: "sombra24"});
        break;
      case "carlito":
        this.loginForm.setValue({email: "carlito@mail.com", password: "12312312"});
        break;
      case "juanjo":
        this.loginForm.setValue({email: "juanjo@mail.com", password: "12312312"});
        break;
    }
  }

}
