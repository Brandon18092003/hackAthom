import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InfoDTO } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = 'http://localhost:8080/api/perfil';

  constructor(private http: HttpClient) {}

  getInfo(codigo: string): Observable<InfoDTO> {
    return this.http.get<InfoDTO>(`${this.apiUrl}/info/${codigo}`);
  }

  actualizarInfoAdicional(codigo: string, infoAdicional: string): Observable<void> {
    const body = { codigoPersona: codigo, infoAdicional };
    return this.http.put<void>(`${this.apiUrl}/actualizar-info-adicional/${codigo}`, body);
  }
}
