import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
//services
import { UsersService } from '../../../../services/auth/users.service';
import { PlanificacionService } from '../../../../services/auth/planificacion.service';

//notificacion
import { ToastrService } from '../../../../common/service/toastr.service';
//modal
import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
//model 
import { Planificacion } from '../../../../model/planificacion';
//pipe 
import { DateWithLocalePipe } from '../../pipes/date-with-locale.pipe';

@Component({
  selector: 'app-mingas',
  templateUrl: './mingas.component.html',
  styleUrls: ['./mingas.component.css']
})
export class MingasComponent implements OnInit {

	rol_menus;
	nombre_rol;
	roles_administrativos:string="";

	//modal boostrap
  	closeResult: string;

  	lista_planificacion;
	temp_var;
	planificacion:Planificacion;
	tipo_plan =[
	{
		id:1,
		name : 'ASAMBLEA'
	},
	{
		id:2,
		name : 'MINGA'
	}
	];
	panificacion_id;

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private _planificacionService:PlanificacionService,
		private toastrService:ToastrService,
		private modalService: NgbModal,
		) {
		this.rol_menus = this._usersService.getRol();
      	this.nombre_rol = this._usersService.getNombreRol();
      	this.planificacion = new Planificacion(null,null,null,null,null,null);

      	this.caducarPlanificacionEstado();
	}

	ngOnInit(): void {
		this.cargar();
	}

	/*
	metodos de api
	*/
	/*
	* Obtener lista de planificacion
	*/
	getAllPlanificacion(){
		this._planificacionService.getAllPlanificacion().subscribe(
			res => {
				if(res.code == 200){
					console.log(res);
					this.lista_planificacion = res.data;
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
	* Crear planificacion
	*/
	createPlanificacion(){
		console.log(this.planificacion);
		this.planificacion.estado = '1';
		this._planificacionService.createPlanificacion(this.planificacion).subscribe(
			res => {
				if(res.code == 201){
					console.log(res);
					this.getAllPlanificacion();
					this.toastrService.Success(res.message,res.title);
				}else{
					console.log(res);
					this.toastrService.Error(res.message,res.title);
				}
			},
			error => {
				console.log(<any>error);
				this.toastrService.Error(<any>error.error.error,"Error");
			}
			);
	}
	/*
	* Crear planificacion
	*/
	editPlanificacion(){
		console.log(this.planificacion);
		this.planificacion.estado = '1';
		this._planificacionService.editPlanificacion(this.panificacion_id,this.planificacion).subscribe(
			res => {
				if(res.code == 200){
					console.log(res);
					this.getAllPlanificacion();
					this.toastrService.Success(res.message,res.title);
				}else{
					console.log(res);
					this.toastrService.Error(res.message,res.title);
				}
			},
			error => {
				console.log(<any>error);
				this.toastrService.Error(<any>error.error.error,"Error");
			}
			);
	}

	/*
	* cambia de estado revisando el tiempo de caducidad 
	*/
	caducarPlanificacionEstado(){
		this._planificacionService.caducarPlanificacionEstado().subscribe(
			res => {
				if(res.code == 200){
					console.log(res);
				}else{
					console.log(res);
				}
			},
			error => {
				console.log(<any>error);
			}
			);
	}

	/**************************************
	*************** Modales****************
	***************************************
	*/

	crearPlanificacionModal(crearPlanificacion) {
		
		this.modalService.open(crearPlanificacion, {ariaLabelledBy: 'modal-basic-title'}).result.then(
			(result) => {
				this.closeResult = `cerrado con: ${result}`;
			},
			(reason) => {
				//this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				//console.log(reason);
		});
	}

	editPlanificacionModal(editarPlanificacion, planificacion) {
      	this.planificacion = new Planificacion(null,null,null,null,null,null);
		this.planificacion = planificacion;
		this.panificacion_id=planificacion.IDPLANIFICACION;
		console.log(this.planificacion);
		console.log(this.panificacion_id);
		
		this.modalService.open(editarPlanificacion, {ariaLabelledBy: 'modal-basic-title'}).result.then(
			(result) => {
				this.closeResult = `cerrado con: ${result}`;
				if(result=="guardar"){
					console.log("guardado");
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

	cargar(){
		if(this.rol_menus==1||this.rol_menus==2||this.rol_menus==3){
			this.roles_administrativos="admin";
			this.getAllPlanificacion();
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
