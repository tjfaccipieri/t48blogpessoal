import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if (environment.token == '') {
      alert('Vai pá onde???')
      this.router.navigate(['/entrar'])
    }
  }

}
