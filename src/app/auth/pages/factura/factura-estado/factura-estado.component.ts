import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { UsersService } from '../../../../services/auth/users.service';
import { DetallefacturaService } from '../../../../services/auth/detallefactura.service';
import { CorteService } from '../../../../services/auth/corte.service';

import { ToastrService } from '../../../../common/service/toastr.service';

import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
//datatable
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-factura-estado',
  templateUrl: './factura-estado.component.html',
  styleUrls: ['./factura-estado.component.css']
})
export class FacturaEstadoComponent implements OnDestroy,OnInit {

	rol_menus;
	nombre_rol;
	roles_administrativos:string="";
	//option datatable
  	dtOptions_user: any = {};
	dtOptions: any = {};
	temp_var:Object=false;

	dtTrigger: Subject<any> = new Subject();
	@ViewChild(DataTableDirective) dtElement: DataTableDirective;

	lista_facturaporcobrar;

	//corte
	lista_corte_user;
	temp_var_corte;
	
	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private _detallefacturaService:DetallefacturaService,
		private _corteService:CorteService,
		private toastrService:ToastrService,
		private modalService: NgbModal,
		private chRef : ChangeDetectorRef
	){
		this.rol_menus = this._usersService.getRol();
      	this.nombre_rol = this._usersService.getNombreRol();
	}

	/*
	* Obtener lista de usuarios con la suma de meses que debe
	*/
	getCountDetallefacturaPorCobrar(){
    	this._detallefacturaService.getCountDetallefacturaPorCobrar().subscribe(
				res => {
		            if(res.code == 200){
		                console.log(res);
		                this.lista_facturaporcobrar = res.data;
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
	* Obtener lista de usuarios con la suma de meses que debe
	*/
	getAllCorteUser(){
    	this._corteService.getAllCorteUser().subscribe(
				res => {
		            if(res.code == 200){
		                console.log(res);
		                this.lista_corte_user = res.data;
		                this.temp_var_corte=true;

		            }else{
		            	console.log(res);
		            }
		        },
		        error => {
		            console.log(<any>error);
		        }
			);
	}

	ngOnInit(): void {
		this.cargar();
	}

	cargar(){
		//roles usuarios
		if(this.rol_menus==1||this.rol_menus==2||this.rol_menus==3){
			this.roles_administrativos="admin";

			this.getCountDetallefacturaPorCobrar();
			this.getAllCorteUser();

			this.cargarTablaTemplate();
			
		}
		else if(this.rol_menus==4){
			this.roles_administrativos="operador";
		}
		else{
			this.roles_administrativos="user";
		}
	}

	cargarTablaTemplate(){
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

	ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
		this.dtTrigger.unsubscribe();
	}

}
