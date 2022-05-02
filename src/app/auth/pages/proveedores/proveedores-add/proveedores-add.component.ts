import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { UsersService } from '../../../../services/auth/users.service';
import { ProveedoresService } from '../../../../services/auth/proveedores.service';

import { ToastrService } from '../../../../common/service/toastr.service';
//modelo
import { Proveedor } from '../../../../model/proveedor';
//validar cedula
import * as validateDocument from '../../../../../../node_modules/validate-document-ecuador';

@Component({
  selector: 'app-proveedores-add',
  templateUrl: './proveedores-add.component.html',
  styleUrls: ['./proveedores-add.component.css']
})
export class ProveedoresAddComponent implements OnInit {

	roles_administrativos:string="";
	rol_menus;
	nombre_rol;

  	//crear proveedores
  	proveedor : Proveedor;

  	validarcedula = "";
	tipo_cedula = '';

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private _proveedoresService:ProveedoresService,
		private toastrService:ToastrService,
		) {
		this.rol_menus = this._usersService.getRol();
      	this.nombre_rol = this._usersService.getNombreRol();
      	this.proveedor = new Proveedor(null,null,null,null,null,null,null,null,null,null);
	}

	ngOnInit(): void {
		this.cargar();
	}


	createProveedor(){

		this._proveedoresService.createProveedor(this.proveedor).subscribe(
			response=>{
				if(response.code == 201){
					console.log(response);
					this.toastrService.Success(response.message,response.title);
					this._router.navigate(['/proveedores/detail-proveedor/',response.data.id]);
				}
				else{
					this.toastrService.Error("Error","Error");
				}
			},
			error=>{
				console.log(<any>error.error);
				this.toastrService.Error(<any>error.error.error,"Error");

			}
			);
	}

	//validaciones
	//evento validar
	validarCI(event){
		var dato = event.control.value;
		var tamanio = dato.length;


		if(tamanio==10){
			const cedula = validateDocument.getValidateDocument( 'cedula', dato );
			if(cedula.status=="SUCCESS"){
				this.validarcedula = '1';
				this.tipo_cedula = cedula.message;
			}
			else{
				this.validarcedula = '0';
				this.tipo_cedula = cedula.message;
			}
			console.log(cedula);
		}
		else if(tamanio==13){
			const ruc = validateDocument.getValidateDocument( 'ruc', dato );
			if(ruc.status=='SUCCESS'){
				this.validarcedula = '1';
				this.tipo_cedula = ruc.message;
			}else{
				this.validarcedula = '0';
				this.tipo_cedula = ruc.message;
			}
			console.log(ruc);
		}
		else{
			this.validarcedula = '0';
			this.tipo_cedula = 'No valido';
			console.log("Caracter no valido");
		}

	}

	//validar email 
	validateEmail(email) {
	    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    //console.log(re);
	    //console.log(re.test(String(email)));
	    return re.test(String(email).toLowerCase());
	}
	convertirMayuscula(str) {
		//console.log(str);
		var dato =str.control.value;
	  	dato.toUpperCase();
	  	
	  	if(str.name=='NOMBRES'){
	  		this.proveedor.nombres = dato.toUpperCase();
	  		//console.log(dato);
	  		//console.log(this.proveedor.nombres);
	  	}
	  	if(str.name=='APELLIDOS'){
	  		this.proveedor.apellidos = dato.toUpperCase();
	  	}
	}



	cargar(){
		if(this.rol_menus==1||this.rol_menus==2||this.rol_menus==3){
			this.roles_administrativos="admin";
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
