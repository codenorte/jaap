import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
//servicios
import { MedidorService } from '../../../../services/auth/medidor.service';
import { UsersService } from '../../../../services/auth/users.service';
import { Medidor } from '../../../../model/medidor';
import { ToastrService } from '../../../../common/service/toastr.service';

import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

//interface 
//import { Usermedidor } from '../../../interface/usermedidor';
import { Medidorusers } from '../../../interface/medidorusers';

@Component({
  selector: 'app-medidor-lista',
  templateUrl: './medidor-lista.component.html',
  styleUrls: ['./medidor-lista.component.css']
})
export class MedidorListaComponent implements OnInit {
	roles_administrativos:string="";
	rol_menus;
	nombre_rol;

	dtOptions: any = {};
	listausuario;
	temp_var:Object=false;

	total;
	total_activos;
	total_inactivos;
	total_nuevos;
	//operador
	total_medidor;
	medidor_activos;
	medidor_inactivos;
	medidor_suspendido;
	medidor_retirado;
	lista_medidor;

	dato_users;
	medidor: Medidor;
	
	seleccionar_opcion;
	opcion_de_select:string='';

	//modal boostrap
  	closeResult: string;

  	//busqueda por pipe 
	searchValue = '';
	usermedidor:Medidorusers[];
	allusermedidor:Medidorusers[];
	//paginacion
	public page=1;
	public pageSize = 10;
	collectionSize: number;

	constructor(
		private modalService: NgbModal,
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private toastrService:ToastrService,
		private _medidorService:MedidorService,
		) {

		this.rol_menus = this._usersService.getRol();
      	this.nombre_rol = this._usersService.getNombreRol();
      	this.medidor = new Medidor(null,null,null,null,null,null,null,null,null,null,null);
	    
	    this.cargar();
	}

	ngOnInit(): void {
	}

	eventoBuscar(value: string):void{
		//console.log(value);
		//console.log(this.usermedidor);
		//console.log(this.allusermedidor);
	    this.usermedidor = this.allusermedidor.filter(
	    	(usermedidor) => 
	    	//val.NOMBRES.toLowerCase().includes(value)
	    	usermedidor.users.RUCCI.toLowerCase().includes(value.toLowerCase()) ||
			usermedidor.users.NOMBRES.toLowerCase().includes(value.toLowerCase()) ||
			usermedidor.users.APELLIDOS.toLowerCase().includes(value.toLowerCase()) ||
			usermedidor.users.APADOSN.toLowerCase().includes(value.toLowerCase()) ||
			usermedidor.users.SECTOR.toLowerCase().includes(value.toLowerCase()) 
	    	);
    	this.collectionSize = this.usermedidor.length;
    	//console.log(this.usermedidor);
    	//console.log(this.collectionSize);
	}

	getAllUserTotales(){
		this._usersService.getAllUserTotales().subscribe(
			response=>{
				if(response.code == 200){
					console.log(response);

					//admin
					this.total=response.total;
					this.total_activos=response.total_activos;
					this.total_inactivos=response.total_inactivos;
					this.total_nuevos=response.total_nuevos;

					//operador
					this.total_medidor = response.total_medidor;
					this.medidor_activos = response.medidor_activos;
					this.medidor_inactivos = response.medidor_inactivos;
					this.medidor_suspendido = response.medidor_suspendido;
					this.medidor_retirado = response.medidor_retirado;

				}
				else{
					this.toastrService.Error("Error","Error");
				}
			},
			error=>{
				console.log(<any>error.error);
				this.toastrService.Error("Error de datos","Error");

			}
			);
	}
	/*
	* lista de medidores
	*/
	getAllMedidorUser(){
		this._medidorService.getAllMedidorUser().subscribe(
			response=>{
				if(response.code == 200){
					console.log(response);
					this.lista_medidor = response.data;
					this.temp_var=true;

					console.log(response);
	                this.usermedidor = response.data;
	                this.allusermedidor=this.usermedidor;
	                this.collectionSize =  response.data.length;
				}
				else{
					this.toastrService.Error("Error","Error");
				}
			},
			error=>{
				console.log(<any>error.error);
				this.toastrService.Error("Error de datos","Error");

			}
			);
	}
	/*
	* actualizar estado del medidor
	*/
	editMedidorEstado(){
		this.medidor.ESTADO = this.opcion_de_select;
		this._medidorService.editMedidorEstado(this.medidor.IDUSUARIO,this.medidor).subscribe(
			response=>{
				if(response.code == 200){
					console.log(response);
					this.getAllMedidorUser();
					this.getAllUserTotales();
					this.toastrService.Success(response.message,response.title);
      				this.medidor = new Medidor(null,null,null,null,null,null,null,null,null,null,null);
      				this.opcion_de_select='';

					/*
					this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
						//elimina dt
				      	dtInstance.destroy();
				    });
				    */
				}
				else{
					this.toastrService.Error("Error","Error");
				}
			},
			error=>{
				console.log(<any>error.error);
				this.toastrService.Error("Error de datos","Error");

			}
			);
	}

	/***********************************
	*	METODOS LOCALES
	************************************
	*/

	opcionSeleccionBusqueda(value){
		this.opcion_de_select =null;
		if(value=='ACTIVO'){
			this.opcion_de_select = value;
		}
		else if(value=='INACTIVO'){
			this.opcion_de_select = value;
		}
		else if(value=='SUSPENDIDO'){
			this.opcion_de_select = value;
		}
		else if(value=='RETIRADO'){
			this.opcion_de_select = value;
		}
		console.log(this.opcion_de_select);
	}

