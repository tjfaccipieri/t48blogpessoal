import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  listaTemas: Tema[]
  idTema: number
  tema: Tema = new Tema()

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]

  idUsuario = environment.id
  usuario: Usuario = new Usuario()

  constructor(
      private router: Router,
      private temaService: TemaService,
      private postagemService: PostagemService,
      private auth: AuthService
    ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ''){
      alert('Você precisa estar logado para ficar aqui... 😎')
      this.router.navigate(['/entrar'])
    }

    this.auth.refreshToken()

    this.buscarTemas()
    this.buscarPostagens()
  }

  buscarUsuarioPorId(){
    this.auth.getUsuarioById(this.idUsuario).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  buscarTemas(){
    this.temaService.getTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  buscarTemaPorId() {
    this.temaService.getTemaById(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
      console.log(this.tema)
    })
  }

  criarPostagem(){
    this.postagem.tema = this.tema

    this.usuario.id = this.idUsuario
    this.postagem.usuario = this.usuario

    console.log(this.postagem)

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp;
      alert('Postagem feita com sucesso');
      this.postagem = new Postagem()
      this.buscarPostagens()
    })
  }

  buscarPostagens() {
    this.postagemService.getPostagem().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp;
      console.log(this.listaPostagens)
    })
  }

}
