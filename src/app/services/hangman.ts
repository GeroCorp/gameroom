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

  getHangmanImages(): string[] {
    return [
      'https://wwuhskpyfqbxnfwnzxth.supabase.co/storage/v1/object/public/Hang-man/hangman_0.png',
      'https://wwuhskpyfqbxnfwnzxth.supabase.co/storage/v1/object/public/Hang-man/hangman_1.png',
      'https://wwuhskpyfqbxnfwnzxth.supabase.co/storage/v1/object/public/Hang-man/hangman_2.png',
      'https://wwuhskpyfqbxnfwnzxth.supabase.co/storage/v1/object/public/Hang-man/hangman_3.png',
      'https://wwuhskpyfqbxnfwnzxth.supabase.co/storage/v1/object/public/Hang-man/hangman_4.png',
      'https://wwuhskpyfqbxnfwnzxth.supabase.co/storage/v1/object/public/Hang-man/hangman_5.png',
      'https://wwuhskpyfqbxnfwnzxth.supabase.co/storage/v1/object/public/Hang-man/hangman_6.png'
    ]
  }

}
