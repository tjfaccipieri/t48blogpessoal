import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css'],
})
export class UsuarioEditComponent implements OnInit {

  usuario: Usuario = new Usuario()
  confirmarSenha: string
  qtdPosts: number

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alerta: AlertasService
  ) {}

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ''){
      this.alerta.showAlertDanger('Ta tirando né?')
      this.router.navigate(['/inicio'])
    }

    let idUser = this.route.snapshot.params['id']
    this.buscarUsuarioPorId(idUser)
  }

  buscarUsuarioPorId(id: number){
    this.auth.getUsuarioById(id).subscribe((resp: Usuario)=>{
      this.usuario = resp
      this.usuario.senha = ''

      this.qtdPosts = this.usuario.postagem.length
    })
  }

  confirmSenha(event: any){
    this.confirmarSenha = event.target.value
  }

  editarUsuario(){
    this.auth.editar(this.usuario).subscribe((resp: Usuario) => {
      this.usuario = resp;
      this.alerta.showAlertSuccess('Usuário atualizado com sucesso, faça login novamente')

      environment.id = 0
      environment.nome = ''
      environment.token = ''
      environment.foto = ''
      environment.usuario = ''
      environment.tipo = ''

      this.router.navigate(['/entrar'])
    })
  }
}
