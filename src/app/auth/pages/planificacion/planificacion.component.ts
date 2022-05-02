import { Component, OnInit } from '@angular/core';
import { PagesService } from '../pages.service';
import { SettingsService } from '../../../services/settings.service';
import { Router,ActivatedRoute,Params } from '@angular/router';

import { UsersService } from '../../../services/auth/users.service';


@Component({
  selector: 'app-planificacion',
  templateUrl: './planificacion.component.html',
  styleUrls: ['./planificacion.component.css']
})
export class PlanificacionComponent implements OnInit {

	roles_administrativos:string="";
	rol_menus;
	nombre_rol;

	constructor(
		private _pagesService: PagesService,
		private _settingsService: SettingsService,
		private _route:ActivatedRoute,
      	private _router:Router,
      	private _usersService:UsersService,
		) {
		this.rol_menus = this._usersService.getRol();
      	this.nombre_rol = this._usersService.getNombreRol();
      	this.cargar();
	}

	ngOnInit(): void {
	}

	cargar(){
		if(this.rol_menus==1||this.rol_menus==2||this.rol_menus==3){
			this.roles_administrativos="admin";
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
