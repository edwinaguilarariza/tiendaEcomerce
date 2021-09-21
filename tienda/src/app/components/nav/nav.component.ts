import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
declare var $:any;


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public token;
  public id : any;
  public user: any = undefined;
  public user_lc : any = undefined;
  public config_global: any = {};
  public op_cart  = false;
  
  public carrito_arr : Array<any> = [];
  public url;
  public subtotal = 0 ;


  constructor( private _clienteService: ClienteService ,
               private _router:Router
    ) {
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('id');
    this.url = GLOBAL.url;

    this._clienteService.obtener_config_publico().subscribe( 
      response=>{
        this.config_global = response.data;
        
      }
    )
    
      if(this.token) {
        this._clienteService.obtener_cliente_guest(this.id ,this.token).subscribe(    
          response=>{
            
            this.user = response.data;
            
            localStorage.setItem('user_data',JSON.stringify(this.user)); 
            if (localStorage.getItem('user_data')) {
              this.user_lc = localStorage.getItem('user_data');
            
              this._clienteService.obtener_carrito_cliente(this.id,this.token).subscribe(
                response=>{
                  this.carrito_arr = response.data;
                  this.calcular_carrito();
                  //console.log(response);
                }
              )
             }else{
               this.user_lc = undefined;
             }
          },
          error=>{
            console.log(error);
            this.user = undefined;  
          }
        )
      }
        
    }
              
              
              



  
   ngOnInit(): void {
   }
      
      
   logout(){
     window.location.reload();
    localStorage.clear();
    this._router.navigate(['/']);
   }    


   op_modalcart(){
     if (!this.op_cart) {
      this.op_cart = true;
      $('#cart').addClass('show');
     } else {
      this.op_cart = false;
      $('#cart').removeClass('show');
     }
   }

   calcular_carrito(){
     this.carrito_arr.forEach(element =>{
       this.subtotal = this.subtotal + parseInt(element.producto.precio);
     })
   }

   eliminar_item(id: any){
    this._clienteService.eliminar_carrito_cliente(id,this.token).subscribe(
      response=>{
        console.log(response);
        
      }
    )
   }

    
}



