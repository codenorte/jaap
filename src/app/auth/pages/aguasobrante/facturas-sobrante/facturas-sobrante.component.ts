import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';

import { ToastrService } from '../../../../common/service/toastr.service';
import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { UsersService } from '../../../../services/auth/users.service';
import { AguasobranteService } from '../../../../services/auth/aguasobrante.service';
import { DetallefacturasobranteService } from '../../../../services/auth/detallefacturasobrante.service';
import { FacturassobranteService } from '../../../../services/auth/facturassobrante.service';

import { GLOBAL } from '../../../../services/service';

//reactive form
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
//interface 
import { User } from '../../../interface/user';
//model
import { Users } from '../../../../model/users';

@Component({
  selector: 'app-facturas-sobrante',
  templateUrl: './facturas-sobrante.component.html',
  styleUrls: ['./facturas-sobrante.component.css']
})
export class FacturasSobranteComponent implements OnInit {

	public url:string=GLOBAL.url;

	roles_administrativos:string="";
	rol_menus;
	nombre_rol;
	identity;
	usuario_actual;
	//definir tamanio de la ventana
    public tamanio_ventana;
    //reporte 
	url_reporte;
	//modal boostrap
  	closeResult: string;

	users:Users;
	lista_usuarios;
	temp_var_usuario_sobrante:Object = false;
	dtOptions: any = {};

	//busqueda por pipe 
	searchValue = '';
	user:User[];
	alluser:User[];
	total_user;
	/*
	facturas
	*/
	//reactive form listafacturas
	lista_detallefactura;
  	facturasForm  = new FormGroup({
    	listafacturas: new FormArray([]),
	});
	listafactura_tamanio:number = 0;
	listafactura_restar_tamanio:number = 0;
	facturasForm_removidas  = new FormGroup({
    	listafacturas_removidas: new FormArray([]),
	});
	//control de botones
	restarfila:number=0;
	temp_var:Object=false;
	ocultar_boton : string="";

