import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ResenaService } from '../../services/resena.service';
import { EspacioService } from 'src/app/services/espacio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resenas',
  templateUrl: './resenas.component.html',
  styleUrls: ['./resenas.component.css']
})
export class ResenasComponent implements OnInit, OnDestroy {
  resenas: any[] = [];
  espacios: any[] = [];
  nuevaResena = {
    comentario: '',
    calificacion: 1,
    espacio_nombre: ''
  };
  routeSub: Subscription | null = null;

  constructor(
    private resenaService: ResenaService, 
    private router: Router,
    private espacioService: EspacioService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.verificarAutenticacion();
    this.cargarEspacios();
    this.routeSub = this.route.paramMap.subscribe(params => {
      const espacioId = params.get('espacioId');
      if (espacioId) {
        this.cargarResenas(espacioId);
      }
    });
  }
  
  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }


  verificarAutenticacion() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.router.navigate(['/login']);
    }
  }

  cargarResenas(espacioId: string) {
    if (espacioId) {
      this.resenaService.getResenasEspacio(espacioId).subscribe(
        (data) => {
          this.resenas = data;
        },
        (error) => {
          console.error('Error al cargar reseñas:', error);
          alert('Hubo un error al cargar las reseñas.');
        }
      );
    } else {
      console.error('No se encontró un espacio válido');
    }
  }

  cargarEspacios() {
    this.espacioService.getEspacios().subscribe((data) => {
      this.espacios = data;
      if (this.espacios.length > 0 && this.espacios[0].id) {
        this.cargarResenas(this.espacios[0].id);
      }
    });
  }

  crearResena() {
    const usuarioId = localStorage.getItem('usuarioId');
    if (usuarioId) {
        const espacioSeleccionado = this.espacios.find(espacio => espacio.nombre === this.nuevaResena.espacio_nombre);
        
        if (espacioSeleccionado && espacioSeleccionado.id) {
            const resenaConUsuarioYEspacioId = { 
              ...this.nuevaResena, 
              usuario_id: usuarioId, 
              espacio_id: espacioSeleccionado.id 
            };
            
            this.resenaService.createResena(resenaConUsuarioYEspacioId).subscribe(
              () => {
                this.cargarResenas(espacioSeleccionado.id);
                this.nuevaResena = { comentario: '', calificacion: 1, espacio_nombre: '' };
              },
              (error) => {
                console.error('Error al crear reseña:', error);
                alert('Hubo un error al crear la reseña.');
              }
            );
        } else {
            console.error('No se encontró un espacio válido.');
            alert('No se pudo encontrar el espacio seleccionado.');
        }
    } else {
        alert('Usuario no autenticado.');
    }
  }
}
