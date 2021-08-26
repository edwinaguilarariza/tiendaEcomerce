import { Component, OnInit } from '@angular/core';
import { CuponService } from 'src/app/services/cupon.service';

@Component({
  selector: 'app-index-cupon',
  templateUrl: './index-cupon.component.html',
  styleUrls: ['./index-cupon.component.css']
})
export class IndexCuponComponent implements OnInit {

  public cupones : Array<any> = [];
  public load_data = true;
  public page = 1;
  public pageSize = 20;
  public filtro = '';
  public token;

  constructor( private _cuponService: CuponService ) {
            this.token = localStorage.getItem('token'); 
  }

  ngOnInit(): void {
    this._cuponService.listar_cupones_admin(this.filtro,this.token).subscribe(
      response=>{
       // console.log(response);
       this.cupones = response.data;
        this.load_data = false;
        
      },
      error=>{
        console.log(error);
        
      }
    )

  }

  filtrar(){
    this._cuponService.listar_cupones_admin(this.filtro,this.token).subscribe(
      response=>{
       // console.log(response);
       this.cupones = response.data;
        this.load_data = false;
        
      },
      error=>{
        console.log(error);
        
      }
    )
  }

}
