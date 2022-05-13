import { AlertasService } from './../../service/alertas.service';
import { Tema } from './../../model/Tema';
import { ActivatedRoute, Router } from '@angular/router';
import { TemaService } from './../../service/tema.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  tema: Tema = new Tema()

  constructor(
    private temaService: TemaService,
    private route: ActivatedRoute,
    private router: Router,
    private alerta: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0,0)

    if(environment.token == '') {
      this.alerta.showAlertDanger('Ai não né... =/')
      this.router.navigate(['/entrar'])
    }

    let idTema = this.route.snapshot.params['id']
    this.buscarTemaPorId(idTema)
  }

  buscarTemaPorId(id: number){
    this.temaService.getTemaById(id).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  editarTema() {
    this.tema.postagem = []
    this.temaService.putTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp;
      this.alerta.showAlertInfo('Tema atualizado')
      this.router.navigate(['/temas'])
    })
  }

}
