import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  usuario: Usuario = new Usuario()
  confirmarSenha: string
  tipoUsuario: string

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  confirmSenha(event: any){
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
    console.log(this.tipoUsuario)
  }

  cadastrar() {
    this.usuario.tipo = this.tipoUsuario

    if (this.usuario.senha == this.confirmarSenha){
      this.auth.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        console.log(this.usuario)
        this.usuario = resp
        alert('Usuario cadastrado com sucesso, é noiz...♥')
        this.router.navigate(['/entrar'])
      })
    } else {
      alert('As senhas não coincidem.')
    }
  }

}
