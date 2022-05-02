
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { MedidorService } from '../../../../services/auth/medidor.service';
import { DetallefacturaService } from '../../../../services/auth/detallefactura.service';
import { FacturasService } from '../../../../services/auth/facturas.service';

import { ToastrService } from '../../../../common/service/toastr.service';
import { UsersService } from '../../../../services/auth/users.service';
import { PagosasistenciaService } from '../../../../services/auth/pagosasistencia.service';
import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
//pdf 
import { jsPDF } from "jspdf";
//model
import { Detallefactura } from '../../../../model/detallefactura';
//grafica
import { MultiDataSet, Label, Color } from 'ng2-charts';
//material table
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
//reactive form
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

import { GLOBAL } from '../../../../services/service';

@Component({
  selector: 'app-medidor-detail',
  templateUrl: './medidor-detail.component.html',
  styleUrls: ['./medidor-detail.component.css']
})
export class MedidorDetailComponent implements OnInit {

	public url:string=GLOBAL.url;

	rol_menus;
	nombre_rol;
	roles_administrativos:string="";

	//grafica por hisstorial
	doughnutChartLabels: Label[] ; 
	doughnutChartData: MultiDataSet = [ ];
	colors: Color[] = [];
	//datos medidor
	medidor;
	usuario_dato;
	consumo;
	numeromedidor_id;
	//detallefactura
	detallefactura:Detallefactura;
	lista_detallefactura;
	dtOptions: DataTables.Settings = {};
	temp_var:Object=false;
	restarfila:number=0;
	sumarfila:number=0;

  	//reactive form listafacturas
  	facturasForm  = new FormGroup({
    	listafacturas: new FormArray([]),
	});
	listafactura_tamanio:number = 0;
	listafactura_restar_tamanio:number = 0;
	facturasForm_removidas  = new FormGroup({
    	listafacturas_removidas: new FormArray([]),
	});

  	subtotal: number=0;
  	iva: number=0;
  	tarexcedido: number=0;
  	alcantarillado: number=0;
  	total: number=0;
  	//modal
  	//modal boostrap
  	closeResult: string;
  	//detallefactura
  	array_datos = [];
  	array_totales = [];

  	ocultar_boton : string="";
  	//definir tamanio de la ventana
    public tamanio_ventana;
    //historial pagos
    ultimospagos;
	var_ultimospagos: Object =false;
	//reporte 
	url_reporte;

