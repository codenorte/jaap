import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { UsersService } from '../../../services/auth/users.service';
import { ToastrService } from '../../../common/service/toastr.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

	titulo:string= "Menu";
	identity;
	foto;
	channels;
	token;

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private toastrService:ToastrService,
		) {
		this.identity = this._usersService.getIdentity();
  	}

	ngOnInit(): void {
	}

	salir(){
		this.toastrService.Info("Ha cerrado la sesion","Informacion");
		localStorage.removeItem("foto");
		localStorage.removeItem("identity");
		localStorage.removeItem("channels");
		localStorage.removeItem("token");

		this.foto=null;
		this.identity=null;
		this.channels=null;
		this.token=null;
		this._router.navigate(['/']);
	}

}
