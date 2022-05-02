import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { UsersService } from '../../../../services/auth/users.service';
import { ProveedoresService } from '../../../../services/auth/proveedores.service';

import { ToastrService } from '../../../../common/service/toastr.service';

@Component({
  selector: 'app-proveedores-detail',
  templateUrl: './proveedores-detail.component.html',
  styleUrls: ['./proveedores-detail.component.css']
})
export class ProveedoresDetailComponent implements OnInit {

	roles_administrativos:string="";
	rol_menus;
	nombre_rol;

	dato_proveedor;
	temp_var:Object=false;

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private _proveedoresService:ProveedoresService,
		private toastrService:ToastrService,
		) {
		this.rol_menus = this._usersService.getRol();
      	this.nombre_rol = this._usersService.getNombreRol();
	}

	ngOnInit(): void {
		this.cargar();
	}


	/*
	* Actualizar estado users
	*/
	getIdProveedor(){

		this._route.params.forEach((params:Params)=>
		{
			let proveedor_id=params['proveedor_id'];
			console.log(proveedor_id);

			this._proveedoresService.getIdProveedor(proveedor_id).subscribe(
				res => {
					if(res.code == 200){
						console.log(res);
						this.dato_proveedor = res.data;
						this.temp_var=true;

					}else{
						console.log(res);
					}
				},
				error => {
					console.log(<any>error);
				}
				);
		}
		);
	}

	cargar(){
		if(this.rol_menus==1||this.rol_menus==2||this.rol_menus==3){
			this.roles_administrativos="admin";
			this.getIdProveedor();
		}
		else if(this.rol_menus==4){
			this.roles_administrativos="operador";
		}
		else{
			this.roles_administrativos="user";
		}
		console.log(this._usersService.getRol());
		console.log(this.roles_administrativos);

	}

}
