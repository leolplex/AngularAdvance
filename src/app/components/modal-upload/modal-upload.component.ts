import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public cargaArchivoService: SubirArchivoService,
    public modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {}

  seleccionImagen(archivo: File) {
    // this.usuario.img;
    console.log(archivo);

    if (archivo.type.indexOf('image') < 0) {
      Swal.fire({
        title: 'Sólo imagenes',
        text: 'El archivo seleccionado no es una imagen',
        type: 'error',
        confirmButtonText: 'ok'
      });
      this.imagenSubir = null;
      return;
    }

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => (this.imagenTemp = reader.result.toString());
  }

  subirImagen() {
    this.cargaArchivoService
      .subirArchivo(
        this.imagenSubir,
        this.modalUploadService.tipo,
        this.modalUploadService.id
      )
      .then(resp => {
        this.modalUploadService.notification.emit(resp);
        this.cerrarModal();
      })
      .catch(err => {
        console.log('Error en la carga... ');
      });
  }
  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this.modalUploadService.ocultarModal();
  }
}
