import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { UsersService } from '../../../../services/auth/users.service';
import { ControlaniomesdetallefacturaService } from '../../../../services/auth/controlaniomesdetallefactura.service';
import { ToastrService } from '../../../../common/service/toastr.service';

//modals
import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
//model
import { Controlaniomesdetallefacturas } from '../../../../model/controlaniomesdetallefacturas';

@Component({
  selector: 'app-consumo-lista',
  templateUrl: './consumo-lista.component.html',
  styleUrls: ['./consumo-lista.component.css']
})
export class ConsumoListaComponent implements OnInit {
	
	rol_menus;
	nombre_rol;
	roles_administrativos:string="";

	dtOptions: DataTables.Settings = {};
	temp_var:Object=false;
  	listacontrolaniomes;
  	//modal boostrap
  	closeResult: string;

  	nueva_fecha;

  	controlaniomes:Controlaniomesdetallefacturas;


	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private _controlaniomesdetallefacturaService:ControlaniomesdetallefacturaService,
		private toastrService:ToastrService,
		private modalService: NgbModal
		) {
		this.rol_menus = this._usersService.getRol();
      	this.nombre_rol = this._usersService.getNombreRol();
      	this.controlaniomes= new Controlaniomesdetallefacturas(null,null,null,null,null);

	}

	ngOnInit(): void {
		this.cargar();
	}
	/*
	* Listar consumo mes
	*/
	getAllControlaniomesdetallefactura(){
		//totales
		this._controlaniomesdetallefacturaService.getAllControlaniomesdetallefactura().subscribe(
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
	createControlaniomesdetallefactura(){
		
		this._controlaniomesdetallefacturaService.createControlaniomesdetallefactura(this.controlaniomes).subscribe(
			response=>{
				if(response.code == 201){
					console.log(response);
					this.getAllControlaniomesdetallefactura();
					this.controlaniomes= new Controlaniomesdetallefacturas(null,null,null,null,null);
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
					this.createControlaniomesdetallefactura();
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
		}
		else if(this.rol_menus==4){
			this.roles_administrativos="operador";
			this.getAllControlaniomesdetallefactura();
		}
		else{
			this.roles_administrativos="user";
		}
	}

}
