import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
declare var iziToast: any;
declare var jQuery: any;
declare var $:any;




@Component({
  selector: 'app-inventario-producto',
  templateUrl: './inventario-producto.component.html',
  styleUrls: ['./inventario-producto.component.css']
})
export class InventarioProductoComponent implements OnInit {

  public id : any;
  public token;
  public _iduser ;
  public producto : any = {};
  public inventarios : Array<any>=[];
  public inventario : any = {};
  public load_btn = false;
  //public load_data = true;

  constructor(  private _route: ActivatedRoute,
                private _productoService: ProductoService) { 
                  this.token = localStorage.getItem('token');
                  this._iduser = localStorage.getItem('id');
                  console.log(this._iduser);
                }

  ngOnInit(): void {
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
             this._productoService.listar_inventario_producto_admin(this.producto._id,this.token).subscribe(
               response=>{
               // console.log(response);
               this.inventarios = response.data;
            //   console.log(this.inventarios);
               },
               error=>{
                console.log(error); 
               }
             )
           }
          },
          error=>{
            console.log(error);
          }
        )
      }
    )
  }


  eliminar(id:any){
    this.load_btn = true;
  this._productoService.eliminar_inventario_producto_admin(id,this.token).subscribe(
    response =>{
     // console.log(response);
      iziToast.show({
        title:'SUCCESS',
        titleColor:'#1DC74C',
        color: '#FFF',
        class: 'text-success',
        position:'topRight',
        message:'se elimino correctamente el registro'
      })

      $('#delete-'+id).modal('hide');
      $('.modal-backdrop').removeClass('show');

      this.load_btn = false;

      this._productoService.listar_inventario_producto_admin(this.producto._id,this.token).subscribe(
        response=>{
        // console.log(response);
        this.inventarios = response.data;
        console.log(this.inventarios);
        },
        error=>{
         console.log(error); 
        }
      )


    },
    error =>{
      
      iziToast.show({
        title:'SUCCESS',
        titleColor:'#1DC74C',
        color: '#FFF',
        class: 'text-success',
        position:'topRight',
        message:'ocurrio un error en el servidor.'
      });
     //console.log(error);
      this.load_btn = false;
    })
  }


  registro_inventario(inventarioForm:any){
    if (inventarioForm.valid) {
     // console.log(this.inventario);
       let data = {
        producto: this.producto._id,
        cantidad: inventarioForm.value.cantidad,
        admin: this._iduser,
        proveedor: inventarioForm.value.proveedor
      }
      console.log(data);
      this._productoService.registro_inventario_producto_admin(data,this.token).subscribe(
        response=>{
          //console.log(response);
          iziToast.show({
            title:'SUCCESS',
            titleColor:'#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position:'topRight',
            message:'se agrego el nuevo stock al producto'
          });

          this._productoService.listar_inventario_producto_admin(this.producto._id,this.token).subscribe(
            response=>{
            // console.log(response);
            this.inventarios = response.data;
         //   console.log(this.inventarios);
            },
            error=>{
             console.log(error); 
            }
          )
          
        },
        error=>{
          console.log(error);
        }
        
      )
  

    } else {
      iziToast.show({
        title:'Error',
        titleColor:'#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position:'topRight',
        message:'los datos del formulario no son validos'
      });
    }
  }


}
    