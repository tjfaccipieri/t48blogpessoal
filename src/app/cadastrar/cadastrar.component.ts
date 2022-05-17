import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css'],
})
export class CadastrarComponent implements OnInit {
  usuario: Usuario = new Usuario();
  confirmarSenha: string;
  tipoUsuario: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private alerta: AlertasService
  ) {}

  ngOnInit(): void {}

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value;
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value;
  }

  cadastrar() {
    this.usuario.tipo = this.tipoUsuario;

    if (this.usuario.senha == this.confirmarSenha) {
      this.auth.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp;
        this.alerta.showAlertSuccess(
          'Usuario cadastrado com sucesso, é noiz...♥'
        );
        this.router.navigate(['/entrar']);
      });
    } else {
      this.alerta.showAlertDanger('As senhas não coincidem.');
    }
  }

  validaNome() {
    console.log(this.usuario.nome.length);
    if (this.usuario.nome.length >= 3) {
      let usuarioNome = <HTMLInputElement>document.querySelector('#nome');
      console.log(usuarioNome.value.length);
      usuarioNome.style.border = '3px solid blue !important';
      usuarioNome.style.boxShadow = '0 0 1em blue !important';
    } else {
      let usuarioNome = <HTMLInputElement>document.querySelector('#nome');
      usuarioNome.style.border = '3px solid red !important';
      usuarioNome.style.boxShadow = '0 0 1em red';
    }
  }
}
