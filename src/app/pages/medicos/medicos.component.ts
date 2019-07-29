import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  totalRegistros = 0;
  cargando = true;

  constructor(public medicossService: MedicoService) {}

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicossService.cargarMedicos().subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.medicos = resp.medicos;
      this.cargando = false;
    });
  }

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this.medicossService
      .buscarMedico(termino)
      .subscribe((medicos: Medico[]) => {
        this.medicos = medicos;
      });
  }
  mostrarModal(id: string) {}
  borrarMedico(medico: Medico) {
    Swal.fire({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + medico.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminalo!',
      cancelButtonText: 'No, cancelalo!',
      reverseButtons: true
    }).then(result => {
      if (result.value) {
        this.medicossService.borrarMedico(medico._id).subscribe(resp => {
          this.cargarMedicos();
          Swal.fire('Eliminado!', 'Médico eliminado con éxito.', 'success');
          return;
        });
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire('Cancelado', 'El médico esta seguro :)', 'error');
      }
    });
  }
}
