import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  constructor(public usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
  }

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google) {
      this.usuario.correo = usuario.correo;
    }
    this.usuarioService.actualizarUsuario(this.usuario).subscribe();
  }
}
