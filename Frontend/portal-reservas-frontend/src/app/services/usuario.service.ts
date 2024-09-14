import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  createUsuario(usuario: { email: string, contrasena: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuarios`, usuario);
  }

  login(usuario: { email: string, contrasena: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, usuario);
  }

  getPerfil(): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No se encontró el token en localStorage');
      return throwError('Token no encontrado');
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>('http://localhost:5000/perfil', { headers });
  }
}
