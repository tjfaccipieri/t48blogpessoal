import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { UsuarioLogin } from './../model/UsuarioLogin';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css'],
})
export class EntrarComponent implements OnInit {
  usuarioLogin: UsuarioLogin = new UsuarioLogin();

  constructor(
    private auth: AuthService,
    private router: Router,
    private alerta: AlertasService
  ) {}

  ngOnInit(): void {}

  logar() {
    this.auth.logar(this.usuarioLogin).subscribe({
      next: (resp: UsuarioLogin) => {
        this.usuarioLogin = resp;

        environment.id = this.usuarioLogin.id;
        environment.nome = this.usuarioLogin.nome;
        environment.token = this.usuarioLogin.token;
        environment.foto = this.usuarioLogin.foto;
        environment.usuario = this.usuarioLogin.usuario;
        environment.tipo = this.usuarioLogin.tipo;

        this.router.navigate(['/inicio']);
      },
      error: (error) => {
        if (error.status == 401) {
          this.alerta.showAlertDanger('Usuário e/ou senha inválidos');
        }
      },
    });
  }
}
