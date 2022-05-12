import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagem: Postagem = new Postagem()

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


    let idPost = this.route.snapshot.params['id']
    this.buscarPostagemPorId(idPost)

  }

  buscarPostagemPorId(id: number) {
    this.postagemService.getPostagemById(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }

  apagarPostagem(){
    this.postagemService.deletePostagem(this.postagem.id).subscribe(()=>{
      alert("We'll miss you... 😥")
      this.router.navigate(['/inicio'])
    })
  }

}
