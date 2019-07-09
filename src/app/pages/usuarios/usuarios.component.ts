import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;

  constructor(
    public usuariosService: UsuarioService,
    public modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
    this.modalUploadService.notification.subscribe(resp => {
      this.cargarUsuarios();
    });
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuariosService.cargarUsuarios(this.desde).subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }
    this.desde += valor;

    this.cargarUsuarios();
  }

  buscarUsuarios(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.usuariosService
      .buscarUsuarios(termino)
      .subscribe((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      });
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this.usuariosService.usuario._id) {
      Swal.fire({
        title: 'No puede borrar usuario',
        text: 'No se puede borrar a si mismo',
        type: 'error',
        confirmButtonText: 'ok'
      });
      return;
    }

    Swal.fire({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminalo!',
      cancelButtonText: 'No, cancelalo!',
      reverseButtons: true
    }).then(result => {
      if (result.value) {
        this.usuariosService.borrarUsuario(usuario._id).subscribe(resp => {
          console.log(resp);
          this.cargarUsuarios();
          Swal.fire('Eliminado!', 'Usuario eliminado con exito.', 'success');
          return;
        });
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire('Cancelado', 'El usuario esta seguro :)', 'error');
      }
    });
  }

  guardarUsuario(usuario: Usuario) {
    this.usuariosService.actualizarUsuario(usuario).subscribe();
  }

  mostrarModal(id: string) {
    this.modalUploadService.mostrarModal('usuarios', id);
  }
}
