import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { UsersService } from '../../../../services/auth/users.service';
import { Users } from '../../../../model/users';
import { ToastrService } from '../../../../common/service/toastr.service';

import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
//datatable
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-usuarios-lista',
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['./usuarios-lista.component.css']
})
export class UsuariosListaComponent implements OnDestroy, OnInit {

	listausuario;
	
	rol_menus;
	nombre_rol;
	roles_administrativos:string="";

	users:Users;
	dato_users:Users;

	total;
	total_activos;
	total_inactivos;
	total_nuevos;
	//modal boostrap
  	closeResult: string;

  	estadomensaje:string;
  	//pagination
  	page=0;
  	valor=0;

  	//option datatable
  	dtOptions_user: any = {};
	dtOptions: any = {};
	temp_var:Object=false;

	dtTrigger: Subject<any> = new Subject();
	@ViewChild(DataTableDirective) dtElement: DataTableDirective;

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private toastrService:ToastrService,
		private modalService: NgbModal,
		private chRef : ChangeDetectorRef
		) {
		this.users=new Users('','','','',null,'','','','','','','','','','','','',null);
		this.dato_users=new Users('','','','',null,'','','','','','','','','','','','',null);
		this.rol_menus = this._usersService.getRol();
      	this.nombre_rol = this._usersService.getNombreRol();

	}

	ngOnInit(): void {
		//this.getAllUserMedidor();
		this.getAllUserTotales();

		//this.getAllUserPaginar();
	    this.cargar();
	}
	

	getAllUserPaginar(page?){
		this._usersService.getAllUserPaginar(page).subscribe(
			response=>{
				if(response.code == 200){
					console.log(response);
					this.valor=response.last_page;
					this.listausuario=response.data;
					this.temp_var=true;

					this.chRef.detectChanges();
					//Actualizar dt
					this.dtTrigger.next();
				}
				else{
					this.toastrService.Error("Error","Error");
				}
			},
			error=>{
				console.log(<any>error.error);
				this.toastrService.Error("Error de datos","Error");

			}
			,
			()=>console.log('Terminado getAllUserPaginar')
			);
	}
	siguiente(pagesuma){
		
		this.page+=pagesuma;

		console.log(this.page);
		console.log(pagesuma);
		console.log(this.valor);

		//var salida="page"+this.page;
		this.getAllUserPaginar(this.page);
	}

	getAllUserTotales(){
		//totales
		this._usersService.getAllUserTotales().subscribe(
			response=>{
				if(response.code == 200){
					console.log(response);

					this.total=response.total;
		            this.total_activos=response.total_activos;
		            this.total_inactivos=response.total_inactivos;
		            this.total_nuevos=response.total_nuevos;
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
	* Actualizar estado users
	*/
	actualizarEstadoUsuario(users,estado){
		this.users.ESTADO=estado;
		this.users.VISTO='1';
		var user_id= users.id;
		console.log(users);
		this._usersService.actualizarEstadoUsuario(user_id,users).subscribe(
			response=>{
				if(response.code == 200){
					console.log(response);
					//this.getAllUserMedidor();
					console.log(this.dtElement);
					console.log(this.dtElement.dtInstance);
					this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
						//elimina dt
				      	dtInstance.destroy();
						this.getAllUserPaginar();
						this.toastrService.Success(response.message,response.title);
						//this.rerender();
				    });
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
	/**************************************
	*************** Modales****************
	***************************************
	*/
	//modal crear cliente
	openEstadoClienteModal(editarEstadoCliente,users,estado) {
		//this.instalaciones=new Instalaciones('','','','','','','','','','','',null,null,'','','');
		console.log(users);
		console.log(estado);
		if(estado==1){
			this.estadomensaje="Desea activar el usuario?";
		}else{
			this.estadomensaje="Desea inactivar el usuario?";
		}
		this.users=users;
		this.modalService.open(editarEstadoCliente, {ariaLabelledBy: 'modal-basic-title'}).result.then(
			(result) => {
				this.closeResult = `cerrado con: ${result}`;
				if(result=="guardarestado"){
					console.log("guardado");
					//this.createInstalaciones();
					this.actualizarEstadoUsuario(users,estado);
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
		//roles usuarios
		if(this.rol_menus==1||this.rol_menus==2||this.rol_menus==3){
			this.roles_administrativos="admin";


			this.dtOptions_user = {
		      	pagingType: 'full_numbers'
		    };


			this.getAllUserPaginar();

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
				language: 
				{
				    "processing": "Procesando...",
				    "lengthMenu": "Mostrar _MENU_ registros",
				    "zeroRecords": "No se encontraron resultados",
				    "emptyTable": "Ningún dato disponible en esta tabla",
				    "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
				    "infoFiltered": "(filtrado de un total de _MAX_ registros)",
				    "search": "Buscar:",
				    "loadingRecords": "Cargando...",
				    "paginate": {
				        "first": "Primero",
				        "last": "Último",
				        "next": "Siguiente",
				        "previous": "Anterior"
				    },
				    "aria": {
				        "sortAscending": ": Activar para ordenar la columna de manera ascendente",
				        "sortDescending": ": Activar para ordenar la columna de manera descendente"
				    },
				    "buttons": {
				        "copy": "Copiar",
				        "colvis": "Visibilidad",
				        "collection": "Colección",
				        "colvisRestore": "Restaurar visibilidad",
				        "copyKeys": "Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br \/> <br \/> Para cancelar, haga clic en este mensaje o presione escape.",
				        "copySuccess": {
				            "1": "Copiada 1 fila al portapapeles",
				            "_": "Copiadas %d fila al portapapeles"
				        },
				        "copyTitle": "Copiar al portapapeles",
				        "csv": "CSV",
				        "excel": "Excel",
				        "pageLength": {
				            "-1": "Mostrar todas las filas",
				            "1": "Mostrar 1 fila",
				            "_": "Mostrar %d filas"
				        },
				        "pdf": "PDF",
				        "print": "Imprimir"
				    },
				    "decimal": ",",
				    "thousands": ".",
				    "info": "Mostrando de _START_ a _END_ de _TOTAL_ entradas"
				}

				/*{
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
				}*/
			};
		}
		else if(this.rol_menus==4){
			this.roles_administrativos="operador";

			this.getAllUserPaginar();

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
				language: 
				{
				    "processing": "Procesando...",
				    "lengthMenu": "Mostrar _MENU_ registros",
				    "zeroRecords": "No se encontraron resultados",
				    "emptyTable": "Ningún dato disponible en esta tabla",
				    "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
				    "infoFiltered": "(filtrado de un total de _MAX_ registros)",
				    "search": "Buscar:",
				    "loadingRecords": "Cargando...",
				    "paginate": {
				        "first": "Primero",
				        "last": "Último",
				        "next": "Siguiente",
				        "previous": "Anterior"
				    },
				    "aria": {
				        "sortAscending": ": Activar para ordenar la columna de manera ascendente",
				        "sortDescending": ": Activar para ordenar la columna de manera descendente"
				    },
				    "buttons": {
				        "copy": "Copiar",
				        "colvis": "Visibilidad",
				        "collection": "Colección",
				        "colvisRestore": "Restaurar visibilidad",
				        "copyKeys": "Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br \/> <br \/> Para cancelar, haga clic en este mensaje o presione escape.",
				        "copySuccess": {
				            "1": "Copiada 1 fila al portapapeles",
				            "_": "Copiadas %d fila al portapapeles"
				        },
				        "copyTitle": "Copiar al portapapeles",
				        "csv": "CSV",
				        "excel": "Excel",
				        "pageLength": {
				            "-1": "Mostrar todas las filas",
				            "1": "Mostrar 1 fila",
				            "_": "Mostrar %d filas"
				        },
				        "pdf": "PDF",
				        "print": "Imprimir"
				    },
				    "decimal": ",",
				    "thousands": ".",
				    "info": "Mostrando de _START_ a _END_ de _TOTAL_ entradas"
				}
			};
		}
		else{
			this.roles_administrativos="user";
		}

      	//cargar lista de usuarios
      	/*
      	setTimeout(()=>{
	      	this.listausuario=this._usersService.getUsuariosLocal();
	      	console.log(this.listausuario);
			if(this.listausuario.length>0){
				this.temp_var=true;
			}

  	    }, 1000);
  	    */

	}

	ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
		this.dtTrigger.unsubscribe();
	}

}
