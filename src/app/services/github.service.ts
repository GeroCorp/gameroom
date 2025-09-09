import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Octokit } from '@octokit/core';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  // private apiVersionHeader = { 'X-GitHub-Api-Version': '2022-11-28' };

  // constructor(private http: HttpClient) {}

  // getUser(username: string): Observable<any> {
  //   const headers = new HttpHeaders({
  //     Accept: 'application/vnd.github+json',
  //     ...this.apiVersionHeader
  //   });
  //   return this.http.get(`https://api.github.com/users/${username}`, { headers });
  // }

  private octokit: Octokit;

  constructor() {
    this.octokit = new Octokit({

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
