import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-soyyo',
  standalone: false,
  templateUrl: './soyyo.html',
  styleUrl: './soyyo.css'
})
export class Soyyo implements OnInit{

  isLoading: boolean = true;
  userData: any;
  constructor(
    private githubSvc: GithubService,  
    private cdRef: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.loadInfo();
  }

  async loadInfo(){
    try {
      this.isLoading = true;
      this.cdRef.detectChanges(); // Asegurar que se muestre el loading
      
      const data = await this.githubSvc.getUser();
      this.userData = data;
      
    } catch (e) {
      console.error(e);
    } finally {
      this.isLoading = false;
      this.cdRef.detectChanges(); // Asegurar que se oculte el loading
    }
  }


}

