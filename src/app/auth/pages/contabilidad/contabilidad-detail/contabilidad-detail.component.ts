import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { UsersService } from '../../../../services/auth/users.service';
import { DetallefacturaService } from '../../../../services/auth/detallefactura.service';
import { DetallefacturaganaderiaService } from '../../../../services/auth/detallefacturaganaderia.service';
import { ControlaniomesdetallefacturaService } from '../../../../services/auth/controlaniomesdetallefactura.service';
//ganaderia 
import { ControlaniomesganaderiaService } from '../../../../services/auth/controlaniomesganaderia.service';

import { ToastrService } from '../../../../common/service/toastr.service';
import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

//interface 
import { ControlaniomesDetallefactura } from '../../../interface/controlaniomesdetallefactura';
import { ControlaniomesGanaderia } from '../../../interface/controlaniomesganaderia';

import { GLOBAL } from '../../../../services/service';

@Component({
  selector: 'app-contabilidad-detail',
  templateUrl: './contabilidad-detail.component.html',
  styleUrls: ['./contabilidad-detail.component.css']
})
export class ContabilidadDetailComponent implements OnInit {

	roles_administrativos:string="";
	rol_menus;
	nombre_rol;

	//modal
	closeResult: string;

	lista_controlaniomes;
	lista_controlaniomes_desde;

	//ganaderia
	lista_controlaniomes_ganaderia;
	lista_controlaniomes_desde_ganaderia;
	fechabusqueda: Fechabusqueda = {
		inicial: null,
		fin :null
	};

	fechabusquedaganaderia: FechabusquedaGanaderia = {
		inicial_ganaderia: null,
		fin_ganaderia :null
	};
	fecha_inicial_ganaderia;
	fecha_fin_ganaderia;
	controlaniomesGanaderia:ControlaniomesGanaderia[];
	mostrar_existefin_ganaderia:ControlaniomesGanaderia[];
	existefin_ganaderia:boolean= false;
	ss_ganaderia;

	suma_subtotalganaderia:number = 0;
    suma_ivaganaderia:number = 0;
    suma_totalganaderia:number = 0;
    suma_mesescobrados:number = 0;
    total_usuarioscobrados_ganaderia:number = 0;
    total_usuariosporcobrar_ganaderia:number = 0;
    suma_numeroinstalacioncobrados:number = 0;
    suma_dineroinstalacioncobrados:number = 0;
    total_facturasganaderia:number = 0;
    imprimirganaderia:boolean=false;
    controlaniomes_fin_ganaderia;
	controlaniomes_inicio_ganaderia;

	//sobrante

	fechabusquedasobrante: FechabusquedaSobrante = {
		inicial_sobrante: null,
		fin_sobrante :null
	};
	//consumo de agua
	controlaniomes_consumo;
	suma_consumo:number = 0;
	suma_excedido:number = 0;

	suma_tar_excedido:number = 0;
	suma_aporteminga:number = 0;
	suma_alcantarillado:number = 0;
	suma_subtotal:number = 0;
    suma_total_det: number=0;
    total_sumar_detalle: number=0;
    suma_reconexion: number=0;
    total_total: number=0;

    suma_total_fact: number=0;
    total_facturas: number=0;
    suma_meses_cobrados: number=0;
    total_usuarioscobrados: number=0;
    total_usuariosporcobrar: number=0;
    pagosasistencia: number=0;
    suma_mingapago: number=0;
    facturasinstalacion: number=0;
    suma_facturainstalacion: number=0;
    facturasganaderia: number=0;
    suma_ganaderia: number=0;
    facturassobrante: number=0;
    suma_aguasobrante: number=0;


