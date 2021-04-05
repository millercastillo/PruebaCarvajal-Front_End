import { UsuarioCrear } from './../modelos/usuarioCrear';
import { Usuario } from './../modelos/usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  myAppUrl ='https://localhost:44317/';
  myApiUrl ='api/Usuarios/';
  list: Usuario[];
  constructor(private http: HttpClient) { }

  guardarUsuario(usuario: UsuarioCrear): Observable<UsuarioCrear>
  {
    return this.http.post<UsuarioCrear>(this.myAppUrl + this.myApiUrl,usuario);
  }

  actualizarUsuario(id: number,usu: Usuario): Observable<any>
  {
    console.log("usu antes de enviar", usu);
    return this.http.put<any>(this.myAppUrl + this.myApiUrl+ id,usu);
  }

  obtenerUsuarios(): Observable<any>
  {
    return this.http.get<any>(this.myAppUrl+this.myApiUrl);
  }
  eliminarUsuario(id: number): Observable<Usuario>
  {
    return this.http.delete<Usuario>(this.myAppUrl + this.myApiUrl + id);
  }
  login(Correo: string, Contraseña: string) /*Observable<any>*/
  {
    return /*this.http.delete<any>(environment.ruta + '/api/eliminar/' +id)*/;
  }
}
