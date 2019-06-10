import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function initi_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  recuerdame = false;
  correo: string;

  auth2: any;

  constructor(public router: Router, public usuarioService: UsuarioService) {}

  ngOnInit() {
    initi_plugins();
    this.googleInit();
    this.correo = localStorage.getItem('correo') || '';
    if (this.correo.length > 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '223305126561-ji8h0ivifb2rr7oqqpjh2d038rn4mah0.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this.usuarioService
        .loginGoogle(token)
        .subscribe(correcto => (window.location.href = '#/dashboard'));
    });
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
