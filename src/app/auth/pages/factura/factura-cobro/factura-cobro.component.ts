import { Component, OnInit,PipeTransform  } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';

import { ToastrService } from '../../../../common/service/toastr.service';
import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { UsersService } from '../../../../services/auth/users.service';
import { DetallefacturaService } from '../../../../services/auth/detallefactura.service';
import { FacturasService } from '../../../../services/auth/facturas.service';
import { MedidorService } from '../../../../services/auth/medidor.service';
import { CorteService } from '../../../../services/auth/corte.service';
import { OtrospagosService } from '../../../../services/auth/otrospagos.service';
import { AsistenciaService } from '../../../../services/auth/asistencia.service';
import { PagosasistenciaService } from '../../../../services/auth/pagosasistencia.service';

import { GLOBAL } from '../../../../services/service';

//reactive form
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

//interface 
import { Usermedidor } from '../../../interface/usermedidor';

//models 
import { Otrospagos } from '../../../../model/otrospagos';
import { Asistencia } from '../../../../model/asistencia';
import { Medidor } from '../../../../model/medidor';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-factura-cobro',
  templateUrl: './factura-cobro.component.html',
  styleUrls: ['./factura-cobro.component.css']
})
export class FacturaCobroComponent implements OnInit {
	
	public url:string=GLOBAL.url;

	roles_administrativos:string="";
	rol_menus;
	nombre_rol;
	identity;
	usuario_actual;

	factura_cobro: FacturaCobro = {
		nummedidor:null,
		codigo:null,
		rucci:null,
		estado:null,
		nombres:null,
		roles_id:null
	};
	/*seleccionar_opcion =[
	{ id:1, name:'medidor' ,text:'Numero de medidor' },
	{ id:3, name:'todo' ,text:'Mostrar todo' }
	];
	opcion_de_busqueda:string = '';
	*/

	//reactive form listafacturas
  	facturasForm  = new FormGroup({
    	listafacturas: new FormArray([]),
	});
	listafactura_tamanio:number = 0;
	listafactura_restar_tamanio:number = 0;
	facturasForm_removidas  = new FormGroup({
    	listafacturas_removidas: new FormArray([]),
	});

	//medidor
	medidor;
	numeromedidor_id;
	codigo;
	codigo2;
	//datos medidor
	usuario_dato;
	medidor_inactivo:boolean = false;

	//detallefactura
	temp_var:Object=false;
	lista_detallefactura;
	restarfila:number=0;
	array_totales = [];
	array_datos = [];

	ocultar_boton : string="";

	subtotal: number=0;
  	iva: number=0;
  	tarexcedido: number=0;
  	alcantarillado: number=0;
  	total: number=0;
  	reconexion :number =0;

  	//modal boostrap
  	closeResult: string;

  	//definir tamanio de la ventana
    public tamanio_ventana;
    numero_factura;
    numero_facturaMingas
    //reporte 
	url_reporte;

	//buscar usuario
	message_error;
	datos_usuario;
	lista_usuarios_datos;
	temp_var_selecionarusuario:Object = false;

	//usuario_medidor;
	temp_var_usuario_medidor:Object = false;
	dtOptions: any = {};


	//busqueda por pipe 
	searchValue = '';
	usermedidor:Usermedidor[];
	allusermedidor:Usermedidor[];
	//paginacion
	public page=1;
	public pageSize = 10;
	collectionSize: number;

	total_usermedidor;
	//corte
	lista_corte;
	temp_var_corte:Object = false;
	otrospagos:Otrospagos;
	multa_corte;
	/*
	* mingas
	*/
	lista_multas;
	temp_var_minga:Object=false;
	lista_detallefacturaMingas;
	//reactive form listafacturasMingas
  	facturasMingasForm  = new FormGroup({
    	listafacturasMingas: new FormArray([]),
	});
	listafacturaMingas_tamanio:number = 0;
	listafacturaMingas_restar_tamanio:number = 0;
	facturasMingasForm_removidas  = new FormGroup({
    	listafacturasMingas_removidas: new FormArray([]),
	});
	totalMinga:number=0;
	ocultar_boton_minga:string='';
	array_totalesMingas = [];
	array_datosMinga = [];

