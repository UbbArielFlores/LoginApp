import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConBackendService {

  url: any = 'https://temis.impact.cl/ariel_flores/bk_loginApp/controllers/Usuarios.php';

  constructor(private http: HttpClient) { }

  getAllUsuarios(): any{
    return this.http.get(this.url+'?op=GetAll');
  }

  getAllCorreos(): any{
    return this.http.get(this.url+'?op=GetAllCorreos');
  }

  getUsuarioById(body: any): any {
    return this.http.post(this.url+'?op=GetId',body);
  }

  insertUsuario(body: any): any{
    return this.http.post(this.url+'?op=Insert',body);
  }

  updateUsuario(body: any): any{
    return this.http.post(this.url+'?op=Update',body);
  }

  deleteUsuario(body: any): any{
    return this.http.post(this.url+'?op=Delete',body);
  }

}
