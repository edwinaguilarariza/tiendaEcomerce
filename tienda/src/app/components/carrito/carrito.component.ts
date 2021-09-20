import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  public idCliente;
  public token;

    
  public carrito_arr : Array<any> = [];
  public url;
  public subtotal = 0 ;

  constructor(
    private _clienteService: ClienteService
  ) {
    this.url = GLOBAL.url;
    this.idCliente = localStorage.getItem('id');
    this.token = localStorage.getItem('token');
    this._clienteService.obtener_carrito_cliente(this.idCliente,this.token).subscribe(
      response=>{
        this.carrito_arr = response.data;
        this.calcular_carrito();
        //console.log(response);
      }
    )
   }

  ngOnInit(): void {
  } 

  calcular_carrito(){
    this.carrito_arr.forEach(element =>{
      this.subtotal = this.subtotal + parseInt(element.producto.precio);
    })
  }

}