	/**************************************
	*************** Modales****************
	***************************************
	*/

	openEditarEstadoMedidorModal(editarEstadoMedidor, users) {
		this.medidor = users;
		if(this.medidor.ESTADO =='ACTIVO'){
			this.seleccionar_opcion =[
				{ id:2, name:'INACTIVO' ,text:'INACTIVO' },
				{ id:3, name:'SUSPENDIDO' ,text:'SUSPENDIDO' },
				{ id:4, name:'RETIRADO' ,text:'RETIRADO' },
			];
		}
		if(this.medidor.ESTADO =='INACTIVO'){
			this.seleccionar_opcion =[
				{ id:1, name:'ACTIVO' ,text:'ACTIVO' },
				{ id:3, name:'SUSPENDIDO' ,text:'SUSPENDIDO' },
				{ id:4, name:'RETIRADO' ,text:'RETIRADO' },
			];
		}
		if(this.medidor.ESTADO =='SUSPENDIDO'){
			this.seleccionar_opcion =[
				{ id:1, name:'ACTIVO' ,text:'ACTIVO' },
				{ id:2, name:'INACTIVO' ,text:'INACTIVO' },
				{ id:4, name:'RETIRADO' ,text:'RETIRADO' },
			];
		}
		if(this.medidor.ESTADO =='RETIRADO'){
			this.seleccionar_opcion =[
				{ id:1, name:'ACTIVO' ,text:'ACTIVO' },
				{ id:2, name:'INACTIVO' ,text:'INACTIVO' },
				{ id:3, name:'SUSPENDIDO' ,text:'SUSPENDIDO' },
			];
		}
		console.log(users);
		this.modalService.open(editarEstadoMedidor, {ariaLabelledBy: 'modal-basic-title'}).result.then(
			(result) => {
				this.closeResult = `cerrado con: ${result}`;
				if(result=="guardarestado"){
					console.log("guardado");
					this.editMedidorEstado();
				}
			},
			(reason) => {
				//this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				//console.log(reason);
		});
	}

	openVerModalUsers(verCliente, users) {
		//this.instalaciones=new Instalaciones('','','','','','','','','','','',null,null,'','','');
		this.dato_users=users;
		console.log(this.dato_users);
		this.modalService.open(verCliente, {ariaLabelledBy: 'modal-basic-title'}).result.then(
			(result) => {
				this.closeResult = `cerrado con: ${result}`;
			},
			(reason) => {
				//this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				//console.log(reason);
		});
	}

	openModalConfirmarRetiro(confirmarRetiro){
		
		this.modalService.open(confirmarRetiro, {ariaLabelledBy: 'modal-basic-title'}).result.then(
			(result) => {
				this.closeResult = `cerrado con: ${result}`;
				if(result=="guardarestado"){
					console.log("guardado");
					console.log(this.medidor);
					this.editMedidorEstado();
				}
			},
			(reason) => {
				//this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				//console.log(reason);
		});
	}



	cargar(){
		if(this.rol_menus==1||this.rol_menus==2||this.rol_menus==3){
			this.getAllUserTotales();
			this.getAllMedidorUser();
			//lista usuarios
	  	    this.dtOptions = {
				pagingType: 'full_numbers',
				"bPaginate": false,
				"searching": false,
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
        			{
                        extend: 'colvis',
                        text: '<i class="fa fa-eye"> Visualizar</i>',
                    },
                    {
                        extend: 'excel', title: 'Reporte de usuarios',
                        text: '<i class="fa fa-file-excel-o"> Excel</i>',
                        messageTop: 'Reporte de usuarios y medidores',
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
                        title: 'Reporte de usuarios',
                        text: '<i class="fa  fa-print"> Imprimir</i>',
                        messageTop: 'Reporte de usuarios y medidores',
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
                        title: 'Reporte de usuarios',
                        text: '<i class="fa fa-file-pdf-o"> PDF</i>',
                        messageTop: 'Reporte de usuarios y medidores',
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
                    },
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
			//lista usuarios
			/*
			setTimeout(()=>{
		    	this.listausuario=this._usersService.getUsuariosLocal();
		      	console.log(this.listausuario);
				if(this.listausuario.length>0){
					this.temp_var=true;
				}

	  	    }, 3000);
	  	    */
			this.roles_administrativos="admin";
		}
		else if(this.rol_menus==4){
			this.roles_administrativos="operador";
			this.getAllUserTotales();
			this.getAllMedidorUser();
			//lista usuarios
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
                        extend: 'excel', title: 'Reporte de usuarios',
                        text: '<i class="fa fa-file-excel-o"> Excel</i>',
                        messageTop: 'Reporte de usuarios y medidores',
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
                        title: 'Reporte de usuarios',
                        text: '<i class="fa  fa-print"> Imprimir</i>',
                        messageTop: 'Reporte de usuarios y medidores',
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
                        title: 'Reporte de usuarios',
                        text: '<i class="fa fa-file-pdf-o"> PDF</i>',
                        messageTop: 'Reporte de usuarios y medidores',
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
                    },
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
		else{
			this.roles_administrativos="user";
		}
		console.log(this._usersService.getRol());
		console.log(this.roles_administrativos);

	}

}
