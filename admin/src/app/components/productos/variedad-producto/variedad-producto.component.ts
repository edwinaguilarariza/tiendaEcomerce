import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';

declare var iziToast: any;
declare var jQuery: any;
declare var $:any;


@Component({
  selector: 'app-variedad-producto',
  templateUrl: './variedad-producto.component.html',
  styleUrls: ['./variedad-producto.component.css']
})
export class VariedadProductoComponent implements OnInit {

public producto : any = {};
public id : any;
public token;
public nueva_variedad = '';

  constructor(
    private _route: ActivatedRoute,
    private _productoService :ProductoService
  ) {
    this.token = localStorage.getItem('token');
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

  agregar_variedad(){
    if (this.nueva_variedad) {
      console.log(this.nueva_variedad);
      this.producto.variedades.push({titulo:this.nueva_variedad});
      this.nueva_variedad = '';
    } else {
      iziToast.show({
        title:'Error',
        titleColor:'#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position:'topRight',
        message:'El campo de la variedad debe ser completada'
      })
    }
  }


  eliminar_variedad(idx:any){
    this.producto.variedades.splice(idx,1);
  }



  actualizar(){
    if (this.producto.titulo_variedad) {
      if (this.producto.variedades.length >= 1) {
        this._productoService.actualizar_producto_variedades_admin({
          titulo_variedad: this.producto.titulo_variedad,
          variedades: this.producto.variedades
        },this.id,this.token).subscribe(
          response=>{
            console.log(response);
            
          }
        )
      } else {
        iziToast.show({
          title:'Error',
          titleColor:'#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position:'topRight',
          message:'debe agregar almenos una variedad'
        })
      }
    } else {
      iziToast.show({
        title:'Error',
        titleColor:'#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position:'topRight',
        message:'debe completar el titulo de la variedad'
      })
    }
  }

}
