import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';

import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { HospitalService } from '../../services/hospital/hospital.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];
  totalRegistros = 0;
  cargando = true;
  constructor(
    public hospitalesService: HospitalService,
    public modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarHospitales();
    this.modalUploadService.notification.subscribe(resp => {
      this.cargarHospitales();
    });
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalesService.cargarHospitales().subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.hospitales = resp.hospitales;
      this.cargando = false;
    });
  }
  buscarHospitales(termino: string) {}
  mostrarModal(id: string) {
    this.modalUploadService.mostrarModal('hospital', id);
  }
  crearHospital(nombre: string) {
    return this.hospitalesService.crearHospital(nombre);
  }
  guardarHospital(hospital: Hospital) {
    this.hospitalesService.actualizarHospital(hospital).subscribe(result => {
      this.cargarHospitales();
    });
  }
  borrarHospital(hospital: Hospital) {
    Swal.fire({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + hospital.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminalo!',
      cancelButtonText: 'No, cancelalo!',
      reverseButtons: true
    }).then(result => {
      if (result.value) {
        this.hospitalesService.borrarHospital(hospital._id).subscribe(resp => {
          console.log(resp);
          this.cargarHospitales();
          Swal.fire('Eliminado!', 'Hospital eliminado con exito.', 'success');
          return;
        });
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire('Cancelado', 'El hospital esta seguro :)', 'error');
      }
    });
  }
  mostrarModalNuevoHospital() {
    Swal.fire({
      title: 'Nombre del hospital',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true
    }).then(result => {
      if (result.value) {
        return this.crearHospital(result.value).subscribe(resp => {
          Swal.fire(
            'Creado con éxito!',
            'Hospital creado con exito.',
            'success'
          );
          this.cargarHospitales();
        });
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire('Cancelado', 'El hospital esta seguro :)', 'error');
      }
    });
  }
}
