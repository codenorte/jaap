import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
//servicios
import { MedidorService } from '../../../../services/auth/medidor.service';
import { UsersService } from '../../../../services/auth/users.service';
import { AguaganaderiaService } from '../../../../services/auth/aguaganaderia.service';
import { FacturasganaderiaService } from '../../../../services/auth/facturasganaderia.service';

import { ToastrService } from '../../../../common/service/toastr.service';
import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { GLOBAL } from '../../../../services/service';

@Component({
  selector: 'app-aguaganaderia-detail',
  templateUrl: './aguaganaderia-detail.component.html',
  styleUrls: ['./aguaganaderia-detail.component.css']
})
export class AguaganaderiaDetailComponent implements OnInit {

	public url:string=GLOBAL.url;

	roles_administrativos:string="";
	rol_menus;
	nombre_rol;

	usuario_dato;
	aguaganaderia_id;
	lista_ganaderia;
	temp_var:Object=false;

	ultimospagos_ganaderia;
	var_ultimospagos_ganaderia:Object = false;

	//definir tamanio de la ventana
    public tamanio_ventana;
	url_reporte;

  	constructor(
		private modalService: NgbModal,
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private _aguaganaderiaService:AguaganaderiaService,
		private _facturasganaderiaService:FacturasganaderiaService,
		private toastrService:ToastrService,
		private _medidorService:MedidorService,
		) {

		this.rol_menus = this._usersService.getRol();
      	this.nombre_rol = this._usersService.getNombreRol();
	}

	ngOnInit(): void {
	    this.cargar();
	}

	/*
	* Obtener medidor y usuario
	*/
	getIdAguaganaderia(){
    	this._aguaganaderiaService.getIdAguaganaderia(this.aguaganaderia_id).subscribe(
				res => {
		            if(res.code == 200){
		                console.log(res);
		                //this.medidor = res.data;
		                this.usuario_dato = res.data;
		                this.temp_var=true;

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
	* Obtener medidor y usuario
	*/
	historialFacturaGanaderia(){
    	this._facturasganaderiaService.historialFacturaGanaderia(this.aguaganaderia_id).subscribe(
				res => {
		            if(res.code == 200){
		                console.log(res);
		                //this.medidor = res.data;
		                this.ultimospagos_ganaderia = res.data;
		                this.var_ultimospagos_ganaderia=true;

		            }else{
		            	console.log(res);
		            }
		        },
		        error => {
		            console.log(<any>error);
		        }
			);
	}

	cargar(){
		this.tamanioVentana();
		if(this.rol_menus==1||this.rol_menus==2||this.rol_menus==3){
			//lista usuarios
			this.roles_administrativos="admin";
			this._route.params.forEach((params:Params)=>{this.aguaganaderia_id=params['aguaganaderia_id'];});
			this.getIdAguaganaderia();
			this.historialFacturaGanaderia();
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

	/*
    * REPORTES
    */
    abrirVerReporte(url_download,IDFACTURASGANADERIA?){
        var URL = this.url+url_download;
        let ventana=window.open(URL, IDFACTURASGANADERIA, 'left=50, top=50, toolbar=0, resizable=1');
        ventana.resizeTo(this.tamanio_ventana[0]-30,this.tamanio_ventana[1]-5);
    }
    /*reporta factura normal*/
    verFacturaGanaderiaTicket(IDFACTURASGANADERIA){
    	this.url_reporte='verFacturaGanaderiaTicket/'+IDFACTURASGANADERIA;
    	console.log(this.url_reporte);
    	this.abrirVerReporte(this.url_reporte,IDFACTURASGANADERIA);
    }

	tamanioVentana(){
        var tam = [0, 0];
        if (typeof window.innerWidth != 'undefined')
        {
        tam = [window.innerWidth,window.innerHeight];
        }
        else if (typeof document.documentElement != 'undefined'
        && typeof document.documentElement.clientWidth !=
        'undefined' && document.documentElement.clientWidth != 0)
        {
        tam = [
        document.documentElement.clientWidth,
        document.documentElement.clientHeight
        ];
        }
        else   {
        tam = [
            document.getElementsByTagName('body')[0].clientWidth,
            document.getElementsByTagName('body')[0].clientHeight
            ];
        }
        this.tamanio_ventana=tam;
    }
}
