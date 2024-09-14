import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EspacioService } from '../../services/espacio.service';

@Component({
  selector: 'app-espacios',
  templateUrl: './espacios.component.html',
  styleUrls: ['./espacios.component.css']
})
export class EspaciosComponent implements OnInit {
  espacios: any[] = [];
  nuevoEspacio = {
    nombre: '',
    ubicacion: '',
    descripcion: '',
    precioPorHora: ''
  };

  constructor(private espacioService: EspacioService, private router:Router) {}

  ngOnInit(): void {
    this.verificarAutenticacion();
  }

  verificarAutenticacion() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.router.navigate(['/login']);
    } else {
      this.cargarEspacios();
    }
  }

  cargarEspacios() {
    this.espacioService.getEspacios().subscribe((data) => {
      this.espacios = data;
    });
  }

  crearEspacio() {
    const usuarioId = localStorage.getItem('usuarioId');
    if (usuarioId) {
      const espacioConUsuario = { ...this.nuevoEspacio, usuario_id: usuarioId };
      this.espacioService.createEspacio(espacioConUsuario).subscribe(() => {
        this.cargarEspacios();
        this.nuevoEspacio = { nombre: '', ubicacion: '', descripcion: '', precioPorHora: '' };
      });
    } else {
      alert('Usuario no autenticado.');
    }
  }

  eliminarEspacio(id: string) {
    this.espacioService.deleteEspacio(id).subscribe(() => {
      this.cargarEspacios();
    });
  }
}
