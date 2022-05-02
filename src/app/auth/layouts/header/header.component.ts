import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { UsersService } from '../../../services/auth/users.service';
import { ToastrService } from '../../../common/service/toastr.service';

// Para utilizar funciones globales javascript dentro de Angular
declare function customInitFunctions(): void;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

	titulo:string= "Header";
	identity;
	foto;
	channels;
	token;
	institucion;
	listausuario;

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private toastrService:ToastrService,
		) {
		this.identity = this._usersService.getIdentity();
		//console.log(this.identity);
  	}

	ngOnInit(): void {
	}

	salir(){
		//quitar css del admin
		const linkTheme = document.querySelector('#theme');
		linkTheme.setAttribute('href','');

		const linkStyle =  document.querySelector('#adminstyle');
		linkStyle.setAttribute('href', '');

		this.toastrService.Info("Ha cerrado la sesion","Informacion");
		localStorage.removeItem("foto");
		localStorage.removeItem("identity");
		localStorage.removeItem("channels");
		localStorage.removeItem("token");
		localStorage.removeItem("institucion");
		localStorage.removeItem("users");

		this.foto=null;
		this.identity=null;
		this.channels=null;
		this.token=null;
		this.institucion=null;
		this.listausuario=null;
		this._router.navigate(['/inicio']);
	}

}
