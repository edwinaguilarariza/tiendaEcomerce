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
          console.log(response);
          this.cliente = response.data;
          
        }
      )
    }


   }

  ngOnInit(): void {
  }


actualizar(actualizarForm:any){
  if (actualizarForm.valid) {
    console.log(this.cliente);
    
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
