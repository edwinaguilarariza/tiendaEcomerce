import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductoService } from 'src/app/services/producto.service';

declare var iziToast: any;
declare var jQuery: any;
declare var $:any;

@Component({
  selector: 'app-galeria-producto',
  templateUrl: './galeria-producto.component.html',
  styleUrls: ['./galeria-producto.component.css']
})
export class GaleriaProductoComponent implements OnInit {
  public producto : any = {};
public id : any;
public token;
public nueva_variedad = '';
public load_btn = false;
public url;
public file: any = undefined;

constructor(
  private _route: ActivatedRoute,
  private _productoService :ProductoService
) {
  this.token = localStorage.getItem('token');
  this.url = GLOBAL.url;
  this._route.params.subscribe(
    params=>{
      this.id = params['id'];
   //  console.log(this.id);
      this._productoService.obtener_producto_admin(this.id,this.token).subscribe(
        response=>{
         // console.log(response);
         if (response.data == undefined) {
           this.producto = undefined;
         } else {
           this.producto = response.data;
          // console.log(this.producto);
           
        }
         console.log(this.producto);
           
        },
        error=>{
          console.log(error);
        }
      )
    }
  )
 }

  ngOnInit(): void { 
  }

  fileChangeEvent(event:any):void{
    var file;
    if (event.target.files && event.target.files[0]) {
      file = <any>event.target.files[0]; 
      //console.log(file);
    } else {
      iziToast.show({
        title:'Error',
        titleColor:'#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position:'topRight',
        message:'No hay una imagen de envio'
      });
    }
    if (file.size <= 4000000) {
      if (file.type == 'image/png' ||
          file.type == 'image/webp' || 
          file.type == 'image/jpg' || 
          file.type == 'image/gif' ||
          file.type == 'image/jpeg' ) {

            this.file = file;
      }else{
        iziToast.show({
          title:'Error',
          titleColor:'#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position:'topRight',
          message:'El archivo debe ser una imagen'
        });
        
        $('#input-img').val('');  
          this.file = undefined;
      }
    }else{
      iziToast.show({
        title:'Error',
        titleColor:'#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position:'topRight',
        message:'la imagen no puede superar los 4mb'
      });
     $('#input-img').val('');
      this.file = undefined;
    }
    console.log(this.file);
    }

  subir_imagen(){

  }

  

}
        
            
           
           
