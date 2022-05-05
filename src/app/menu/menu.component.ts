import { environment } from 'src/environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  nome: string = environment.nome
  foto: string = environment.foto

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  sair(){
    environment.id = 0
    environment.nome = ''
    environment.token = ''
    environment.foto = ''
    environment.usuario = ''
    environment.tipo = ''

    this.router.navigate(['/entrar'])
  }

}
