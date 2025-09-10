import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-soyyo',
  standalone: false,
  templateUrl: './soyyo.html',
  styleUrl: './soyyo.css'
})
export class Soyyo implements OnInit{


    userData: any;
  constructor(private githubSvc: GithubService,  private cdRef: ChangeDetectorRef) {}

  async ngOnInit() {
    try {
      const data = await this.githubSvc.getUser();
      this.userData = data;
      this.cdRef.detectChanges();
      console.log(this.userData);
    }catch (e){
      console.error(e);
      
    }
  }
}

