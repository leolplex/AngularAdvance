import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(public usuarioService: UsuarioService) {}

  canActivate() {
    if (this.usuarioService.usuario.role === 'ADMIN_ROLE') {
      return true;
    } else {
      console.error('Bloqueado por el ADMIN GUARD');
      this.usuarioService.logout();
      return false;
    }
  }
}
