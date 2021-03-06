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
    return this.http.get<Tema[]>(`${environment.api}/temas`, this.token)
  }

  getTemaById(id: number): Observable<Tema>{
    return this.http.get<Tema>(`${environment.api}/temas/${id}`, this.token)
  }

  postTema(tema: Tema): Observable<Tema>{
    return this.http.post<Tema>(`${environment.api}/temas`, tema, this.token)
  }

  putTema(tema: Tema): Observable<Tema>{
    return this.http.put<Tema>(`${environment.api}/temas`, tema, this.token)
  }

  deleteTema(id: number) {
    return this.http.delete(`${environment.api}/temas/${id}`, this.token)
  }
}
