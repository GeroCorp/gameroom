import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-soyyo',
  standalone: false,
  templateUrl: './soyyo.html',
  styleUrl: './soyyo.css'
})
export class Soyyo implements OnInit{


    userData: any;
  constructor(private githubSvc: GithubService) {}

    ngOnInit(): void {
    this.githubSvc.getUser()
      .then(data => {
        this.userData = data;
        console.log(this.userData)
      })
      .catch(err => console.error(err));
  }
      
}


