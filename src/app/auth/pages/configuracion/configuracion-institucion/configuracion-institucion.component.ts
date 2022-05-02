import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
//services
import { UsersService } from '../../../../services/auth/users.service';
import { InstitucionService } from '../../../../services/auth/institucion.service';

//notificacion
import { ToastrService } from '../../../../common/service/toastr.service';
//modal
import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
//model 
import { Institucion } from '../../../../model/institucion';


@Component({
  selector: 'app-configuracion-institucion',
  templateUrl: './configuracion-institucion.component.html',
  styleUrls: ['./configuracion-institucion.component.css']
})
export class ConfiguracionInstitucionComponent implements OnInit {

	rol_menus;
	nombre_rol;
	roles_administrativos:string="";

	//modal boostrap
  	closeResult: string;

  	institucion: Institucion;
  	id_institucion;

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private _institucionService:InstitucionService,
		private toastrService:ToastrService,
		private modalService: NgbModal,
		) {
		this.institucion=new Institucion(null,null,null,null,null,null,null,null,null);
		this.rol_menus = this._usersService.getRol();
      	this.nombre_rol = this._usersService.getNombreRol();

	}

	ngOnInit(): void {
		this.cargar();
	}

	/*
	metodos de api
	*/
	/*
	* Obtener intitucion
	*/
	getAllInstitucion(){
		this._institucionService.getAllInstitucion().subscribe(
			res => {
				if(res.code == 200){
					console.log(res);
					this.institucion = res.data;
					this.id_institucion = res.data.IDINSTITUCION;
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
	* Obtener intitucion
	*/
	editInstitucion(){
		this._institucionService.editInstitucion(this.id_institucion,this.institucion).subscribe(
			res => {
				if(res.code == 200){
					console.log(res);
					this.institucion = res.data;
					this.toastrService.Success(res.message,res.title);
				}else{
					console.log(res);
					this.toastrService.Error("Error","Error");
				}
			},
			error => {
				this.toastrService.Error(<any>error.error.error,"Error");
				console.log(<any>error);
			}
			);
	}

	//metodos locales
	editarInstitucion(){
		console.log(this.id_institucion);
		this.editInstitucion();
	}


	/**************************************
	*************** Modales****************
	***************************************
	*/
	editarInstitucionOpenModal(editInstitucion) {
		
		this.modalService.open(editInstitucion, {ariaLabelledBy: 'modal-basic-title'}).result.then(
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
			this.getAllInstitucion();
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