	//valores de calculo 
	subtotal: number=0;
  	iva: number=0;
  	total: number=0;
  	array_totales = [];
	array_datos = [];
	numero_factura;
	idaguasobrante;
	/*
	fin facturas
	*/

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private _aguasobranteService:AguasobranteService,
		private _detallefacturasobranteService:DetallefacturasobranteService,
		private _facturassobranteService:FacturassobranteService,
		private toastrService:ToastrService,
		private modalService: NgbModal,
		private formBuilder: FormBuilder,

		) {
		this.rol_menus = this._usersService.getRol();
		this.identity = this._usersService.getIdentity();
      	this.nombre_rol = this._usersService.getNombreRol();
	
		//console.log(this.factura_cobro);
	}
	ngOnInit(): void {
		this.cargar();

		this.usuario_actual = this.identity.NOMBRES + ' ' + this.identity.APELLIDOS;
		console.log(this.usuario_actual);
	}

	/*
	facturas
	*/
	setPreset() {
		//this.cities.patchValue(['LA', 'MTV']);
	}
	//obtener listaFacturas
	get listafacturas(): FormArray {
		return this.facturasForm.get('listafacturas') as FormArray;
	}

	initiateForm(lista_detallefactura): FormGroup {
		
		return this.formBuilder.group({
			IDDETALLEFACSOBRANTE: lista_detallefactura.IDDETALLEFACSOBRANTE,
			IDAGUASOBRANTE: lista_detallefactura.IDAGUASOBRANTE,
			ANIOMES: lista_detallefactura.ANIOMES,
			DESCRIPCION: lista_detallefactura.DESCRIPCION,
			IVA: lista_detallefactura.IVA,
			OBSERVACION: lista_detallefactura.OBSERVACION,
			DETALLE: lista_detallefactura.DETALLE,
			SUBTOTAL: lista_detallefactura.SUBTOTAL,
			TOTAL: lista_detallefactura.TOTAL,
			estado: lista_detallefactura.estado
		});
	}

	//obtener listaFacturas
	get listafacturas_removidas(): FormArray {
		return this.facturasForm_removidas.get('listafacturas_removidas') as FormArray;
	}

	limpiarValores(){
		this.subtotal = 0;
		this.iva = 0;
		this.total =  0;

		this.facturasForm  = new FormGroup({
	    	listafacturas: new FormArray([]),
		});
		this.facturasForm_removidas  = new FormGroup({
	    	listafacturas_removidas: new FormArray([]),
		});
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
		this.calcularTotal(this.listafacturas.value);
		
	}
	removeItem(i:number) {
		this.listafactura_restar_tamanio = i;
    	this.listafacturas_removidas.push(this.initiateForm(this.listafacturas.controls[i].value));

    	this.listafacturas.removeAt(i);
    	console.log(this.listafacturas_removidas.value);
    	this.calcularTotal(this.listafacturas.value);
  	}

	/*
	fin facturas
	*/

	/*
	* Obtener medidor y usuario
	*/
	getAllUserAguasobrante(){
    	this._aguasobranteService.getAllUserAguasobrante().subscribe(
				res => {
		            if(res.code == 200){
		                console.log(res);
		                this.lista_usuarios = res.data;
		                this.temp_var_usuario_sobrante = true;

	                	this.alluser=this.lista_usuarios;
		                this.total_user = this.lista_usuarios.length;

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
	* Obtener lista de facturas detallesobrante
	*/
	getDetallefacturasobrante(){
    	this._detallefacturasobranteService.getDetallefacturasobrante(this.idaguasobrante).subscribe(
				res => {
		            if(res.code == 200){
		                console.log(res);
		                this.lista_detallefactura= res.data;
		                if(this.lista_detallefactura){
		                	//hay facturas
		                	if(this.lista_detallefactura.length>0){
		                		this.restarfila = this.lista_detallefactura.length;
			                	this.temp_var = true;
			                	this.ocultar_boton="mostrar";
		                	}

		                	//reactive
			                for (var i = 0; i < this.lista_detallefactura.length; ++i) {
								this.listafacturas.push(this.initiateForm(this.lista_detallefactura[i]));
			                }
			                this.calcularTotal(this.lista_detallefactura);
			                this.listafactura_tamanio = this.listafacturas.controls.length;
			                this.listafactura_restar_tamanio = this.listafacturas.controls.length;
		                }
	                	else{
	                		this.temp_var = false;
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
	realizarPagoFactura(array_datos){
		console.log(array_datos);
    	this._facturassobranteService.realizarPagoFacturaSobrante(array_datos).subscribe(
				res => {
		            if(res.code == 200){
		                console.log(res);
		                //crear otrospagos
		                this.numero_factura = res.facturassobrante.NUMFACTURA;
		                console.log(this.numero_factura);
		                
		                this.verFacturaSobranteTicket(res.facturassobrante.IDFACTURASOBRANTE);
		                //restablecer los arrays
		                this.array_totales = [];
		                this.array_datos = [];

		                this.toastrService.Success(res.message,res.title);
		                this.getDetallefacturasobrante();
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

	/**************************************
	*************** Modales****************
	***************************************
	*/


	/*
  	* Abrir modal todos los usuarios
  	*/
	getuseraguasobranteModal(allUserAguasobrante) {
		this.searchValue = '';
		//this.rerender();
		this.modalService.open(allUserAguasobrante, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then(
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

	private getDismissReason(reason: any): string {
		
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return  `with: ${reason}`;
		}
	}

	//modal confirmarPago factura
	openConfirmarPagoModal(confirmarPago) {
		
		this.array_totales=[{
					subtotal: this.subtotal,
					iva: this.iva,
					total: this.total,
					USUARIOACTUAL: this.usuario_actual
				}]; 

		this.array_datos.push({
			detallefacturasobrante: this.listafacturas.value,
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

	/**************************************
	*************** Modales****************
	***************************************
	*/


	/**************************************
	*************** Metodos locales *******
	***************************************
	*/

	eventoBuscar(value: string):void{
		//console.log(value);
	    this.user = this.alluser.filter(
	    	(user) => 
			user.RUCCI.toLowerCase().includes(value.toLowerCase()) ||
			user.NOMBRES.toLowerCase().includes(value.toLowerCase()) ||
			user.APELLIDOS.toLowerCase().includes(value.toLowerCase()) ||
			user.APADOSN.toLowerCase().includes(value.toLowerCase()) ||
			user.SECTOR.toLowerCase().includes(value.toLowerCase())

	    	);
	}
	seleccionarUser(us){
		this.searchValue= "";
		this.users = us;
		console.log(this.users);
		this.idaguasobrante=us.aguasobrante[0].IDAGUASOBRANTE;
		//console.log(us.aguaganaderia);
		this.limpiarValores();
		this.getDetallefacturasobrante();
	}

	/**************************************
	*************** fin Metodos locales ***
	***************************************
	*/

	calcularTotal(lista_detallefactura){
		//console.log(lista_detallefactura);
		//console.log(lista_corte);


		this.subtotal = 0;
		this.iva = 0;
		this.total =  0;

		if(lista_detallefactura){
			lista_detallefactura.forEach((dato)=>{
				this.subtotal +=parseFloat(dato.SUBTOTAL);
				this.iva +=parseFloat(dato.IVA);
				this.total +=parseFloat(dato.TOTAL);

			});
		}
		console.log(this.subtotal);
		console.log(this.total);
	}


	cargar(){
		if(this.rol_menus==1||this.rol_menus==2||this.rol_menus==3){
			this.roles_administrativos="admin";
			this.tamanioVentana();
			this.getAllUserAguasobrante();
			

			this.dtOptions = {
				pagingType: 'full_numbers',
				"bPaginate": false,
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
		console.log(this._usersService.getRol());
		console.log(this.roles_administrativos);

	}
	/*
    * REPORTES
    */
    abrirVerReporte(url_download){
        var URL = this.url+url_download;
        let ventana=window.open(URL, this.numero_factura, 'left=50, top=50, toolbar=0, resizable=1');
        ventana.resizeTo(this.tamanio_ventana[0]-30,this.tamanio_ventana[1]-5);
    }
    /*reporta factura*/
    verFacturaSobranteTicket(factura_id){
    	this.url_reporte='verFacturaSobranteTicket/'+factura_id;
    	console.log(this.url_reporte);
    	this.abrirVerReporte(this.url_reporte);
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
