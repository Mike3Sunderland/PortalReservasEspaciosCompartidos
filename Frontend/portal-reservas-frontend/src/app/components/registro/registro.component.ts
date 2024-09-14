import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  email = '';
  contrasena = '';
  errorMessage = ''; 

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  registrar() {
    const usuario = { email: this.email, contrasena: this.contrasena };
    this.usuarioService.createUsuario(usuario).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = 'Error en el registro: ' + (err.error.msg || 'Por favor, intenta de nuevo');
      }
    });
  }
}
