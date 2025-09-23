import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Hangman {
  constructor (private http: HttpClient) {}

  // Lee el archivo txt con las palabras y las devuelve como un array de strings
  getWords(): Observable<string[]> {
    return this.http.get('assets/palabras.txt', {responseType: 'text'}).pipe(
      map((data: any) =>{
        return data.split(',').filter((word: string) => word.length > 0);
      })
    );
  }

}
