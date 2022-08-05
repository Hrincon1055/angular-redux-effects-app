import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private _url = 'https://reqres.in/api';
  constructor(private _http: HttpClient) {}
  public getUsers(): Observable<Usuario[]> {
    return this._http
      .get<Usuario[]>(`${this._url}/users?per_page=6`)
      .pipe(map((response: any) => response.data));
  }
}
