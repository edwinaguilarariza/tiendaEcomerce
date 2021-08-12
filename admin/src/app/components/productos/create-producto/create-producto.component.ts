import { Component, OnInit } from '@angular/core';

import { AdminService } from 'src/app/services/admin.service';
import { ProductoService } from 'src/app/services/producto.service';


declare var iziToast: any;
declare var jQuery: any;
declare var $:any;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit {

public producto: any = {
  categoria: ''
};
public file : any = undefined;
public imgSelect : any | ArrayBuffer = 'assets/img/01.jpg';
public config : any = {};
public token;

  constructor( private _productoService: ProductoService,
                private _adminService: AdminService,
                  ) { 
    this.config ={
      height:500 
    }
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
  }

  registro(registroForm: any){
    if (registroForm.valid) {
      console.log(this.producto);
      console.log(this.file);

      this._productoService.registro_producto_admin(this.producto,this.file,this.token).subscribe(
        response =>{
          console.log(response);
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
      $('#input-portada').text('Seleccionar imagen');
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
    }
  }


  fileChangeEvent(event:any):void{
    let file;
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

         const reader = new FileReader();
            reader.onload = e => this.imgSelect = reader.result;
            console.log(this.imgSelect);
            reader.readAsDataURL(file); 
            $('#input-portada').text(file.name);
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
          $('#input-portada').text('Seleccionar imagen');
          this.imgSelect = 'assets/img/01.jpg';
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
      $('#input-portada').text('Seleccionar imagen');
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
    }
    console.log(this.file);
    }
  }


