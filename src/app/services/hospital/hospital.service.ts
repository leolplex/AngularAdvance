import { Injectable } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  token: string;
  usuario: Usuario;

  constructor(
    public http: HttpClient,
    public router: Router,
    public subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  cargarHospitales() {
    const url = URL_SERVICIOS + '/hospital';
    return this.http.get(url);
  }
  obtenerHospital(id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url);
  }
  borrarHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url);
  }
  crearHospital(nombre: string) {
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this.token;
    return this.http.post(url, { nombre });
  }
  buscarHospital(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url).pipe(map((resp: any) => resp.hospitales));
  }
  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this.token;
    return this.http.put(url, hospital).pipe(
      map((resp: any) => {
        Swal.fire({
          title: 'Hospital actualizado',
          text: hospital.nombre,
          type: 'success',
          confirmButtonText: 'ok'
        });

        return true;
      })
    );
  }
}
