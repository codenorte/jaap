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
import { Users } from '../../../../model/users';

@Component({
  selector: 'app-usuarios-admin',
  templateUrl: './usuarios-admin.component.html',
  styleUrls: ['./usuarios-admin.component.css']
})
export class UsuariosAdminComponent implements OnInit {

	rol_menus;
	nombre_rol;
	roles_administrativos:string="";

	//modal boostrap
  	closeResult: string;

  	users: Users;
  	lista_users;
  	users_id;
  	temp_var:Object=false;

  	institucion;
	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private toastrService:ToastrService,
		private modalService: NgbModal,
		) {
		this.rol_menus = this._usersService.getRol();
      	this.nombre_rol = this._usersService.getNombreRol();
      	this.institucion = this._usersService.getInstitucion();

      	this.users=new Users('','','','',null,'','','','','','','','','','','','',null);
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
	getAllUserAdmin(){
		this._usersService.getAllUserAdmin().subscribe(
			res => {
				if(res.code == 200){
					console.log(res);
					this.lista_users = res.data;
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
	* Editar users
	*/
	editUser(){
		console.log(this.users);
		//return "";
		this._usersService.editUser(this.users_id, this.users).subscribe(
			res => {
				if(res.code == 200){
					console.log(res);
					this.toastrService.Success(res.message,res.title);
					this.getAllUserAdmin();
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
	* Editar users password
	*/
	actualizarClaveDeUsuario(){
		console.log(this.users);
		this._usersService.actualizarClaveDeUsuario(this.users_id, this.users).subscribe(
			res => {
				if(res.code == 200){
					console.log(res);
					this.toastrService.Success(res.message,res.title);
					this.getAllUserAdmin();
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
	openEditModalUsers(editUsers,users) {
		this.users_id = users.id;
		this.users = users;
		this.users.roles_id = users.roles_id;
		this.users.IDINSTITUCION = this.institucion.IDINSTITUCION;

		console.log(this.users);
		this.modalService.open(editUsers, {ariaLabelledBy: 'modal-basic-title'}).result.then(
			(result) => {
				this.closeResult = `cerrado con: ${result}`;
				if(this.closeResult=='guardar'){
					console.log('guardar');
					this.editUser();
				}
			},
			(reason) => {
				//this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				//console.log(reason);
		});
	}
	openEditModalUsersPassword(editUsersPassword,users) {
		this.users_id = users.id;
		this.users = users;
		this.users.roles_id = users.roles_id;
		this.users.NOMBRES = users.NOMBRES;
		this.users.APELLIDOS = users.APELLIDOS;
		this.users.IDINSTITUCION = this.institucion.IDINSTITUCION;

		console.log(this.users);
		this.modalService.open(editUsersPassword, {ariaLabelledBy: 'modal-basic-title'}).result.then(
			(result) => {
				this.closeResult = `cerrado con: ${result}`;
				if(this.closeResult=='guardar'){
					console.log('guardar');
					this.editUser();
				}
			},
			(reason) => {
				//this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				//console.log(reason);
		});
	}

	openDeleteModalUsers(deleteUsers) {
		
		this.modalService.open(deleteUsers, {ariaLabelledBy: 'modal-basic-title'}).result.then(
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
			this.getAllUserAdmin();
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
