import { Postagem } from './../model/Postagem';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getPostagem(): Observable<Postagem[]> {
    return this.http.get<Postagem[]>(`${environment.api}/postagens`, this.token)
  }

  getPostagemById(id: number): Observable<Postagem> {
    return this.http.get<Postagem>(`${environment.api}/postagens/${id}`, this.token)
  }

  getPostagemByTitulo(titulo: string): Observable<Postagem[]> {
    return this.http.get<Postagem[]>(`${environment.api}/postagens/titulo/${titulo}`, this.token)
  }

  postPostagem(postagem: Postagem): Observable<Postagem> {
    return this.http.post<Postagem>(`${environment.api}/postagens`, postagem, this.token)
  }

  putputagem(postagem: Postagem): Observable<Postagem> {
    return this.http.post<Postagem>(`${environment.api}/postagens`, postagem, this.token)
  }

  deletePostagem(id: number) {
    return this.http.delete(`${environment.api}/postagens/${id}`, this.token)
  }
}
