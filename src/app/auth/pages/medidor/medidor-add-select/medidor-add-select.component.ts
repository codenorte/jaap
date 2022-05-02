import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { UsersService } from '../../../../services/auth/users.service';


@Component({
  selector: 'app-medidor-add-select',
  templateUrl: './medidor-add-select.component.html',
  styleUrls: ['./medidor-add-select.component.css']
})
export class MedidorAddSelectComponent implements OnInit {

  roles_administrativos:string="";
  rol_menus;
  nombre_rol;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _usersService:UsersService,
    ) {

    this.rol_menus = this._usersService.getRol();
    this.nombre_rol = this._usersService.getNombreRol();
  }

  ngOnInit(): void {
      this.cargar();
  }

  cargar(){
    //roles usuarios
    if(this.rol_menus==1||this.rol_menus==2||this.rol_menus==3){
      this.roles_administrativos="admin";
    }
    else if(this.rol_menus==4){
      this.roles_administrativos="operador";
    }
    else{
      this.roles_administrativos="user";
    }
  }

}