	ultimospagos_asistencia;
	var_ultimospagos_asistencia:Object = false;
  	
	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private _pagosasistenciaService:PagosasistenciaService,
		private _medidorService:MedidorService,
		private _detallefacturaService:DetallefacturaService,
		private _facturasService:FacturasService,
		private toastrService:ToastrService,
		private modalService: NgbModal,
		private formBuilder: FormBuilder
		) {

		this.detallefactura = new Detallefactura(null,null,'',null,null,null,null,null,null,null,null,null,'','',null,null,null);
		this._route.params.forEach((params:Params)=>{this.numeromedidor_id=params['medidor_id'];});

		this.rol_menus = this._usersService.getRol();
      	this.nombre_rol = this._usersService.getNombreRol();
	}

	ngOnInit(): void {
		this.getHistorialConsumo();
		this.getIdMedidorUserIdmedidor();
		this.cargar();
		//this.cargar();
	}
	setPreset() {
		//this.cities.patchValue(['LA', 'MTV']);
	}
	//obtener listaFacturas
	get listafacturas(): FormArray {
		return this.facturasForm.get('listafacturas') as FormArray;
	}
	initiateForm(lista_detallefactura): FormGroup {
		
		return this.formBuilder.group({
			ALCANTARRILLADO: lista_detallefactura.ALCANTARRILLADO,
			ANIOMES: lista_detallefactura.ANIOMES,
			BASE: lista_detallefactura.BASE,
			CONSUMO: lista_detallefactura.CONSUMO,
			DESCRIPCION: lista_detallefactura.DESCRIPCION,
			IDDETALLEFAC: lista_detallefactura.IDDETALLEFAC,
			IDFACTURA: lista_detallefactura.IDFACTURA,
			IDMEDIDOR: lista_detallefactura.IDMEDIDOR,
			IDTARIFAS: lista_detallefactura.IDTARIFAS,
			IVA: lista_detallefactura.IVA,
			MEDEXCEDIDO: lista_detallefactura.MEDEXCEDIDO,
			MEDIDAACT: lista_detallefactura.MEDIDAACT,
			MEDIDAANT: lista_detallefactura.MEDIDAANT,
			NUMFACTURA: lista_detallefactura.NUMFACTURA,
			OBSERVACION: lista_detallefactura.OBSERVACION,
			SUBTOTAL: lista_detallefactura.SUBTOTAL,
			APORTEMINGA: lista_detallefactura.APORTEMINGA,
			TARBASE: lista_detallefactura.TARBASE,
			TAREXCEDIDO: lista_detallefactura.TAREXCEDIDO,
			TOTAL: lista_detallefactura.TOTAL,
			VALOREXCESO: lista_detallefactura.VALOREXCESO,
			estado: lista_detallefactura.estado
		});
	}
	//obtener listaFacturas
	get listafacturas_removidas(): FormArray {
		return this.facturasForm_removidas.get('listafacturas_removidas') as FormArray;
	}
	/***********************************
	*	METODOS API
	************************************
	
	*/
	/*
	* Obtener historial medidor
	*/
	getHistorialConsumo(){
	this._detallefacturaService.getHistorialConsumo(this.numeromedidor_id).subscribe(
			res => {
	            if(res.code == 200){
	                console.log(res);
	                this.consumo =res.data;

	                let miarray: number[] = [];
	                let aniomes: string[] = [];
	                let micolor: string[] = [];

	                for (var i = 0; i < this.consumo.length; i++) {
	                	miarray[i] = this.consumo[i].CONSUMO;
	                	aniomes[i] = this.consumo[i].ANIOMES;
	                	if(this.consumo[i].estado==1){
	                		micolor[i] = '#28a745';
	                	}
	                	else{
	                		micolor[i] = '#dc3545';
	                	}
	                }
	                //console.log(aniomes);
	                this.doughnutChartData =[miarray];
	                this.doughnutChartLabels =aniomes;
	                this.colors = [{ backgroundColor: micolor }]
	                
	                this.color(this.colors);
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
	getIdMedidorUserIdmedidor(){
    	this._medidorService.getIdMedidorUserIdmedidor(this.numeromedidor_id).subscribe(
				res => {
		            if(res.code == 200){
		                console.log(res);
		                this.medidor = res.data;
		                this.usuario_dato = res.data.users;

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
	* Obtener lista de detallefactura pendientes por cobrar
	*/
	getDetallefacturaIdmedidor(){
		console.log(this.numeromedidor_id);
    	this._detallefacturaService.getDetallefacturaIdmedidor(this.numeromedidor_id).subscribe(
				res => {
		            if(res.code == 200){
		                console.log(res);
		                this.lista_detallefactura = res.data;
		                //console.log(this.lista_detallefactura);
		                //console.log(this.lista_detallefactura.length);

		                this.restarfila = this.lista_detallefactura.length;

		                if(this.lista_detallefactura.length>0){
		                	this.temp_var = true;
		                	this.ocultar_boton="mostrar";
		                }
		                else{
		                	this.temp_var = false;
		                }
		                console.log(this.temp_var);

		                //reactive
		                for (var i = 0; i < this.lista_detallefactura.length; ++i) {
							this.listafacturas.push(this.initiateForm(this.lista_detallefactura[i]));
		                }
		                
		                //console.log(this.facturasForm);
						//console.log(this.listafacturas.value);

						//console.log(this.facturasForm_removidas);
						//console.log(this.listafacturas_removidas.value);

						this.calcularTotal(this.lista_detallefactura);
		                this.listafactura_tamanio = this.listafacturas.controls.length;
		                this.listafactura_restar_tamanio = this.listafacturas.controls.length;
						
		            }else{
		            	console.log(res);
		            }
		        },
		        error => {
		            console.log(<any>error);
		        }
			);
	}

	getidFactura(factura_id){
		//Mostrar factura Id cobrada
        this._facturasService.getIdFactura(factura_id).subscribe(
			response => {
	            if(response.code == 200){
	                console.log(response);
	            }else{
	            	console.log(response);
	            	this.toastrService.Error("Error","Error");
	            }
	        },
	        error => {
	            console.log(<any>error);
	            this.toastrService.Error("Error",<any>error.error);
	        }
		);
	}

	/*
	* Obtener medidor y usuario
	*/
	getUltimosPagosFactura(){
    	this._facturasService.getUltimosPagosFactura(this.numeromedidor_id).subscribe(
				res => {
		            if(res.code == 200){
		                console.log(res);
		                this.ultimospagos = res.data;
		                this.var_ultimospagos = true;
		            }else{
		            	console.log(res);
		            	this.toastrService.Error("Error","Error");
		            }
		        },
		        error => {
		            console.log(<any>error);
		            this.toastrService.Error("Error",<any>error.error);
		        }
			);
	}

	/*
	* Obtener historial pagosasistenc
	*/
	historialPagosasistencia(){
		this._pagosasistenciaService.historialPagosasistencia(this.numeromedidor_id).subscribe(
			res => {
				if(res.code == 200){
					console.log(res);
					this.ultimospagos_asistencia = res.data;
		            this.var_ultimospagos_asistencia = true;
				}else{
					console.log(res);
				}
			},
			error => {
				console.log(<any>error);
			}
			);
	}
	
	
	/***********************************
	*	METODOS LOCALES
	************************************
	*/
	calcularTotal(lista_detallefactura){
		//console.log(lista_detallefactura);

		this.subtotal = 0;
		this.iva = 0;
		this.tarexcedido = 0;
		this.alcantarillado = 0;
		this.total =  0;
		lista_detallefactura.forEach((dato)=>{
			//console.log(dato.TOTAL);
			this.subtotal +=parseFloat(dato.SUBTOTAL+dato.APORTEMINGA);
			this.iva +=parseFloat(dato.IVA);
			this.tarexcedido +=parseFloat(dato.TAREXCEDIDO);
			this.alcantarillado +=parseFloat(dato.ALCANTARRILLADO);
			this.total += parseFloat(dato.TOTAL);
		});
		//console.log(this.iva);
		console.log(this.total);
	}
	color(colors?: Color[]){
		const auxColors = [];
		if (!colors[0].hasOwnProperty('backgroundColor')) {
			for (const color of colors) {
				auxColors.push(`#${color}`);
			}
			colors = [{ backgroundColor: auxColors}];
		}
	}

  	/**************************************
	*************** Modales****************
	***************************************
	*/
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
		this.getDetallefacturaIdmedidor();
		this.dtOptions = {
	      	pagingType: 'full_numbers'
	    };
	    this.tamanioVentana();
	    this.getUltimosPagosFactura();
	    this.historialPagosasistencia();

	    if(this.rol_menus==1||this.rol_menus==2||this.rol_menus==3){
			this.roles_administrativos="admin";
		}
		else if(this.rol_menus==4){
			this.roles_administrativos="operador";
		}
		else{
			this.roles_administrativos="user";
		}
	}

	/*
    * REPORTES
    */
    abrirVerReporte(url_download){
        var URL = this.url+url_download;
        let ventana=window.open(URL, 'popup', 'left=50, top=50, toolbar=0, resizable=1');
        ventana.resizeTo(this.tamanio_ventana[0]-30,this.tamanio_ventana[1]-5);
    }
    /*reporta factura normal*/
    verFacturaIdPDF(factura_id){
    	this.url_reporte='verFacturaIdPDF/'+factura_id;
    	console.log(this.url_reporte);
    	this.abrirVerReporte(this.url_reporte);
    }
    //ver factura ticket
    verFacturaIdPDFTicket(factura_id){
    	this.url_reporte='verFacturaIdPDFTicket/'+factura_id;
    	console.log(this.url_reporte);
    	this.abrirVerReporte(this.url_reporte);
    }

    /*reporte Pagosasistencia*/
    verRealizarPagoFacturaAsistenciaTicket(NUMFACTURA){
    	this.url_reporte='verRealizarPagoFacturaAsistenciaTicket/'+NUMFACTURA;
    	console.log(this.url_reporte);
    	this.abrirVerReporte(this.url_reporte);
    }

	generarPdf(){
		var URL = 'http://localhost:8001/api/createPDF/pdf';
        let ventana=window.open(URL, 'popup', 'left=50, top=50, toolbar=0, resizable=1');
        ventana.resizeTo(this.tamanio_ventana[0]-30,this.tamanio_ventana[1]-5);
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

