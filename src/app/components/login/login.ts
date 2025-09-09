import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginForm: FormGroup;
  constructor (private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['',[Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid){
      console.log('Formulario valido: ', this.loginForm.value);
    }else{
      console.log('Formulario invalido: ');
    }
  }

}
