import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { UsersService } from '../../services/auth/users.service';
import { Userslogin } from '../../model/userslogin';
import { ToastrService } from '../../common/service/toastr.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	titulo:string;
	public user:Userslogin;

	public token;
	public identity;
	public foto;

	public channelsSA;//rool superadmin 
	public channelsA;//rool admin
	public channelsS;//rool secretaria
	public channels0;//rool Operador
	public channelsU;//rool Usuario

	//mostrar contraseña
	show: boolean = false;
	show_eye: boolean = true;

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private toastrService:ToastrService
		) {
		this.titulo="Login";
		this.user=new Userslogin('','','','',null,'','','','','','','','','','','','',null);

		//localStorage value 
		//para el rool del usuario superadmin rol 1
		this.channelsSA="name:Landscapes1name:Landscapes:true:name:CatsChannel,enabled:true},{name:DogsChannel,enabled";
		//para el rool del usuario admin rol 2
		this.channelsA="name:Landscapes2name:Landscapes:true:name:CatsChannel,enabled:true},{name:DogsChannel,enabled";
	    //para el rool del usuario secretaria rol 3
	    this.channelsS="name:Landscapes3name:Landscapes:true:name:CatsChannel,enabled:true},{name:DogsChannel,enabled";
	    //para el rool del usuario operador rol 4
	    this.channels0="name:Landscapes4name:Landscapes:true:name:CatsChannel,enabled:true},{name:DogsChannel,enabled";
	    //para el rool del usuario usuario rol 5
	    this.channelsU="name:Landscapes5name:Landscapes:true:name:CatsChannel,enabled:true},{name:DogsChannel,enabled";

  	}

	ngOnInit(): void {
	}
	//cargar usuarios en localStorage
	getAllUserMedidor(){
		this._usersService.getAllUserMedidor().subscribe(
			response=>{
				if(response.code == 200){
					console.log(response);
					localStorage.setItem('users',JSON.stringify(response.data));
				}
				else{
					console.log("Error al cargar usuarios");
					//this.toastrService.Error("Error","Error");
				}
			},
			error=>{
				console.log(<any>error.error);
				//this.toastrService.Error("Error de datos","Error");
			}
			);
	}
	//mostrar contraseña
	passwordShow() {
	    this.show = !this.show;
	    this.show_eye = !this.show_eye;
	}

	login(){
		this._usersService.login(this.user).subscribe(
			response=>{
				if(response.code == 200){
					console.log(response);

					localStorage.setItem('token',response.data.api_token);
					localStorage.setItem('identity',JSON.stringify(response.data));
					localStorage.setItem('foto',JSON.stringify(response.fotos));
					localStorage.setItem('institucion',JSON.stringify(response.institucion));
					
					this.toastrService.Success("Usted ha iniciado sesion correctamente","Bienvenido");
			        this.toastrService.Info(response.data.NOMBRES+' '+response.data.APELLIDOS,'BIENVENIDO');
					
					/*agregar en localstorage*/
					if(response.data.roles_id==1){
  					//rol superadmin
  						localStorage.setItem('channels',this.channelsSA);
  						this.getAllUserMedidor();
		  			}
		  			if(response.data.roles_id==2){
		  				//rol admin
		  				localStorage.setItem('channels',this.channelsA);
		  				this.getAllUserMedidor();
		  			}
			        if(response.data.roles_id==3){
			            //rol secretaria
			            localStorage.setItem('channels',this.channelsS);
			            this.getAllUserMedidor();
			        }
			        if(response.data.roles_id==4){
			            //rol Operador
			            localStorage.setItem('channels',this.channels0);
			         	this.getAllUserMedidor();
			        }
			        if(response.data.roles_id==5){
			            //rol cliente
			            localStorage.setItem('channels',this.channelsU);
			        }

			        this._router.navigate(['/dashboard']);

				}
				else{
					this.toastrService.Error("Error al iniciar sesion","Error");
				}
			},
			error=>{
				console.log(<any>error.error);
				Swal.fire('Error',<any>error.error.error,'error')
				this.toastrService.Error("Error al iniciar sesion","Error");

			}
			);
	}

}
