import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema[]

  constructor(
    private router: Router,
    private temaService: TemaService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if (environment.token == '') {
      alert('Vai pá onde???')
      this.router.navigate(['/entrar'])
    }

    this.buscarTemas()
  }

  buscarTemas(){
    this.temaService.getTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  cadastrarTema() {
    console.log(this.tema)
    this.temaService.postTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp;
      alert('Tema cadastrado com sucesso')
      this.tema = new Tema()
      this.buscarTemas()
    })
  }

}
