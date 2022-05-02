import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { UsersService } from '../../../../services/auth/users.service';
import { ProveedoresService } from '../../../../services/auth/proveedores.service';

import { ToastrService } from '../../../../common/service/toastr.service';
import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

//modelo
import { Proveedor } from '../../../../model/proveedor';

@Component({
  selector: 'app-proveedores-lista',
  templateUrl: './proveedores-lista.component.html',
  styleUrls: ['./proveedores-lista.component.css']
})
export class ProveedoresListaComponent implements OnInit {

	roles_administrativos:string="";
	rol_menus;
	nombre_rol;

  	dtOptions: any = {};
	temp_var:Object=false;

	lista_proveedores;

  	closeResult: string;
  	//crear proveedores
  	proveedor : Proveedor;
  	total;
	total_activos;
	total_inactivos;

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private _proveedoresService:ProveedoresService,
		private toastrService:ToastrService,
		private modalService: NgbModal
		) {
		this.rol_menus = this._usersService.getRol();
      	this.nombre_rol = this._usersService.getNombreRol();
      	this.proveedor = new Proveedor(null,null,null,null,null,null,null,null,null,null);
	}

	ngOnInit(): void {
		this.cargar();
	}

	/*
	* Actualizar estado users
	*/
	getAllProveedor(){


		this._proveedoresService.getAllProveedor().subscribe(
			res => {
				if(res.code == 200){
					console.log(res);
					this.lista_proveedores = res.data;
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
	* obtener los totales 
	*/
	getTotalProveedores(){
		this._proveedoresService.getTotalProveedores().subscribe(
			res => {
				if(res.code == 200){
					console.log(res);

					this.total = res.total;
					this.total_activos = res.total_activos;
					this.total_inactivos = res.total_inactivos;

				}else{
					console.log(res);
				}
			},
			error => {
				console.log(<any>error);
			}
			);
	}


	/**************************************
	*************** Modales****************
	***************************************
	*/
	openAddProveedorModal(addProveedor) {
		
		this.modalService.open(addProveedor, {ariaLabelledBy: 'modal-basic-title'}).result.then(
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

	/*otros validaciones*/
	convertirMayuscula(str) {
		console.log(str);
		var dato =str.control.value;
	  	dato.toUpperCase();
	  	
	  	if(str.name=='NOMBRES'){
	  		this.proveedor.nombres = dato.toUpperCase();
	  		console.log(dato);
	  		console.log(this.proveedor.nombres);
	  	}
	  	if(str.name=='APELLIDOS'){
	  		this.proveedor.apellidos = dato.toUpperCase();
	  	}
	}
	validateEmail(email) {
	    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    console.log(re);
	    console.log(re.test(String(email)));
	    return re.test(String(email).toLowerCase());
	}


	cargar(){
		if(this.rol_menus==1||this.rol_menus==2||this.rol_menus==3){
			this.roles_administrativos="admin";
			this.getAllProveedor();
			this.getTotalProveedores();

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
		console.log(this._usersService.getRol());
		console.log(this.roles_administrativos);

	}

}
