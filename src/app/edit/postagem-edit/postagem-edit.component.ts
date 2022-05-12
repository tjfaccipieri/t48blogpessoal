import { TemaService } from './../../service/tema.service';
import { Postagem } from './../../model/Postagem';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostagemService } from 'src/app/service/postagem.service';
import { environment } from 'src/environments/environment.prod';
import { Tema } from 'src/app/model/Tema';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  postagem: Postagem = new Postagem()

  idTema: number
  listaTemas: Tema[]
  tema: Tema = new Tema()

  constructor(
    private postagemService: PostagemService,
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ''){
      alert('Você precisa estar logado para ficar aqui... 😎')
      this.router.navigate(['/entrar'])
    }

    this.buscarTemas()

    let idPost = this.route.snapshot.params['id']
    this.buscarPostagemPorId(idPost)
  }

  buscarTemas(){
    this.temaService.getTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  buscarTemaPorId() {
    this.temaService.getTemaById(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  buscarPostagemPorId(id: number) {
    this.postagemService.getPostagemById(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }

  editarPostagem() {
    this.postagem.tema = this.tema

    this.postagemService.putputagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp;
      alert('Postagem editada com sucesso')
      this.router.navigate(['/inicio'])
    })
  }

}
