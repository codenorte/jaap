import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { UsersService } from '../../../../services/auth/users.service';
import { MedidorService } from '../../../../services/auth/medidor.service';
import { ControlaniomesdetallefacturaService } from '../../../../services/auth/controlaniomesdetallefactura.service';
import { ToastrService } from '../../../../common/service/toastr.service';

import { Users } from '../../../../model/users';
import { Medidor } from '../../../../model/medidor';
import { Controlaniomesdetallefacturas } from '../../../../model/Controlaniomesdetallefacturas';

import * as validateDocument from '../../../../../../node_modules/validate-document-ecuador';

declare function customStep(): void;

@Component({
  selector: 'app-medidor-add',
  templateUrl: './medidor-add.component.html',
  styleUrls: ['./medidor-add.component.css']
})
export class MedidorAddComponent implements OnInit {

	users:Users;
	medidor:Medidor;
	controlaniomes:Controlaniomesdetallefacturas;
	sector;
	institucion;
	roles;
	identity;
	usuario_actual;

	validarcedula = "";
	tipo_cedula = '';
	codigos_disponibles;
	array_datos = [];
	listacontrolaniomes;

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _controlaniomesdetallefacturaService:ControlaniomesdetallefacturaService,
		private _medidorService:MedidorService,
		private _usersService:UsersService,
		private toastrService:ToastrService
	) {
		this.users=new Users(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		this.medidor = new Medidor(null,null,null,null,null,null,null,null,null,null,null);
    this.controlaniomes= new Controlaniomesdetallefacturas(null,null,null,null,null);
		this.identity = this._usersService.getIdentity();
	}

	ngOnInit(): void {
		customStep();
		this.cargar();
		this.usuario_actual = this.identity.NOMBRES + ' ' + this.identity.APELLIDOS;
	}

	/*
	* Obtener codigo de medidor disponibles
	*/
	getCodigoMedidorDisponible(){
		this._medidorService.getCodigoMedidorDisponible().subscribe(
			response=>{
				if(response.code == 200){
					console.log(response);
					this.codigos_disponibles = response.data;
				}
				else{
					this.toastrService.Error("Error","Error");
				}
			},
			error=>{
				console.log(<any>error.error);
				this.toastrService.Error("Error de datos","Error");

			}
			);
	}
	
	/*
	* Listar consumo mes
	*/
	getAllControlaniomesdetallefactura(){
		this._controlaniomesdetallefacturaService.getAllControlaniomesdetallefactura().subscribe(
			response=>{
				if(response.code == 200){
					console.log(response);
					this.listacontrolaniomes = response.data;
				}
				else{
					this.toastrService.Error("Error","Error");
				}
			},
			error=>{
				console.log(<any>error.error);
				this.toastrService.Error("Error de datos","Error");

			}
			);
	}

	createMedidor(){
		this.users.IDINSTITUCION=this.institucion.IDINSTITUCION;
		this.users.roles_id=5;
		//this.controlaniomes=this.controlaniomes.aniomes;
		this.medidor.FECHA=this.controlaniomes.aniomes;
		console.log(this.users);
		console.log(this.medidor);
		console.log(this.institucion);
		console.log(this.controlaniomes);

		this.array_datos.push({
			users: this.users,
			medidor: this.medidor,
			controlaniomes:this.controlaniomes,
			usuario_actual:this.usuario_actual
		});

		this._medidorService.createMedidor(this.array_datos).subscribe(
			response=>{
				if(response.code == 201){
					console.log(response);
					this.toastrService.Success(response.message,response.title);
					this.users=new Users(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
					this.medidor = new Medidor(null,null,null,null,null,null,null,null,null,null,null);
 				  this.controlaniomes= new Controlaniomesdetallefacturas(null,null,null,null,null);
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
		this.getCodigoMedidorDisponible();
		this.getAllControlaniomesdetallefactura();
		this.sector = [
		      	{id: 1, name: "Capillapamba"},
		      	{id: 2, name: "Coragaloma"},
		      	{id: 3, name: "Pilchibuela"},
		      	{id: 4, name: "Tocagon Alto"}
		   	];
		
	}

}
