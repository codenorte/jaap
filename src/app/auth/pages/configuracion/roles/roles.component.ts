import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
//services
import { UsersService } from '../../../../services/auth/users.service';
import { RolesService } from '../../../../services/auth/roles.service';

//notificacion
import { ToastrService } from '../../../../common/service/toastr.service';
//modal
import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
//model 
import { Roles } from '../../../../model/roles';
//interface 
import { Interfas_Roles } from '../../../interface/roles';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

	rol_menus;
	nombre_rol;
	roles_administrativos:string="";

	//modal boostrap
  	closeResult: string;

  	roles: Roles;
  	interfas_Roles:Interfas_Roles=
  	{
  		id:null,
  		nombre:null,
  		descripcion:null,
  		estado:null
  	};
  	lista_roles:Roles[];
  	temp_var:Object=false;
	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private _rolesService:RolesService,
		private toastrService:ToastrService,
		private modalService: NgbModal,
		) {
		this.rol_menus = this._usersService.getRol();
      	this.nombre_rol = this._usersService.getNombreRol();

      	this.roles = new Roles(null,null,null);
	}

	ngOnInit(): void {
		this.cargar();
	}

	/*
	metodos de api
	*/
	/*
	* Obtener roles
	*/
	getAllRoles(){
		this._rolesService.getAllRoles().subscribe(
			res => {
				if(res.code == 200){
					console.log(res);
					this.lista_roles = res.data;
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
	* Obtener roles
	*/
	editRoles(){
		console.log(this.roles);
		console.log(this.interfas_Roles.id);
		this._rolesService.editRoles(this.interfas_Roles.id, this.roles).subscribe(
			res => {
				if(res.code == 200){
					console.log(res);
					this.toastrService.Success(res.message,res.title);
					this.getAllRoles();
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


	/**************************************
	*************** Modales****************
	***************************************
	*/
	openEditModalRol(editRol,roles) {
		this.interfas_Roles = roles;
		this.roles = roles;
		this.roles.estado = '1';
		console.log(this.interfas_Roles);
		this.modalService.open(editRol, {ariaLabelledBy: 'modal-basic-title'}).result.then(
			(result) => {
				this.closeResult = `cerrado con: ${result}`;
				if(this.closeResult=='guardar'){
					console.log('guardar');
					this.editRoles();
				}
			},
			(reason) => {
				//this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				//console.log(reason);
		});
	}
	openDeleteModalRol(deleteRol) {
		
		this.modalService.open(deleteRol, {ariaLabelledBy: 'modal-basic-title'}).result.then(
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
			this.getAllRoles();
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
