import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  constructor(public http: HttpClient, public usuarioService: UsuarioService) {}

  cargarMedicos() {
    const url = URL_SERVICIOS + '/medico';
    return this.http.get(url);
  }

  cargarMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url);
  }

  buscarMedico(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url).pipe(map((resp: any) => resp.medicos));
  }
  borrarMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this.usuarioService.token;
    return this.http.delete(url);
  }

  guardarMedico(medico: Medico) {
    let url = URL_SERVICIOS + '/medico';
    if (medico._id) {
      // actualizando
      url += '/' + medico._id;
      url += '?token=' + this.usuarioService.token;

      return this.http.put(url, medico).pipe(
        map((resp: any) => {
          Swal.fire('Actualizado con éxito!', 'Médico actualizado con éxito.', 'success');
          return resp.medico;
        })
      );
    } else {
      // creando
      url += '?token=' + this.usuarioService.token;

      return this.http.post(url, medico).pipe(
        map((resp: any) => {
          Swal.fire('Creado con éxito!', 'Médico creado con éxito.', 'success');
          return resp.medico;
        })
      );
    }
  }
}
