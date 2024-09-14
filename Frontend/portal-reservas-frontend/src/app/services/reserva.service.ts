import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private baseUrl = 'http://localhost:5000'; // Flask server base URL

  constructor(private http: HttpClient) {}

  createReserva(reserva: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    return this.http.post(`${this.baseUrl}/reservas`, reserva, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }

  getReservasUsuario(usuarioId: string): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    return this.http.get<any[]>(`${this.baseUrl}/reservas/usuario/${usuarioId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  cancelReserva(reservaId: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    return this.http.delete(`${this.baseUrl}/reservas/${reservaId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}
