import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { UsersService } from '../../../../services/auth/users.service';
import { ToastrService } from '../../../../common/service/toastr.service';

import { ControlaniomessobranteService } from '../../../../services/auth/controlaniomessobrante.service';
//modals
import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
//model
import { Controlaniomessobrante } from '../../../../model/controlaniomessobrante';

@Component({
  selector: 'app-controlaniomessobrante',
  templateUrl: './controlaniomessobrante.component.html',
  styleUrls: ['./controlaniomessobrante.component.css']
})
export class ControlaniomessobranteComponent implements OnInit {
	rol_menus;
	nombre_rol;
	roles_administrativos:string="";

	dtOptions: DataTables.Settings = {};
	temp_var:Object=false;
  	listacontrolaniomes;
  	//modal boostrap
  	closeResult: string;

  	nueva_fecha;

  	controlaniomescobrante:Controlaniomessobrante;

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private _controlaniomessobranteService:ControlaniomessobranteService,
		private toastrService:ToastrService,
		private modalService: NgbModal
		) {
		this.rol_menus = this._usersService.getRol();
      	this.nombre_rol = this._usersService.getNombreRol();
      	this.controlaniomescobrante= new Controlaniomessobrante(null,null,null);

	}

	ngOnInit(): void {
		this.cargar();
	}

	/*
	* Listar consumo mes
	*/
	getAllControlaniomessobrante(){
		//totales
		this._controlaniomessobranteService.getAllControlaniomessobrante().subscribe(
			response=>{
				if(response.code == 200){
					console.log(response);
					this.listacontrolaniomes = response.data;
					this.nueva_fecha = response.nueva_fecha;
					console.log(this.nueva_fecha);
					this.temp_var = true;
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
	* crear createControlaniomesdetallefactura
	*/
	createControlaniomessobrante(){
		this.controlaniomescobrante.estado="1";
		console.log(this.controlaniomescobrante);
		if(this.nueva_fecha){
			this.controlaniomescobrante.aniomes=this.nueva_fecha;
		}
		
		this._controlaniomessobranteService.createControlaniomessobrante(this.controlaniomescobrante).subscribe(
			response=>{
				if(response.code == 201){
					console.log(response);
					this.getAllControlaniomessobrante();
					this.controlaniomescobrante= new Controlaniomessobrante(null,null,null);
					this.toastrService.Success(response.message,response.title);
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

	/*************************************************
	************* Modals *****************************
	**************************************************
	*/
	//modal crear cliente
	openRegistrarNuevoAniomesModal(registrarNuevoAniomesConsumo) {

		this.modalService.open(registrarNuevoAniomesConsumo, {ariaLabelledBy: 'modal-basic-title',centered: true}).result.then(
			(result) => {
				this.closeResult = `cerrado con: ${result}`;
				if(result=="guardar"){
					console.log("guardar");
					this.createControlaniomessobrante();
				}
			},
			(reason) => {
				//this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				//console.log(reason);
		});
	}

	private getDismissReason(reason: any): string {
		
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return  `with: ${reason}`;
		}
	}
	/*************************************************
	************* fin Modals *************************
	**************************************************
	*/


	cargar(){
		//roles usuarios
		if(this.rol_menus==1||this.rol_menus==2||this.rol_menus==3){
			this.roles_administrativos="admin";
			this.getAllControlaniomessobrante();
		}
		else if(this.rol_menus==4){
			this.roles_administrativos="operador";
		}
		else{
			this.roles_administrativos="user";
		}
	}

}