	//SALDO INSTALACION 
	saldo:number=0;
	saldo_instalacion:number=0;
	var_saldo:Object=false;
	medidor_model:Medidor;
	boton_saldo;
	idmedidor;
	array_instalacion=[];
	IDFACTURA_instalacion;


  	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private toastrService:ToastrService,
		private modalService: NgbModal,
		private _detallefacturaService:DetallefacturaService,
		private formBuilder: FormBuilder,
		private _facturasService:FacturasService,
		private _medidorService:MedidorService,
		private _corteService:CorteService,
		private _otrospagosService:OtrospagosService,
		private _asistenciaService:AsistenciaService,
		private _pagosasistenciaService:PagosasistenciaService,

		) {
		this.rol_menus = this._usersService.getRol();
		this.identity = this._usersService.getIdentity();
      	this.nombre_rol = this._usersService.getNombreRol();
	
		//console.log(this.factura_cobro);
		this.otrospagos = new Otrospagos(null,null,null,null,null,null,null,null,null,null);
		this.medidor_model = new Medidor(null,null,null,null,null,null,null,null,null,null,null);
	}

	ngOnInit(): void {
		this.cargar();

		this.usuario_actual = this.identity.NOMBRES + ' ' + this.identity.APELLIDOS;
		//console.log(this.usuario_actual);
	}
	public onPageChange(pageNum: number): void {
		console.log(pageNum);
    	this.pageSize = this.pageSize*(pageNum - 1);
    	console.log(this.pageSize);
  	}
  	pruebaPipe() {
	   	//this._busquedausuarioPipe.transform(this.usermedidor, this.searchValue);
	}
	eventoBuscar(value: string):void{
		//console.log(value);
	    this.usermedidor = this.allusermedidor.filter(
	    	(usermedidor) => 
	    	//val.NOMBRES.toLowerCase().includes(value)
	    	usermedidor.RUCCI.toLowerCase().includes(value.toLowerCase()) ||
			usermedidor.NOMBRES.toLowerCase().includes(value.toLowerCase()) ||
			usermedidor.APELLIDOS.toLowerCase().includes(value.toLowerCase()) ||
			usermedidor.APADOSN.toLowerCase().includes(value.toLowerCase()) ||
			usermedidor.SECTOR.toLowerCase().includes(value.toLowerCase()) 
			//|| usermedidor.medidor[0].NUMMEDIDOR.toString().toLowerCase().includes(value.toLowerCase()) 
	    	);
    	this.collectionSize = this.usermedidor.length;
    	//console.log(this.usermedidor);
    	//console.log(this.collectionSize);
	}

	/**
	** FORMULARIOS REACTIVOS
	***
	**/

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
			APORTEMINGA: lista_detallefactura.APORTEMINGA,
			SUBTOTAL: lista_detallefactura.SUBTOTAL,
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



	//mingas
	get listafacturasMingas(): FormArray {
		return this.facturasMingasForm.get('listafacturasMingas') as FormArray;
	}

	initiateFormMingas(lista_detallefacturaMingas): FormGroup {
		
		return this.formBuilder.group({
			IDASISTENCIA: lista_detallefacturaMingas.IDASISTENCIA,
			IDPLANIFICACION: lista_detallefacturaMingas.IDPLANIFICACION,
			IDMEDIDOR: lista_detallefacturaMingas.IDMEDIDOR,
			ASISTENCIA: lista_detallefacturaMingas.ASISTENCIA,
			VALORMULTA: lista_detallefacturaMingas.VALORMULTA,
			DESCRIPCION: lista_detallefacturaMingas.DESCRIPCION,
			OBSEVACION: lista_detallefacturaMingas.OBSEVACION,
			estado: lista_detallefacturaMingas.estado,
			planificacion: lista_detallefacturaMingas.planificacion,
		});
	}

	//obtener listaFacturas
	get listafacturasMingas_removidas(): FormArray {
		return this.facturasMingasForm_removidas.get('listafacturasMingas_removidas') as FormArray;
	}


	/***********************************
	*	FIN FORMULARIOS REACTIVOS
	************************************
	/*

	/***********************************
	*	METODOS API
	************************************
	/*
	* Buscar usuario por cedula
	*/
	getUserRucCi(seleccionarUsuarioModal?){
		console.log(seleccionarUsuarioModal);
		this.factura_cobro.estado = '1';
		this.factura_cobro.roles_id = 5;
		console.log(this.factura_cobro);
    	this._usersService.getUserRucCi(this.factura_cobro.rucci,
    		this.factura_cobro.roles_id,this.factura_cobro.estado).subscribe(
				res => {
		            if(res.code == 200){
		                console.log(res);
		                console.log(res.data[0]);
		                var lista_usuarios = res.data;
		                
		                if(lista_usuarios.length>0){
		                	this.message_error = null;
			                if(lista_usuarios.length>1){
			                	console.log("Tiene mayor que uno");
			                	console.log(lista_usuarios);
			                	this.temp_var_selecionarusuario=true;
			                	this.lista_usuarios_datos = lista_usuarios;
			                	this.openSelecionarModalUsers(seleccionarUsuarioModal);
			                }
			                else if(lista_usuarios.length==1){
			                	console.log("Es igual a 1 dato");
			                	console.log(lista_usuarios);
		                		this.datos_usuario = lista_usuarios[0];
			                	this.limpiarValores();
			                	this.numeromedidor_id = this.datos_usuario.medidor.NUMMEDIDOR;
			                	/*
			                	if(this.numeromedidor_id!=null||this.numeromedidor_id!=''){
									if(this.factura_cobro.nummedidor!=this.numeromedidor_id){
										this.numeromedidor_id = this.factura_cobro.nummedidor;
										this.limpiarValores();
									}
								}
								*/
			                	this.getDetallefacturaNumMedidor();
			                }
		                }
		                else{
			                this.message_error= "Cedula no encontrado";
		                	this.numeromedidor_id = null;
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
	* Obtener medidor y usuario
	*/
	getAllUserMedidorEstadoActivo(){
    	this._usersService.getAllUserMedidorEstadoActivo().subscribe(
				res => {
		            if(res.code == 200){
		                console.log(res);
		                this.usermedidor = res.data;
		                this.allusermedidor=this.usermedidor;

		                this.total_usermedidor = this.usermedidor.length;
		                console.log(this.usermedidor.length);

		                this.collectionSize = this.total_usermedidor;
		                
		                //this.usuario_medidor = res.data;
		                this.temp_var_usuario_medidor = true;
		                
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
	getIdMedidorUser(nummedidor){
    	this._medidorService.getIdMedidorUser(nummedidor).subscribe(
				res => {
		            if(res.code == 200){
		                console.log(res);
		                this.medidor = res.data;
		                if(res.data){
			                this.usuario_dato = res.data.users;
			                //dato
			                this.datos_usuario = res.data;

			                this.medidor_inactivo = ( res.data.ESTADO=='INACTIVO' ) ? true : false ;
			                console.log(this.medidor_inactivo);
		                }else{
		                	this.message_error= "Medidor no encontrado";
		                	this.datos_usuario = null;
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
	* mostrar Medidor y User por codigo
	*/
	getIdMedidorUserCodigo(codigo){
    	this._medidorService.getIdMedidorUserCodigo(codigo).subscribe(
				res => {
		            if(res.code == 200){
		                console.log(res);
		                this.medidor = res.data;
		                this.idmedidor=res.data.IDMEDIDOR;

	                	//si hay saldo
		                if(res.saldo>0){
		                	this.medidor_model=res.data;
		                	this.saldo=res.saldo;
		                	this.boton_saldo = 'mostrar';
							this.var_saldo = true;
							this.saldo_instalacion = res.saldo;
		                }
		                else{
							this.medidor_model = new Medidor(null,null,null,null,null,null,null,null,null,null,null);
		                	
		                	this.saldo=null;
		                	this.boton_saldo = 'ocultar';
							this.var_saldo = false;
							this.saldo_instalacion=0;	
		                }

		                if(res.data){
							//
	                		this.buscarMingasUsuarioId(res.data.IDMEDIDOR);
			                
			                this.usuario_dato = res.data.users;
			                //dato
			                this.datos_usuario = res.data;

			                this.medidor_inactivo = ( res.data.ESTADO=='INACTIVO' ) ? true : false ;
			                //console.log(this.medidor_inactivo);

			                Swal.fire({
							  	icon: 'info',
							  	title: 'Buscando facturas',
							  	text: this.usuario_dato.NOMBRES+' '+this.usuario_dato.APELLIDOS+' - '+this.usuario_dato.APADOSN,
							  	showConfirmButton: false,
  								timer: 2000
							});
		                }else{
		                	this.message_error= "Medidor no encontrado";
		                	this.datos_usuario = null;
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
	* Obtener lista de detallefactura pendientes por cobrar
	*/
	getDetallefacturaNumMedidor(){
		console.log(this.numeromedidor_id);
    	this._detallefacturaService.getDetallefacturaNumMedidor(this.numeromedidor_id).subscribe(
				res => {
		            if(res.code == 200){
		                console.log(res);
		                this.lista_detallefactura = res.data;
		                this.getIdMedidorUser(this.numeromedidor_id);
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
		                //buscar corte
		                this.getCorteporMedidor(this.numeromedidor_id);
						
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
	* lista de facturas pendientes por pagar, buscar por codigo
	*/
	getDetallefacturaCodigo(){
    	this._detallefacturaService.getDetallefacturaCodigo(this.codigo).subscribe(
				res => {
		            if(res.code == 200){
		                console.log(res);
		                this.lista_detallefactura = res.data;
		                this.getIdMedidorUserCodigo(this.codigo);
		                //console.log(this.lista_detallefactura);
		                //console.log(this.lista_detallefactura.length);

		                if(this.lista_detallefactura){
			                if(this.lista_detallefactura.length>0){
			                	this.restarfila = this.lista_detallefactura.length;
			                	this.temp_var = true;
			                	this.ocultar_boton="mostrar";
			                }
			                else{
			                	this.temp_var = false;
			                }
			                //console.log(this.temp_var);

			                //reactive
			                for (var i = 0; i < this.lista_detallefactura.length; ++i) {
								this.listafacturas.push(this.initiateForm(this.lista_detallefactura[i]));
			                }
			                //console.log(this.facturasForm);
							//console.log(this.listafacturas.value);

							//console.log(this.facturasForm_removidas);
							//console.log(this.listafacturas_removidas.value);
							setTimeout(()=>{
					  	    }, 2000);
							this.calcularTotal(this.lista_detallefactura);
			                this.listafactura_tamanio = this.listafacturas.controls.length;
			                this.listafactura_restar_tamanio = this.listafacturas.controls.length;
		                }
		                else{
		                	this.subtotal = 0;
							this.iva = 0;
							this.tarexcedido = 0;
							this.alcantarillado = 0;
							this.total =  0;
							this.reconexion = 0;
			                this.ocultar_boton="mostrar";
			                this.temp_var = false;
		                }
		                //buscar corte
		                this.getCorteporMedidorCodigo(this.codigo);
		                
						
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
	realizarPagoFactura(array_datos){
		console.log(array_datos);
    	this._facturasService.realizarPagoFactura(array_datos).subscribe(
				res => {
		            if(res.code == 200){
		                console.log(res);
		                //crear otrospagos
		                console.log(this.lista_corte);
		                this.numero_factura = res.facturas.NUMFACTURA;
		                //console.log(res.facturas.IDFACTURA);
		                if(this.lista_corte!=null){
		                	console.log(res.facturas.IDFACTURA);
		                	this.otrospagos.IDCORTE = this.lista_corte[0].IDCORTE;
		                	this.createOtrospagos(res.facturas.IDFACTURA, res.facturas.NUMFACTURA);
		                }else{
		                	this.verFacturaIdPDFTicket(res.facturas.NUMFACTURA);
		                }
		                //restablecer los arrays
		                this.array_totales = [];
		                this.array_datos = [];

		                this.toastrService.Success(res.message,res.title);
		                this.getDetallefacturaCodigo();
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
	* Realizar pago de mingas asambleas
	*/
	realizarPagoFacturaAsistencia(array_datos_minga){
		console.log(array_datos_minga);
    	this._pagosasistenciaService.realizarPagoFacturaAsistencia(array_datos_minga).subscribe(
				res => {
		            if(res.code == 201){
		                console.log(res);
		                //crear otrospagos
		                console.log(res.data[0].NUMFACTURA);
		                this.numero_facturaMingas = res.data[0].NUMFACTURA;

		                this.verRealizarPagoFacturaAsistenciaTicket(res.data[0].NUMFACTURA);
		                //restablecer los arrays
		                this.array_totalesMingas = [];
		                this.array_datosMinga = [];

		                this.toastrService.Success(res.message,res.title);
		                this.getIdMedidorUserCodigo(this.codigo);
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
	* Realizar pago de mingas asambleas
	*/
	realizarPagoInstalacion(){
		this.array_instalacion.push({
				medidor_model: this.medidor_model,
				USUARIOACTUAL: this.usuario_actual
			});
		console.log(this.array_instalacion);

    	this._medidorService.realizarPagoInstalacion(this.idmedidor,this.array_instalacion).subscribe(
				res => {
		            if(res.code == 201){
		                console.log(res);
		                this.limpiarInstalacion();
		                this.verFacturaInstalacionAguaTicket(res.data.IDFACTURA);
		                this.IDFACTURA_instalacion = res.data.IDFACTURA;

		                this.toastrService.Success(res.message,res.title);
						this.medidor_model = new Medidor(null,null,null,null,null,null,null,null,null,null,null);

		                this.getIdMedidorUserCodigo(this.codigo);
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
	* Obtener medidor y usuario
	*/
	getCorteporMedidor(nummedidor){
		console.log(nummedidor);
    	this._corteService.getCorteporMedidor(nummedidor).subscribe(
				res => {
		            if(res.code == 200){
		                console.log(res);
		                console.log(res.data);
		                if(res.data!=null){
		                	this.lista_corte = res.data;
		                	this.multa_corte = this.lista_corte[0].MULTA;
		                	//console.log(this.multa_corte);
		                	this.temp_var_corte = true;
		                	this.calcularTotal(this.lista_detallefactura,this.lista_corte);
		                	//console.log("Tiene multas");
		                }
		                else{
		                	this.lista_corte = null;
		                	this.multa_corte =null;
		                	this.temp_var_corte = false;
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
	* Buscar cortes por CODIGO
	*/
	getCorteporMedidorCodigo(codigo){
		//console.log(codigo);
    	this._corteService.getCorteporMedidorCodigo(codigo).subscribe(
				res => {
		            if(res.code == 200){
		                console.log(res);
		                //console.log(res.data);
		                if(res.data!=null){
		                	this.lista_corte = res.data;
		                	this.multa_corte = this.lista_corte[0].MULTA;
		                	//console.log(this.multa_corte);
		                	this.temp_var_corte = true;
		                	//this.calcularTotal(null,this.lista_corte);
  							this.calcularTotal(this.lista_detallefactura,this.lista_corte);

		                	//console.log("Tiene multas");
		                }
		                else{
		                	this.lista_corte = null;
		                	this.multa_corte =null;
		                	this.temp_var_corte = false;
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
	* Crear otros pagos, pago de corte, reconexion
	*/
	createOtrospagos(IDFACTURA, NUMFACTURA){
		this.otrospagos.USUARIOACTUAL = this.usuario_actual;
		console.log(this.otrospagos);
    	this._otrospagosService.createOtrospagos(this.otrospagos,IDFACTURA).subscribe(
				res => {
		            if(res.code == 201){
		                console.log(res);
		                this.toastrService.Success(res.message,res.title);
		                this.verFacturaIdPDFTicket(NUMFACTURA);

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
	* Crear otros pagos, pago de corte, reconexion
	*/
	buscarMingasUsuarioId(IDMEDIDOR){
		this.lista_multas= null;
    	this._asistenciaService.buscarMingasUsuarioId(IDMEDIDOR).subscribe(
				res => {
		            if(res.code == 200){
		                console.log(res);
		                if(res.data){
		                	this.lista_multas=res.data;
		                	this.temp_var_minga = true;
	                		//reactive
			                for (var i = 0; i < this.lista_multas.length; ++i) {
								//this.listafacturas.push(this.initiateForm(this.lista_detallefactura[i]));
								this.listafacturasMingas.push(this.initiateFormMingas(this.lista_multas[i]));
								//console.log(this.lista_multas[i]);
			                }
			                console.log(this.listafacturasMingas.controls.length);
			                this.listafacturaMingas_restar_tamanio = this.listafacturasMingas.controls.length;
			                this.listafacturaMingas_tamanio = this.listafacturasMingas.controls.length;

  							this.calcularTotalMingas(this.lista_multas);
			                this.ocultar_boton_minga="mostrar";

		                }
		                else{
		                	this.temp_var_minga = false;
		                }
		                console.log(this.temp_var_minga);
		                //console.log(this.lista_multas);
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

	/*opcionSeleccionBusqueda(value){
		//console.log(value);
		if(value=='medidor'){
			this.opcion_de_busqueda = value;
		}
		else if(value=='todo'){
			this.opcion_de_busqueda = value;
		}
	}*/
	/*
	key press buscar cedula
	*/
	buscarPorNumeroMedidor(){
		this.limpiarValores();
		console.log(this.factura_cobro.nummedidor);
		if(this.numeromedidor_id!=null||this.numeromedidor_id!=''){
			if(this.factura_cobro.nummedidor!=this.numeromedidor_id){
				this.numeromedidor_id = this.factura_cobro.nummedidor;
				this.limpiarValores();
			}
		}
		this.getDetallefacturaNumMedidor();
		//this._route.params.forEach((params:Params)=>{this.numeromedidor_id=params['medidor_id'];});
		//console.log(factura_cobro.control.value);
	}
	/*
	key press buscar cedula
	*/
	buscarPorCodigo(){
		document.getElementById("busqueda_por_codigo_button").setAttribute("disabled", '');
		document.getElementById("busqueda_por_codigo").setAttribute("readonly", '');
		this.limpiarValores();
		//console.log(this.factura_cobro.codigo);
			if(this.codigo!=null||this.codigo!=''){
				if(this.factura_cobro.codigo!=this.codigo){
					this.codigo = this.factura_cobro.codigo;
					this.codigo2 = this.codigo;
					this.limpiarValores();
				}
			}
		this.getDetallefacturaCodigo();
		setTimeout(()=>{
			document.getElementById("busqueda_por_codigo_button").removeAttribute("disabled");
			document.getElementById("busqueda_por_codigo").removeAttribute("readonly");
  	    }, 3000);
	}
	limpiarValores(){
		this.facturasForm  = new FormGroup({
	    	listafacturas: new FormArray([]),
		});
		this.facturasForm_removidas  = new FormGroup({
	    	listafacturas_removidas: new FormArray([]),
		});
		//mingas
		this.facturasMingasForm  = new FormGroup({
	    	listafacturasMingas: new FormArray([]),
		});
		this.facturasMingasForm_removidas  = new FormGroup({
	    	listafacturasMingas_removidas: new FormArray([]),
		});
	}
	limpiarInstalacion(){
		
    	this.saldo=0;
    	this.boton_saldo = 'ocultar';
		this.var_saldo = false;
		this.saldo_instalacion = 0;
		this.array_instalacion=[];
	}
	//seleccionar medidor de la tablamodal lista de lista_usuarios_datos
	seleccionarMedidor(us){
		this.limpiarValores();
		console.log(us);
		this.numeromedidor_id = us.medidor.NUMMEDIDOR;
		//console.log(this.numeromedidor_id);
		this.getDetallefacturaCodigo();
	}


	seleccionarUserMedidor(us){
		this.searchValue= "";
		this.collectionSize = this.total_usermedidor;
		console.log(us);
		
		this.limpiarValores();
		if(this.codigo!=us.medidor[0].CODIGO){
			//this.codigo = this.factura_cobro.codigo;
			this.codigo = us.medidor[0].CODIGO;
			this.codigo2 = this.codigo;
			this.limpiarValores();
		}
		else{
			this.codigo2 = us.medidor[0].CODIGO;
			this.codigo = us.medidor[0].CODIGO;
		}
		//console.log(us.medidor[0].CODIGO);
		//console.log(this.codigo);

		this.getDetallefacturaCodigo();
		//this.getDetallefacturaNumMedidor();
	}
	calcularTotal(lista_detallefactura,lista_corte?,lista_multas?){
		//console.log(lista_detallefactura);
		//console.log(lista_corte);


		this.subtotal = 0;
		this.iva = 0;
		this.tarexcedido = 0;
		this.alcantarillado = 0;
		this.total =  0;
		this.reconexion = 0;

		if(lista_detallefactura){
			

			lista_detallefactura.forEach((dato)=>{
				this.subtotal +=parseFloat(dato.TOTAL);
				this.iva +=parseFloat(dato.IVA);
				this.tarexcedido +=parseFloat(dato.TAREXCEDIDO);
				this.alcantarillado +=parseFloat(dato.ALCANTARRILLADO);
				this.total +=parseFloat(dato.TOTAL);

			});
		}
		//console.log(this.total);

		if(lista_corte){
			this.total += parseFloat(lista_corte[0].MULTA);
			this.reconexion = parseFloat(this.multa_corte);
			//console.log(this.total);
		}
		//console.log(this.total);
	}

	calcularTotalMingas(lista_detallefacturaMingas){
		console.log(lista_detallefacturaMingas);
		this.totalMinga =  0;

		if(lista_detallefacturaMingas){
			lista_detallefacturaMingas.forEach((dato)=>{
				this.totalMinga +=parseFloat(dato.VALORMULTA);

			});
		}
		console.log(this.totalMinga);
	}

	calcularSaldoInstalacion(event){
		this.saldo_instalacion = event.control.value;
		console.log(this.saldo_instalacion);
	}

	/**************************************
	*************** Modales****************
	***************************************
	*/
	//abrir modal seleccionar usuario de lista de medidores
	openSelecionarModalUsers(seleccionarUsuarioModal) {
		//this.instalaciones=new Instalaciones('','','','','','','','','','','',null,null,'','','');
		this.modalService.open(seleccionarUsuarioModal, {ariaLabelledBy: 'modal-basic-title',size: 'xl'}).result.then(
			(result) => {
				this.closeResult = `cerrado con: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				//console.log(reason);
		});
	}
	//modal confirmarPago factura
	openConfirmarPagoModal(confirmarPago) {
		
		this.array_totales=[{
					subtotal: this.subtotal,
					iva: this.iva,
					tarexcedido: this.tarexcedido,
					alcantarillado: this.alcantarillado,
					total: this.total,
					reconexion: this.reconexion,
					USUARIOACTUAL: this.usuario_actual
				}]; 

		this.array_datos.push({
			detallefactura: this.listafacturas.value,
			users: this.usuario_dato,
			totales: this.array_totales
		});
		console.log(this.array_totales);
		console.log(this.listafacturas.value);//lista de detallefactura
		console.log(this.listafacturas_removidas.value);//lista de detallefacturamovidas
		console.log(this.array_datos);// detallefactura, users, totales

		this.modalService.open(confirmarPago, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then(
			(result) => {
				this.closeResult = `cerrado con: ${result}`;
				//si acepta el pago se vuelve a crear las variables
				if(result=="realizarpago"){
					console.log("guardado");
					this.ocultar_boton = "ocultar";//ocultar boton crear

					this.realizarPagoFactura(this.array_datos);
					//se vuelve a crear los FormGroup
					this.facturasForm  = new FormGroup({
				    	listafacturas: new FormArray([]),
					});
					this.facturasForm_removidas  = new FormGroup({
				    	listafacturas_removidas: new FormArray([]),
					});

					//console.log(this.facturasForm);
					//console.log(this.listafacturas.value);

					//console.log(this.facturasForm_removidas);
					//console.log(this.listafacturas_removidas.value);
				}
				//presiona cancelar o salir, se vuelve a crear el array_datos[]
				else{
					this.array_datos = [];
				}
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				//Si sale del modal o preciona esc se vuelve a crear el array_datos[]
				this.array_datos = [];

		});
	}
	//modal confirmarPago facturaminga
	openConfirmarPagoModalMinga(confirmarPagoMinga) {

		this.array_totales=[{
			totalMinga: this.totalMinga,
			USUARIOACTUAL: this.usuario_actual
		}];
		
		this.array_datosMinga.push({
			USUARIOACTUAL: this.array_totales,
			asistencia: this.listafacturasMingas.value
		});
		console.log(this.array_datosMinga);

		this.modalService.open(confirmarPagoMinga, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then(
			(result) => {
				this.closeResult = `cerrado con: ${result}`;
				//si acepta el pago se vuelve a crear las variables
				if(result=="realizarpago"){
					console.log("guardado");
					this.ocultar_boton_minga = "ocultar";//ocultar boton crear

					this.realizarPagoFacturaAsistencia(this.array_datosMinga);
					//se vuelve a crear los FormGroup
					this.facturasMingasForm  = new FormGroup({
				    	listafacturasMingas: new FormArray([]),
					});
					this.facturasMingasForm_removidas  = new FormGroup({
				    	listafacturasMingas_removidas: new FormArray([]),
					});

				}
				//presiona cancelar o salir, se vuelve a crear el array_datos[]
				else{
					this.array_datosMinga = [];
				}
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				//Si sale del modal o preciona esc se vuelve a crear el array_datos[]
				this.array_datosMinga = [];

		});
	}

	//modal confirmarPago facturaminga
	openConfirmarPagoModalSaldo(confirmarPagoSaldo) {
		console.log(this.medidor_model);
		this.modalService.open(confirmarPagoSaldo, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then(
			(result) => {
				this.closeResult = `cerrado con: ${result}`;
				//si acepta el pago se vuelve a crear las variables
				if(result=="realizarpago"){
					console.log("guardado");
					this.boton_saldo = "ocultar";//ocultar boton crear
					console.log(this.medidor_model);
					this.realizarPagoInstalacion();
				}
				//presiona cancelar o salir, se vuelve a crear el array_datos[]
				else{
					this.array_datosMinga = [];
				}
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				//Si sale del modal o preciona esc se vuelve a crear el array_datos[]
				this.array_datosMinga = [];

		});
	}
	private getDismissReason(reason: any): string {
		
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return  `with: ${reason}`;
		}
	}

	//reactive form
	addItem(): void {
		
		var i=this.listafacturas_removidas.controls.length-1;
		//actualizar boton ver 
		this.listafactura_restar_tamanio++;

		this.listafacturas.push(this.initiateForm(this.listafacturas_removidas.controls[i].value));
		this.listafacturas_removidas.removeAt(i);
		console.log(this.listafacturas.value);
		//calcular total
		this.calcularTotal(this.listafacturas.value,this.lista_corte);
		
	}
	removeItem(i:number) {
		this.listafactura_restar_tamanio = i;
    	this.listafacturas_removidas.push(this.initiateForm(this.listafacturas.controls[i].value));

    	this.listafacturas.removeAt(i);
    	console.log(this.listafacturas_removidas.value);
    	this.calcularTotal(this.listafacturas.value, this.lista_corte);
  	}
  	removeMultaExceso(lista_corte){
  		console.log(lista_corte);
  		this.lista_corte = null;
  		this.calcularTotal(this.lista_detallefactura,null);
  	}
  	//mingas
  	removeIteMinga(i:number){
  		console.log(i);
  		this.listafacturaMingas_restar_tamanio = i;
    	this.listafacturasMingas_removidas.push(this.initiateFormMingas(this.listafacturasMingas.controls[i].value));
    	this.listafacturasMingas.removeAt(i);
		console.log(this.listafacturasMingas.value);

  		this.calcularTotalMingas(this.listafacturasMingas.value);
  	}
  	addItemMinga(): void {
		
		var i=this.listafacturasMingas_removidas.controls.length-1;
		//actualizar boton ver 
		this.listafacturaMingas_restar_tamanio++;

		this.listafacturasMingas.push(this.initiateFormMingas(this.listafacturasMingas_removidas.controls[i].value));
		this.listafacturasMingas_removidas.removeAt(i);
		console.log(this.listafacturasMingas.value);
		//calcular total
		this.calcularTotalMingas(this.listafacturasMingas.value);
		
	}
  	/*
  	* Abrir modal todos los usuarios
  	*/
	getAllUserMedidorEstadoModal(allUserMedidorModal) {
		this.searchValue = '';
		//this.rerender();
		this.getAllUserMedidorEstadoActivo();
		this.modalService.open(allUserMedidorModal, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then(
			(result) => {
				this.closeResult = `cerrado con: ${result}`;
				if(result=="verusuario"){
					console.log("verusuario");
				}
			},
			(reason) => {
				//this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				//console.log(reason);

		});
	}
  	/**************************************
	*************** Modales****************
	***************************************
	*/


	cargar(){
		if(this.rol_menus==1||this.rol_menus==2||this.rol_menus==3){
			this.roles_administrativos="admin";
			this.tamanioVentana();

			this.dtOptions = {
				pagingType: 'full_numbers',
				lengthMenu: [
					[ 10, 25, 50, 100, -1 ], 
					[ '10', '25', '50', '100', 'Todo' ] 
				],
				"deferRender": true,
				responsive: true,
				columnDefs: [
				{ 
					orderable: false,
					searchable: false,
					targets: -1,
					exportable: false,
						printable: false,
						visible: true
				}],
				dom: 'Bfrtip',
				buttons: [
					'pageLength',
	    			{
	                    extend: 'colvis',
	                    text: '<i class="fa fa-eye"> Visualizar</i>',
	                },
	                {
	                    extend: 'excel', title: 'Reporte de proveedores',
	                    text: '<i class="fa fa-file-excel-o"> Excel</i>',
	                    messageTop: 'Reporte de proveedores',
	                    exportOptions: {
	                    	columns: ':visible',
		                    //columns: [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
		                },
		                modifier : {
				            search : 'applied'
				        },
	                },
	                {
	                    extend: 'print',
	                    title: 'Reporte de proveedores',
	                    text: '<i class="fa  fa-print"> Imprimir</i>',
	                    messageTop: 'Reporte de proveedores',
	        			autoPrint: false,
	                    exportOptions: {
	                    	columns: ':visible',
		                    //columns: [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
		                },
		                modifier : {
				            search : 'applied'
				        },
	                },
			        {
	                    extend: 'pdfHtml5',
	                    title: 'Reporte de proveedores',
	                    text: '<i class="fa fa-file-pdf-o"> PDF</i>',
	                    messageTop: 'Reporte de proveedores',
	                    exportOptions: {
	                    	columns: ':visible',
		                    //columns: [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
		                },
		                modifier : {
				            //order : 'index', // 'current', 'applied','index', 'original'
				            //page : 'all', // 'all', 'current'
				            search : 'applied' // 'none', 'applied', 'removed'
				        },
		                orientation: 'landscape',
	                }
			    ],
				language: {
					emptyTable: "No hay datos disponibles",
					infoEmpty: "Mostrando ningún dato",
					infoFiltered: "(filtrado _MAX_ datos totales)",
					lengthMenu: " _MENU_ Registros",
					infoPostFix: "",
					search: "Buscar:",
					zeroRecords: "Sin resultados encontrados",
					paginate: {
						first: "Primero",
						last: "Último",
						next: "Siguiente",
						previous: "Anterior"
					},
					aria: {
						sortAscending: ": Activar para ordenar en orden ascendente",
						sortDescending: ": Activar para ordenar en orden descendente"
					}
				}
			};
		}
		else if(this.rol_menus==4){
			this.roles_administrativos="operador";
		}
		else{
			this.roles_administrativos="user";
		}
		//console.log(this._usersService.getRol());
		//console.log(this.roles_administrativos);

	}
	/*
    * REPORTES
    */
    //abrir reporte de pagos consumo de agua
    abrirVerReporte(url_download){
        var URL = this.url+url_download;
        let ventana=window.open(URL, this.numero_factura, 'left=50, top=50, toolbar=0, resizable=1,replace=true');
        ventana.resizeTo(this.tamanio_ventana[0]-30,this.tamanio_ventana[1]-5);
        
    }
    //abrir reporte de pagosasistencia o mingas
    abrirVerReporteMingas(url_download){
        var URL = this.url+url_download;
        let ventana=window.open(URL, this.numero_facturaMingas, 'left=50, top=50, toolbar=0, resizable=1,replace=true');
        ventana.resizeTo(this.tamanio_ventana[0]-30,this.tamanio_ventana[1]-5);
        
    }
    /*reporte factura*/
    verFacturaIdPDFTicket(factura_id){
    	this.url_reporte='verFacturaIdPDFTicket/'+factura_id;
    	console.log(this.url_reporte);
    	this.abrirVerReporte(this.url_reporte);
    }
    /*reporte Pagosasistencia*/
    verRealizarPagoFacturaAsistenciaTicket(NUMFACTURA){
    	this.url_reporte='verRealizarPagoFacturaAsistenciaTicket/'+NUMFACTURA;
    	console.log(this.url_reporte);
    	this.abrirVerReporteMingas(this.url_reporte);
    }

    /*reporte pago instalacion*/
    abrirVerReporteInstalacion(url_download){
        var URL = this.url+url_download;
        let ventana=window.open(URL, this.IDFACTURA_instalacion, 'left=50, top=50, toolbar=0, resizable=1,replace=true');
        ventana.resizeTo(this.tamanio_ventana[0]-30,this.tamanio_ventana[1]-5);
    }
    verFacturaInstalacionAguaTicket(IDFACTURA){
    	this.url_reporte='verFacturaInstalacionAguaTicket/'+IDFACTURA;
    	console.log(this.url_reporte);
    	this.abrirVerReporteInstalacion(this.url_reporte);
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


export interface FacturaCobro {
  
	nummedidor:string;
	codigo:string;
	rucci:string;
	estado:string;
	nombres:string;
	roles_id:number;
}