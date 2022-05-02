import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { UsersService } from '../../../../services/auth/users.service';
import { ToastrService } from '../../../../common/service/toastr.service';

import { Users } from '../../../../model/users';

import * as validateDocument from '../../../../../../node_modules/validate-document-ecuador';


@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css']
})
export class UsersAddComponent implements OnInit {

	users:Users;
	sector;
	institucion;
	roles;

	validarcedula = "";
	tipo_cedula = '';

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private toastrService:ToastrService
	) {
		this.users=new Users('','','','',null,'','','','','','','','','','','','',null);
	}

	ngOnInit(): void {
		this.cargar();
	}

	createUser(){
		console.log(this.users);
		console.log(this.institucion);
		this.users.IDINSTITUCION=this.institucion.IDINSTITUCION;
		this.users.roles_id=5;

		return "ho";

		this._usersService.createUser(this.users).subscribe(
			response=>{
				if(response.code == 201){
					console.log(response);
					this.toastrService.Success(response.message,response.title);
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
	    console.log(re);
	    console.log(re.test(String(email)));
	    return re.test(String(email).toLowerCase());
	}
	convertirMayuscula(str) {
		console.log(str);
		var dato =str.control.value;
	  	dato.toUpperCase();
	  	
	  	if(str.name=='NOMBRES'){
	  		this.users.NOMBRES = dato.toUpperCase();
	  		console.log(dato);
	  		console.log(this.users.NOMBRES);
	  	}
	  	if(str.name=='APELLIDOS'){
	  		this.users.APELLIDOS = dato.toUpperCase();
	  	}
	}

	cargar(){
		this.institucion=this._usersService.getInstitucion();
		this.sector = [
		      	{id: 1, name: "Capillapamba"},
		      	{id: 2, name: "Coragaloma"},
		      	{id: 3, name: "Pilchibuela"},
		      	{id: 4, name: "Tocagon Alto"}
		   	];
		
	}

}
