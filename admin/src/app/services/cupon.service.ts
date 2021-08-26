import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CuponService { 

  public url;

  constructor(private _http: HttpClient ) { 
    this.url = GLOBAL.url;
  }


  registro_cupon_admin( data: any, token: any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json' ,'Authorization':token });
    return this._http.post(this.url+'registro_cupon_admin',data,{headers:headers} );
 }

 listar_cupones_admin( filtro: any, token: any):Observable<any>{
  let headers = new HttpHeaders({'Content-Type': 'application/json' ,'Authorization':token });
  return this._http.get(this.url+'listar_cupones_admin/'+filtro,{headers:headers} );
}


}
