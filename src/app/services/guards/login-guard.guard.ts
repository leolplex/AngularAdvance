import { Injectable } from '@angular/core';

import { CanActivate } from '@angular/router/src/utils/preactivation';
import { UsuarioService } from '../usuario/usuario.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuarg implements CanActivate {
  path: import('@angular/router').ActivatedRouteSnapshot[];
  route: import('@angular/router').ActivatedRouteSnapshot;

  constructor(public usuarioService: UsuarioService, public router: Router) {}

  canActivate() {
    if (this.usuarioService.estaLogueado()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
