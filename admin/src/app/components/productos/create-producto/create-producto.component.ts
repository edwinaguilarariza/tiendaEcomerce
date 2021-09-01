import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
public load_btn = false;
public config_global : any = {};

  constructor( private _productoService: ProductoService,
                private _adminService: AdminService,
                private _router: Router
                  ) { 
    this.config ={
      height:500 
    }
    this.token = this._adminService.getToken();
    this._adminService.obtener_config_publico().subscribe(
      response=>{
        this.config_global = response.data;
        console.log(this.config_global);
      }
    )
  }

  ngOnInit(): void {
  }

  registro(registroForm: any){
    if (registroForm.valid) {
      if (this.file == undefined) {
        iziToast.show({
          title:'Error',
          titleColor:'#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position:'topRight',
          message:'Debe subir una portada para registrarse'
        });
      } else {
        console.log(this.producto);
      console.log(this.file);
      this.load_btn = true;
      this._productoService.registro_producto_admin(this.producto,this.file,this.token).subscribe(
        response =>{
       //console.log(response);
       iziToast.show({
        title:'SUCCESS',
        titleColor:'#1DC74C',
        color: '#FFF',
        class: 'text-success',
        position:'topRight',
        message:'se registro correctamente el nuevo producto'
      });
      this.load_btn = false;
          this._router.navigate(['/panel/productos']);
        },
        error=>{
          console.log(error);
          this.load_btn = false;
        }
      )
      }

    } else {
      iziToast.show({
        title:'Error',
        titleColor:'#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position:'topRight',
        message:'los datos del formulario no son validos'
      });
      this.load_btn = false;
      $('#input-portada').text('Seleccionar imagen');
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
    }
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


