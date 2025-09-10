import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Octokit } from '@octokit/core';
import { environment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class GithubService {


  private octokit: Octokit;

  constructor() {
    this.octokit = new Octokit({
      auth: environment.githubToken
    });
  }


  async getUser() {
    try {
      const response = await this.octokit.request("GET /users/{username}", {
        username: 'GeroCorp',
        headers:{
          'X-GitHub-Api-Version': '2022-11-28'
        }
      })
      return response.data; // devuelve los datos del usuario
    } catch (err) {
      console.error('Error al obtener usuario:', err);
      throw err;
    }
  }
}
