import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  public url;

  constructor( private _http: HttpClient ) { 
    this.url = GLOBAL.url;
   }

   obtener_productos_slug_publico(slug: any ):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json' ); 
        return this._http.get(this.url+'obtener_productos_slug_publico/'+slug,{headers:headers} );
 }
 

}


