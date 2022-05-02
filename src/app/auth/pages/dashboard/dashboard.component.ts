import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
//servicios
import { MedidorService } from '../../../services/auth/medidor.service';
import { UsersService } from '../../../services/auth/users.service';
import { Users } from '../../../model/users';
import { ToastrService } from '../../../common/service/toastr.service';

import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

	dtOptions: any = {};
	listausuario;
	temp_var:Object=false;

	roles_administrativos:string="";
	rol_menus;
	nombre_rol;

	total_medidores;
	medidorusers;
	temp_medidores_lista:Object=false;

	total;
	total_activos;
	total_inactivos;
	total_nuevos;
	//operador
	total_medidor;
	medidor_activos;
	medidor_inactivos;
	medidor_suspendido;

	//modal boostrap
  	closeResult: string;

	estadomensaje:string;
	users:Users;
	dato_users:Users;

	constructor(
		private modalService: NgbModal,
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private toastrService:ToastrService,
		private _medidorService:MedidorService,
		) {

		this.users=new Users('','','','',null,'','','','','','','','','','','','',null);
		this.dato_users=new Users('','','','',null,'','','','','','','','','','','','',null);

		this.rol_menus = this._usersService.getRol();
      	this.nombre_rol = this._usersService.getNombreRol();
	    
	    this.cargar();
	}

	ngOnInit(): void {
		//this.getAllUser();
	}

	/*
	* Actualizar estado users
	*/
	getMedidorIdUsers(){
		this._usersService.getUserHeader().subscribe(
			res => {
	            if(res.code == 200){
	                console.log(res);
				  	var user_id = res.data.id;
		        	this._medidorService.getMedidorIdUsers(user_id).subscribe(
						result => {
				            if(result.code == 200){
				                console.log(result);
				                //console.log(result.data.medidorusers);
				                console.log(result.data.medidorusers.length);
				                this.medidorusers = result.data.medidorusers;
				                this.total_medidores = result.data.medidorusers.length;

				                this.temp_medidores_lista = true;
				            }else{
				            	console.log(result);
				            }
				        },
				        error => {
				            console.log(<any>error);
				        }
					);
	            }else{
	            	console.log(res);
	            }
	        },
	        error => {
	            console.log(<any>error);
	        }
		);
		/*
		*/
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

		            //operador
		            this.total_medidor = response.total_medidor;
					this.medidor_activos = response.medidor_activos;
					this.medidor_inactivos = response.medidor_inactivos;
					this.medidor_suspendido = response.medidor_suspendido;
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
	//cargar usuarios en localStorage
	getAllUserMedidor(){
		this._usersService.getAllUserMedidor().subscribe(
			response=>{
				if(response.code == 200){
					console.log(response);
					localStorage.setItem('users',JSON.stringify(response.data));
				}
				else{
					console.log("Error al cargar usuarios");
					//this.toastrService.Error("Error","Error");
				}
			},
			error=>{
				console.log(<any>error.error);
				//this.toastrService.Error("Error de datos","Error");
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
					this.getAllUserMedidor();
					this.getAllUserTotales();
					this.toastrService.Success(response.message,response.title);
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
		if(this.rol_menus==1||this.rol_menus==2||this.rol_menus==3){
			this.dtOptions = {
				pagingType: 'full_numbers',
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
			this.getAllUserTotales();
			//lista usuarios
			setTimeout(()=>{
		    	this.listausuario=this._usersService.getUsuariosLocal();
		      	console.log(this.listausuario);
				if(this.listausuario.length>0){
					this.temp_var=true;
				}

	  	    }, 3000);
			this.roles_administrativos="admin";
		}
		else if(this.rol_menus==4){
			this.getAllUserTotales();
			//lista usuarios
			setTimeout(()=>{
			    this.listausuario=this._usersService.getUsuariosLocal();
			    console.log(this.listausuario);
				if(this.listausuario.length>0){
					this.temp_var=true;
				}

	  	    }, 3000);
	  	    this.dtOptions = {
				pagingType: 'full_numbers',
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
			this.roles_administrativos="operador";
		}
		else{
			this.roles_administrativos="user";
			this.getMedidorIdUsers();
		}
		console.log(this._usersService.getRol());
		console.log(this.roles_administrativos);

	}

}
