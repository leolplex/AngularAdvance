import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function initi_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  recuerdame = false;
  correo: string;

  constructor(public router: Router, public usuarioService: UsuarioService) {}

  ngOnInit() {
    initi_plugins();
    this.correo = localStorage.getItem('correo') || '';
    if (this.correo.length > 1) {
      this.recuerdame = true;
    }
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }

    const usuarioLogin = new Usuario(
      null,
      forma.value.correo,
      forma.value.password
    );
    this.usuarioService
      .login(usuarioLogin, forma.value.recuerdame)
      .subscribe(correcto => this.router.navigate(['dashboard']));
  }
}
