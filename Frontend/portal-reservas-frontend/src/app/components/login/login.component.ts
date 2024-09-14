import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  contrasena: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  login() {
    const usuario = { email: this.email, contrasena: this.contrasena };
    this.usuarioService.login(usuario).subscribe({
      next: (res) => {
        localStorage.setItem('authToken', res.access_token);
        localStorage.setItem('usuarioId', res.usuario_id);
        this.router.navigate(['/espacios']);
      },
      error: (err) => {
        console.log('Error en el inicio de sesión', err);
      }
    });
  }
}
