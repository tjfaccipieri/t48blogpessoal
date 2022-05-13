import { AlertasService } from './../service/alertas.service';
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
    private temaService: TemaService,
    private alerta: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if (environment.token == '') {
      this.alerta.showAlertDanger('Vai pá onde???')
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
    this.temaService.postTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp;
      this.alerta.showAlertSuccess('Tema cadastrado com sucesso')
      this.tema = new Tema()
      this.buscarTemas()
    })
  }

}
