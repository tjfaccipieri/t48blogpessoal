import { AlertasService } from './../../service/alertas.service';
import { Tema } from './../../model/Tema';
import { TemaService } from './../../service/tema.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  tema: Tema = new Tema()
  idTema: number

  constructor(
    private router: Router,
    private temaService: TemaService,
    private route: ActivatedRoute,
    private alerta: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    if(environment.token == '') {
      this.alerta.showAlertDanger('Ai não né... =/')
      this.router.navigate(['/entrar'])
    }

    this.idTema = this.route.snapshot.params['id']
    this.buscarTemaPorId(this.idTema)
  }

  buscarTemaPorId(id: number){
    this.temaService.getTemaById(id).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  apagarTema(){
    this.temaService.deleteTema(this.idTema).subscribe(() => {
      this.alerta.showAlertInfo('Press F to pay respect')
      this.router.navigate(['/temas'])
    })
  }

}
