import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
//services
import { UsersService } from '../../../../services/auth/users.service';
import { TarifasService } from '../../../../services/auth/tarifas.service';

//notificacion
import { ToastrService } from '../../../../common/service/toastr.service';
//modal
import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
//model 
import { Tarifas } from '../../../../model/tarifas';
//interface 
import { Interfas_Roles } from '../../../interface/roles';

@Component({
  selector: 'app-tarifas',
  templateUrl: './tarifas.component.html',
  styleUrls: ['./tarifas.component.css']
})
export class TarifasComponent implements OnInit {

	rol_menus;
	nombre_rol;
	roles_administrativos:string="";

	//modal boostrap
  	closeResult: string;

  	tarifas: Tarifas;
  	temp_var: Object = false;
  	tarifas_id;

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private _tarifasService:TarifasService,
		private toastrService:ToastrService,
		private modalService: NgbModal,
		) {
		this.rol_menus = this._usersService.getRol();
      	this.nombre_rol = this._usersService.getNombreRol();

      	this.tarifas = new Tarifas(null,null,null,null,null,null,null,null);
	}

	ngOnInit(): void {
		this.cargar();
	}

	/****************************
	*****************************
	******* metodos de api*******
	*****************************/
	/*
	* Obtener tarifas
	*/
	getAllTarifas(){
		this._tarifasService.getAllTarifas().subscribe(
			res => {
				if(res.code == 200){
					console.log(res);
					const tamanio = res.data.length;
					this.tarifas = res.data[tamanio-1];
					this.tarifas_id = res.data[tamanio-1].IDTARIFAS;
					console.log(this.tarifas_id);
					this.temp_var = true;
				}else{
					console.log(res);
				}
			},
			error => {
				console.log(<any>error);
			}
			);
	}
	/*
	* Obtener tarifas
	*/
	editTarifas(){
		console.log(this.tarifas);
		this._tarifasService.editTarifas(this.tarifas_id,this.tarifas).subscribe(
			res => {
				if(res.code == 200){
					console.log(res);
					const tamanio = res.data.length;
					this.tarifas = res.data[tamanio-1];
					console.log(this.tarifas);
					this.temp_var = true;
					this.getAllTarifas();
			    	this.toastrService.Success(res.message,res.title);

				}else{
					console.log(res);
			    this.toastrService.Error("Error","Error al editar dato");
				}
			},
			error => {
				console.log(<any>error);
			  this.toastrService.Error(<any>error.error.error,"Error");

			}
			);
	}

	/**************************************
	*************** Modales****************
	***************************************
	*/
	editarTarifasOpenModal(editTarifasModal) {
		console.log(this.tarifas_id);
		this.tarifas.estado = 1;
		this.modalService.open(editTarifasModal, {ariaLabelledBy: 'modal-basic-title'}).result.then(
			(result) => {
				this.closeResult = `cerrado con: ${result}`;
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

	cargar(){
		if(this.rol_menus==1||this.rol_menus==2||this.rol_menus==3){
			this.roles_administrativos="admin";
			this.getAllTarifas();
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
