import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  refreshToken() {
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }

  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.api}/usuarios/${id}`, this.token)
  }

  logar(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin> {
    return this.http.post<UsuarioLogin>(`${environment.api}/usuarios/logar`, usuarioLogin)
  }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.api}/usuarios/cadastrar`, usuario)
  }

  editar(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${environment.api}/usuarios/atualizar`, usuario, this.token)
  }

  logado(){
    let ok: boolean = false;
    if (environment.token != '') {
      ok = true
    }
    return ok
  }

  admin(){
    let ok: boolean = false;
    if (environment.tipo === 'adm' || environment.tipo === 'admin') {
      ok = true
    }
    return ok
  }

}
