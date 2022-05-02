import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';

import { UsersService } from '../../../../services/auth/users.service';
import { ToastrService } from '../../../../common/service/toastr.service';

import { Users } from '../../../../model/users';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {

	users:Users;
	sector;
	roles;
	institucion;

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private toastrService:ToastrService
	) {
		this.users=new Users('','','','',null,'','','','','','','','','','','','',null);
	}

	ngOnInit(): void {
		this.cargar();
	}
	/**
	 * Get Id
	 *
	 * @param 
	 * @return datos empresa
	 */  	
  	getIdUser(){
		
	  	this._route.params.forEach((params:Params)=>
		  	{
		  	let usuarios_id=params['usuarios_id'];
		  	console.log(usuarios_id);
        	this._usersService.getIdUser(usuarios_id).subscribe(
					res => {
			            if(res.code == 200){
			                console.log(res);
		  					this.users=res.data;
		  					console.log(this.users);
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

  	editUser(){
		console.log(this.users);
		console.log(this.institucion);
		this.users.IDINSTITUCION=this.institucion.IDINSTITUCION;
		this.users.roles_id=5;

		this._route.params.forEach((params:Params)=>
		  	{
		  	let usuarios_id=params['usuarios_id'];
			this._usersService.editUser(usuarios_id,this.users).subscribe(
				response=>{
					if(response.code == 200){
						console.log(response);
			        	this._router.navigate(['/users']);
						this.toastrService.Success(response.message,response.title);
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
		);

	}
	cargar(){
		this.getIdUser();
		this.institucion=this._usersService.getInstitucion();
		this.sector = [
		      	{id: 1, name: "Capillapamba"},
		      	{id: 2, name: "Coragaloma"},
		      	{id: 3, name: "Pilchibuela"},
		      	{id: 4, name: "Tocagon Alto"}
		   	];
		
	}

}
