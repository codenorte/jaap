import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { ToastrService } from '../../../../common/service/toastr.service';
//services
import { UsersService } from '../../../../services/auth/users.service';
import { ComprasService } from '../../../../services/auth/compras.service';

import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-compras-lista',
  templateUrl: './compras-lista.component.html',
  styleUrls: ['./compras-lista.component.css']
})
export class ComprasListaComponent implements OnInit {
	
	rol_menus;
	nombre_rol;
	roles_administrativos:string="";

	dtOptions: any = {};
	lista_compras;
	Object_compras:Object = false;

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private _comprasService:ComprasService,
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
	* buscar compras
	*
	*/
	getAllCompra(){

		this._comprasService.getAllCompra().subscribe(
			response=>{
				if(response.code == 200){
					console.log(response);
					this.lista_compras = response.data;
					this.Object_compras = true;
				}
				else{
					this.toastrService.Error("Error","Error");
				}
			},
			error=>{
				console.log(<any>error.error);
				this.toastrService.Error(<any>error.error.error,"Error");

			}
			);
	}


	cargar(){
		//roles usuarios
		if(this.rol_menus==1||this.rol_menus==2||this.rol_menus==3){
			this.roles_administrativos="admin";

			this.getAllCompra();

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
		else if(this.rol_menus==4){
			this.roles_administrativos="operador";
		}
		else{
			this.roles_administrativos="user";
		}
	}


}
