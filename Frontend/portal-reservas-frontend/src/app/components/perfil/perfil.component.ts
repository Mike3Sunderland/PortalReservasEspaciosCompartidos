import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario: any;

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit() {
    this.verificarAutenticacion();
  }

  verificarAutenticacion() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.router.navigate(['/login']);
    } else {
      this.cargarPerfil();
    }
  }

  cargarPerfil() {
      this.usuarioService.getPerfil().subscribe({
        next: (res) => {
          this.usuario = res;
        },
        error: (err) => {
          console.log('Error al cargar el perfil', err);
          if (err.status === 401 || err.status === 403) {
            localStorage.removeItem('authToken');
            this.router.navigate(['/login']);
          }
        }
      });
  }
}