	fecha_inicial;
	fecha_fin;
	existefin:boolean= false;
	mostrar_existefin:ControlaniomesDetallefactura[];
	ss;
	controlaniomesDetallefactura:ControlaniomesDetallefactura[];
	// reporte cobro general agua 
	public url:string=GLOBAL.url;
    public tamanio_ventana;
    imprimir:boolean= false;

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private _detallefacturaService:DetallefacturaService,
		private _detallefacturaganaderiaService:DetallefacturaganaderiaService,
		private _controlaniomesdetallefacturaService:ControlaniomesdetallefacturaService,
		private _controlaniomesganaderiaService:ControlaniomesganaderiaService,
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
	* lista meses control anio, aguaconsumo
	*/
	getAllContrlaniomesDescencente(){

    	this._controlaniomesdetallefacturaService.getAllContrlaniomesDescencente().subscribe(
				res => {
		            if(res.code == 200){
		                console.log(res);
		                this.lista_controlaniomes = res.data;
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
	* Calcular cobro mensual
	*/
	obtenerCobroMensual(){
		console.log(this.fechabusqueda);
		this.toastrService.Info("Buscando...","Facturas");

    	this._detallefacturaService.obtenerCobroMensual(this.fechabusqueda.inicial,this.fechabusqueda.fin).subscribe(
				res => {
		            if(res.code == 200){
		                console.log(res);
		                //console.log(res.pagosasistencia);
		                this.controlaniomes_consumo = res.controlaniomes;
						/*for (var i = 0; i < res.pagosasistencia.length; i++) {
							console.log(
								res.pagosasistencia[i].asistenciaselect.medidor_select.users_name.RUCCI + '-' +
								res.pagosasistencia[i].asistenciaselect.medidor_select.users_name.NOMBRES + ' ' +
								res.pagosasistencia[i].asistenciaselect.medidor_select.users_name.APELLIDOS + '-' +
								res.pagosasistencia[i].asistenciaselect.medidor_select.users_name.APADOSN + ' ' +
								res.pagosasistencia[i].asistenciaselect.medidor_select.users_name.SECTOR + '-' +
								res.pagosasistencia[i].asistenciaselect.medidor_select.CODIGO + ' '
								);
						}*/
		                if(res.total_facturas>0){
			                this.toastrService.Success(res.total_facturas+" facturas encontradas","Facturas");

							this.suma_consumo = res.suma_consumo;
							this.suma_excedido = res.suma_excedido;

							this.suma_tar_excedido = res.suma_tar_excedido;
							this.suma_aporteminga = res.suma_aporteminga;
							this.suma_alcantarillado = res.suma_alcantarillado;
							this.suma_subtotal = res.suma_subtotal;
						    this.suma_total_det = res.suma_total_det;
						    this.total_sumar_detalle = res.total_sumar_detalle;
						    this.suma_reconexion = res.suma_reconexion;
						    this.total_total = res.total_total;

						    this.suma_total_fact = res.suma_total_fact;
						    this.total_facturas = res.total_facturas;
						    this.suma_meses_cobrados = res.suma_meses_cobrados;
						    this.total_usuarioscobrados = res.total_usuarioscobrados;
						    this.total_usuariosporcobrar = res.total_usuariosporcobrar;
						    this.pagosasistencia = res.pagosasistencia;
						    this.suma_mingapago = res.suma_mingapago;
						    this.facturasinstalacion = res.facturasinstalacion;
						    this.suma_facturainstalacion = res.suma_facturainstalacion;
						    this.facturasganaderia = res.facturasganaderia;
						    this.suma_ganaderia = res.suma_ganaderia;
						    this.facturassobrante = res.facturassobrante;
						    this.suma_aguasobrante = res.suma_aguasobrante;

							this.imprimir =true;

		                }
		                else{
		                	this.toastrService.Warning("Facturas no encontradas","Sin datos");
		                }
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
	* Calcular cobro mensual AGUAGANADERIA
	*/
	obtenerCobroMensualGanaderia(){
		console.log(this.fechabusquedaganaderia);
		this.toastrService.Info("Buscando...","Facturas agua ganaderia");

    	this._detallefacturaganaderiaService.obtenerCobroMensualGanaderia(this.fechabusquedaganaderia.inicial_ganaderia,this.fechabusquedaganaderia.fin_ganaderia)
    	.subscribe(
				res => {
		            if(res.code == 200){
		                console.log(res);
		                this.controlaniomes_fin_ganaderia = res.controlaniomes_fin;
		                this.controlaniomes_inicio_ganaderia = res.controlaniomes_inicio;
		                if(res.total_facturasganaderia>0){
			                this.toastrService.Success(res.total_facturasganaderia+" facturas encontradas","Facturas");
							this.total_facturasganaderia = res.total_facturasganaderia;
							this.suma_mesescobrados = res.suma_mesescobrados;
							this.total_usuarioscobrados_ganaderia = res.total_usuarioscobrados_ganaderia;
							this.total_usuariosporcobrar_ganaderia = res.total_usuariosporcobrar_ganaderia;

							//this.suma_numeroinstalacioncobrados = res.suma_numeroinstalacioncobrados;
							//this.suma_dineroinstalacioncobrados = res.suma_dineroinstalacioncobrados;
			                this.suma_subtotalganaderia = res.suma_subtotalganaderia;
							this.suma_ivaganaderia = res.suma_ivaganaderia;
							this.suma_totalganaderia = res.suma_totalganaderia;
							this.imprimirganaderia =true;
		                }
		                else{
		                	this.toastrService.Warning("Facturas no encontradas","Sin datos");
		                }
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
	* Obtener anio descentetemente con parametro desde inicial hasta fin por controlaniomes
	*/
	getAllControlaniomesDescencenteInicioFin(){
		this.ss = null;
		console.log(this.ss);

    	this._controlaniomesdetallefacturaService.getAllControlaniomesDescencenteInicioFin(this.fechabusqueda.inicial).subscribe(
				res => {
		            if(res.code == 200){
		                console.log(res);
		                this.lista_controlaniomes_desde = res.data;
		                this.controlaniomesDetallefactura = res.data;
		                for (var i = 0; i < this.lista_controlaniomes_desde.length; ++i) {
		                	this.fecha_inicial = this.lista_controlaniomes_desde[0];
		                	this.fecha_fin = this.lista_controlaniomes_desde[this.lista_controlaniomes_desde.length-1];
		                }
		                console.log(this.fecha_inicial);
		                console.log(this.fecha_fin);
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
	* lista meses control anio, aguaganaderia
	*/
	getAllContrlaniomesDescencenteGanaderia(){

    	this._controlaniomesganaderiaService.getAllContrlaniomesDescencenteGanaderia().subscribe(
				res => {
		            if(res.code == 200){
		                console.log(res);
		                this.lista_controlaniomes_ganaderia = res.data;
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
	* Obtener anio descentetemente con parametro desde inicial hasta fin por controlaniomes
	*/
	getAllControlaniomesDescencenteInicioFinGanaderia(){
		this.ss = null;
		console.log(this.ss);
		console.log(this.fechabusquedaganaderia);
    	this._controlaniomesganaderiaService.getAllControlaniomesDescencenteInicioFinGanaderia(this.fechabusquedaganaderia.inicial_ganaderia).subscribe(
				res => {
		            if(res.code == 200){
		                console.log(res);
		                this.lista_controlaniomes_desde_ganaderia = res.data;
		                this.controlaniomesGanaderia = res.data;
		                for (var i = 0; i < this.lista_controlaniomes_desde_ganaderia.length; ++i) {
		                	this.fecha_inicial_ganaderia = this.lista_controlaniomes_desde_ganaderia[0];
		                	this.fecha_fin_ganaderia = this.lista_controlaniomes_desde_ganaderia[this.lista_controlaniomes_desde_ganaderia.length-1];
		                }
		                console.log(this.fecha_inicial_ganaderia);
		                console.log(this.fecha_fin_ganaderia);
		            }else{
		            	console.log(res);
		            }
		        },
		        error => {
		            console.log(<any>error);
		        }
			);
        	
	}
	//metodos locales

	Buscar(){
		console.log(this.fechabusqueda);
		this.obtenerCobroMensual();
	}
	BuscarGanaderia(){
		console.log(this.fechabusquedaganaderia);
		this.obtenerCobroMensualGanaderia();
	}
	seleccionFin(value){
		this.ss=value.target.value.split(": ");
		//console.log(this.ss);
		//console.log(value.target.value);
    	//console.log(this.fecha_inicial);


    	console.log(this.ss[1]);
		console.log(this.controlaniomesDetallefactura);

		for (var i = 0; i < this.controlaniomesDetallefactura.length; ++i) {
			if(this.controlaniomesDetallefactura[this.controlaniomesDetallefactura.length-1].id==this.ss[1]){
				this.mostrar_existefin = this.lista_controlaniomes_desde[i];
				console.log(this.mostrar_existefin);
				this.existefin = false;
			}
			else if(this.controlaniomesDetallefactura[i].id==this.ss[1]){
				this.existefin = true;
				this.mostrar_existefin = this.lista_controlaniomes_desde[i];
				console.log(this.mostrar_existefin);
			}
		}

	}
	seleccionFinGanaderia(value){
		this.ss_ganaderia=value.target.value.split(": ");
		//console.log(this.ss_ganaderia);
		//console.log(value.target.value);
    	//console.log(this.fecha_inicial);


    	console.log(this.ss_ganaderia[1]);
		console.log(this.controlaniomesGanaderia);

		for (var i = 0; i < this.controlaniomesGanaderia.length; ++i) {
			if(this.controlaniomesGanaderia[this.controlaniomesGanaderia.length-1].ANIOMES==this.ss_ganaderia[1]){
				this.mostrar_existefin_ganaderia = this.lista_controlaniomes_desde_ganaderia[i];
				console.log(this.mostrar_existefin_ganaderia);
				this.existefin_ganaderia = false;
			}
			else if(this.controlaniomesGanaderia[i].ANIOMES==this.ss_ganaderia[1]){
				this.existefin_ganaderia = true;
				this.mostrar_existefin_ganaderia = this.lista_controlaniomes_desde_ganaderia[i];
				console.log(this.mostrar_existefin_ganaderia);
			}
		}
		/*
		*/

	}
	/*
    * REPORTES
    */
    abrirVerReporte(url_download){
    	
        var URL = this.url+url_download+'/'+this.fechabusqueda.inicial+'/'+this.fechabusqueda.fin;
        let ventana=window.open(URL, 'popup', 'left=50, top=50, toolbar=0, resizable=1');
        ventana.resizeTo(this.tamanio_ventana[0]-30,this.tamanio_ventana[1]-5);
    }
	cargar(){
		if(this.rol_menus==1||this.rol_menus==2||this.rol_menus==3){
			this.roles_administrativos="admin";
			this.getAllContrlaniomesDescencente();
			this.getAllContrlaniomesDescencenteGanaderia();
			this.tamanioVentana();
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

    printComponent(cmpName,title) {

    	var titulo = '';
    	if(cmpName=='consumoAgua'){
	    	if(this.controlaniomes_consumo[0].id!=this.controlaniomes_consumo[1].id){
	    		titulo = title+' de '+this.controlaniomes_consumo[0].aniomes+' a ' + this.controlaniomes_consumo[1].aniomes;
	    	}
	    	else{
	    		titulo = title+' de '+this.controlaniomes_consumo[0].aniomes;
	    	}
    	}
    	else if(cmpName=='aguaGanaderia'){
    		if(this.controlaniomes_inicio_ganaderia!=this.controlaniomes_fin_ganaderia){
	    		titulo = title+' de '+this.controlaniomes_inicio_ganaderia+' a ' + this.controlaniomes_fin_ganaderia;
	    	}
	    	else{
	    		titulo = title+' de '+this.controlaniomes_inicio_ganaderia;
	    	}
    	}


    	var printContent = document.getElementById(cmpName).innerHTML;// Obtenga el código HTML que necesita imprimir

        var printWindow = window.open('', '_blank',
            'left=50, top=50,location=0,menubar=0,status=0,toolbar=0,scrollbars=1');
        printWindow.resizeTo(this.tamanio_ventana[0]-30,this.tamanio_ventana[1]-5);
        printWindow.document.write(`
    		<html>
    		<head>
    		<title>${titulo}</title>
    		<meta name="viewport" content="width=10000, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    		<link rel="stylesheet" href="assets/public/css/bootstrap-print.min.css">
    		<link rel="stylesheet" href="assets/css/style.css">


    		<style>
    		.salto_pagina_despues{
    			page-break-after:always;
    		}

    		.salto_pagina_anterior{
    			page-break-before:always;
    		}

    		.content {
    			height: 100vh;
    			width: 100%;
    			display: flex;
    			flex-direction: column;
    		}

    		.img-content {
    			flex: 1;
    			display: flex;
    			justify-content: center;
    			align-items: center;
    		}

    		.observation {
    			height: 150px;
    			overflow: hidden;
    			overflow-y: auto;
    		}
    		.doNotPrint{display:none !important;}
    		</style>
    		</head>
    		<body onload="window.print();">
    		${printContent}
    		</body>
    		</html>`);
        setTimeout(()=>{
	        printWindow.focus();// La ventana recién creada recibe el foco
	        printWindow.document.close();// Cierre el flujo de salida del documento de la nueva ventana, esto es necesario, de lo contrario, la siguiente declaración de impresión no es válida
	        //printWindow.print();// Imprime el contenido en la nueva ventana actual
        	printWindow.close();// Cerrar la ventana recién creada
	  	}, 1000);

    	/*var newStr = document.getElementById(cmpName).innerHTML; // Obtenga la parte de impresión
		var win = window.open("", "Nueva ventana de impresión", "height = 300, width = 700, top = 100"); // Nueva ventana
		win.document.body.innerHTML = newStr; // El contenido impreso se escribe en la nueva ventana
		win.print (); // Realizar impresión*/


    	/*let popupWinindow;
    	let innerContents = document.getElementById(cmpName).innerHTML; 
    	popupWinindow = window.open('', '_blank', 'left=50, top=50, toolbar=0, resizable=1');
    	popupWinindow.resizeTo(this.tamanio_ventana[0]-30,this.tamanio_ventana[1]-5); 
    	popupWinindow.document.open(); 
    	popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' 
    		+ innerContents + '</html>'); 
    	popupWinindow.document.close();
*/

/*		let printContents = document.getElementById(cmpName).innerHTML;
		let originalContents = document.body.innerHTML;

		document.body.innerHTML = printContents;



		var beforePrint = function() {
	        console.log('Functionality to run before printing.');
	    };
	    var afterPrint = function() {
	        console.log('Functionality to run after printing');
	    };

	    if (window.matchMedia) {
	        var mediaQueryList = window.matchMedia('print');
	        mediaQueryList.addListener(function(mql) {
	            if (mql.matches) {
	                beforePrint();
	            } else {
	                afterPrint();
	            }
	        });
	    }
	 
	    window.onbeforeprint = beforePrint;
	    window.onafterprint = afterPrint;


		window.print();
		document.body.innerHTML = originalContents;*/
	}

}

export interface Fechabusqueda {
  
	inicial:number;
	fin:number;
}


export interface FechabusquedaGanaderia {
  
	inicial_ganaderia:number;
	fin_ganaderia:number;
}

export interface FechabusquedaSobrante {
  
	inicial_sobrante:number;
	fin_sobrante:number;
}