import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';

import { UsersService } from '../../../../services/auth/users.service';
import { ToastrService } from '../../../../common/service/toastr.service';

import { Users } from '../../../../model/users';

@Component({
  selector: 'app-aguaganaderia-edit',
  templateUrl: './aguaganaderia-edit.component.html',
  styleUrls: ['./aguaganaderia-edit.component.css']
})
export class AguaganaderiaEditComponent implements OnInit {
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

  	editUserAguaGanaderia(){
		console.log(this.users);
		console.log(this.institucion);
		this.users.IDINSTITUCION=this.institucion.IDINSTITUCION;
		this.users.roles_id=6;

		this._route.params.forEach((params:Params)=>
		  	{
		  	let usuarios_id=params['usuarios_id'];
			this._usersService.editUserAguaGanaderia(usuarios_id,this.users).subscribe(
				response=>{
					if(response.code == 200){
						console.log(response);
			        	this._router.navigate(['/aguaganaderia']);
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
		      	{ id:1, name:'Sanja Pamba' },
				{ id:2, name:'Lobojo' }
		   	];
		
	}

}
