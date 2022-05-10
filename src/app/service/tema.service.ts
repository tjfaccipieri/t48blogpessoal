import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getTemas(): Observable<Tema[]>{
    return this.http.get<Tema[]>('https://blogpessoalthiago.herokuapp.com/temas', this.token)
  }

  getTemaById(id: number): Observable<Tema>{
    return this.http.get<Tema>(`https://blogpessoalthiago.herokuapp.com/temas/${id}`, this.token)
  }

  postTema(tema: Tema): Observable<Tema>{
    return this.http.post<Tema>('https://blogpessoalthiago.herokuapp.com/temas', tema, this.token)
  }

  putTema(tema: Tema): Observable<Tema>{
    return this.http.put<Tema>('https://blogpessoalthiago.herokuapp.com/temas', tema, this.token)
  }

  deleteTema(id: number) {
    return this.http.delete(`https://blogpessoalthiago.herokuapp.com/temas/${id}`, this.token)
  }
}
