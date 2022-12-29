import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { UsersService } from '../../../../services/auth/users.service';
import { MedidorService } from '../../../../services/auth/medidor.service';

import { ToastrService } from '../../../../common/service/toastr.service';
import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.css']
})
export class UsersDetailComponent implements OnInit {


	roles_administrativos:string="";
	rol_menus;
	nombre_rol;

  	dtOptions: DataTables.Settings = {};
	temp_var:Object=false;

	users;
	medidorusers;

  	closeResult: string;

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private _medidorService:MedidorService,
		private toastrService:ToastrService,
		private modalService: NgbModal
		) {
		this.rol_menus = this._usersService.getRol();
      	this.nombre_rol = this._usersService.getNombreRol();
	}

	ngOnInit(): void {
		this.cargar();
	}

	/*
	* Actualizar estado users
	*/
	getMedidorIdUsers(){

		this._route.params.forEach((params:Params)=>
		  	{
		  	let usuarios_id=params['usuarios_id'];
		  	console.log(usuarios_id);
        	this._medidorService.getMedidorIdUsers(usuarios_id).subscribe(
					res => {
			            if(res.code == 200){
			                console.log(res);
			                this.users = res.data;
			                this.medidorusers = res.data.medidorusers;
			                this.temp_var=true;

			                //console.log(this.users);
			                //console.log(this.medidorusers);
			            }else{
			            	console.log(res);
			            }
			        },
			        error => {
			            console.log(<any>error);
			        }
				);
        	}
		);
	}

	cargar(){
		if(this.rol_menus==1||this.rol_menus==2||this.rol_menus==3){
			this.roles_administrativos="admin";
			this.getMedidorIdUsers();
		}
		else if(this.rol_menus==4){
			this.roles_administrativos="operador";
			this.getMedidorIdUsers();
		}
		else{
			this.roles_administrativos="user";
		}
		console.log(this._usersService.getRol());
		console.log(this.roles_administrativos);

	}

}
