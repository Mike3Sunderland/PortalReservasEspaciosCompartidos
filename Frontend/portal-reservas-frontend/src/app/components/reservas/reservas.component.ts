import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservaService } from '../../services/reserva.service';
import { EspacioService } from 'src/app/services/espacio.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  reservas: any[] = [];
  nuevaReserva = {
    fecha: '',
    horaInicio: '',
    horaFin: '',
    espacio_nombre: ''
  };
  espacios: any[] = [];
  constructor(private reservaService: ReservaService, private espacioService: EspacioService, private router: Router) {}

  ngOnInit(): void {
    this.verificarAutenticacion();
  }

  verificarAutenticacion() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.router.navigate(['/login']);
    } else {
      this.cargarReservas();
      this.cargarEspacios();
    }
  }

  cargarEspacios() {
    this.espacioService.getEspacios().subscribe((data) => {
      this.espacios = data;
    });
  }

  crearReserva() {
    this.reservaService.createReserva(this.nuevaReserva).subscribe(() => {
      this.cargarReservas();
      this.nuevaReserva = { fecha: '', horaInicio: '', horaFin: '', espacio_nombre: '' };
    });
  }

  cargarReservas() {
    const usuarioId = localStorage.getItem('usuarioId');
    if (usuarioId) {
        this.reservaService.getReservasUsuario(usuarioId).subscribe((data) => {
            this.reservas = data;
        });
    } else {
        alert('Usuario no autenticado.');
    }
  }


  cancelarReserva(id: string) {
    this.reservaService.cancelReserva(id).subscribe(() => {
      this.cargarReservas();
    });
  }

  obtenerNombreEspacio(espacioId: string): string {
    const espacio = this.espacios.find(e => e.id === espacioId);
    return espacio ? espacio.nombre : 'Espacio no encontrado';
  }
  

}
