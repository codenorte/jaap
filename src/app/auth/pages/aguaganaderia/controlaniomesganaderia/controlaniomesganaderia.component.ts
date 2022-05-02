import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { UsersService } from '../../../../services/auth/users.service';
import { ToastrService } from '../../../../common/service/toastr.service';

import { ControlaniomesganaderiaService } from '../../../../services/auth/controlaniomesganaderia.service';
//modals
import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
//model
import { Controlaniomesganaderia } from '../../../../model/controlaniomesganaderia';

@Component({
  selector: 'app-controlaniomesganaderia',
  templateUrl: './controlaniomesganaderia.component.html',
  styleUrls: ['./controlaniomesganaderia.component.css']
})
export class ControlaniomesganaderiaComponent implements OnInit {
	rol_menus;
	nombre_rol;
	roles_administrativos:string="";

	dtOptions: DataTables.Settings = {};
	temp_var:Object=false;
  	listacontrolaniomes;
  	//modal boostrap
  	closeResult: string;

  	nueva_fecha;

  	controlaniomesganaderia:Controlaniomesganaderia;

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private _controlaniomesganaderiaService:ControlaniomesganaderiaService,
		private toastrService:ToastrService,
		private modalService: NgbModal
		) {
		this.rol_menus = this._usersService.getRol();
      	this.nombre_rol = this._usersService.getNombreRol();
      	this.controlaniomesganaderia= new Controlaniomesganaderia(null,null,null);

	}

	ngOnInit(): void {
		this.cargar();
	}

	/*
	* Listar consumo mes
	*/
	getAllControlaniomesganaderia(){
		//totales
		this._controlaniomesganaderiaService.getAllControlaniomesganaderia().subscribe(
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
	createControlaniomesganaderia(){
		this.controlaniomesganaderia.estado="1";
		console.log(this.controlaniomesganaderia);
		if(this.nueva_fecha){
			this.controlaniomesganaderia.aniomes=this.nueva_fecha;
		}
		
		this._controlaniomesganaderiaService.createControlaniomesganaderia(this.controlaniomesganaderia).subscribe(
			response=>{
				if(response.code == 201){
					console.log(response);
					this.getAllControlaniomesganaderia();
					this.controlaniomesganaderia= new Controlaniomesganaderia(null,null,null);
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
					this.createControlaniomesganaderia();
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
			this.getAllControlaniomesganaderia();
		}
		else if(this.rol_menus==4){
			this.roles_administrativos="operador";
		}
		else{
			this.roles_administrativos="user";
		}
	}

}
