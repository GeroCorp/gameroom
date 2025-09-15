import { Component } from '@angular/core';
import { Login } from '../../components/login/login';
import { ActivatedRoute } from '@angular/router';
import { Register } from '../../components/register/register';

@Component({
  selector: 'app-log',
  standalone: false,
  templateUrl: './log.html',
  styleUrl: './log.css'
})
export class Log {

  nashe : string = "";

  constructor(public route: ActivatedRoute) {}
  
  
  
  ngOnInit() {
    this.route.url.subscribe(([url]) => {
      const {path, parameters} = url;
      this.nashe = path;
    })
  }
}
