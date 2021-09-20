import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
declare var jQuery: any;
declare var $:any;
declare var iziToast: any;



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public cliente : any = {};
  public id: any ;
  public token;

  constructor(
    private _clienteService: ClienteService
  ) {
    this.id = localStorage.getItem('id');
    this.token = localStorage.getItem('token');

    if (this.id) {
      this._clienteService.obtener_cliente_guest(this.id,this.token).subscribe(
        response=>{
         // console.log(response);
          this.cliente = response.data;
          
        }
      )
    }


   }

  ngOnInit(): void {
  }


actualizar(actualizarForm:any){
  if (actualizarForm.valid) {
    this.cliente.password = $('#input_password').val();
    this._clienteService.actualizar_perfil_cliente_guest(this.id,this.cliente,this.token).subscribe(
      response=>{
        iziToast.show({
          title:'SUCCESS',
          titleColor:'#1DC74C',
          color: '#FFF',
          class: 'text-success',
          position:'topRight',
          message:'se actualizo su perfil correctamente'
        })
        
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
    })
  }
}

}
