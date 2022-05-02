import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { UsersService } from '../../../../services/auth/users.service';
import { DetallefacturaService } from '../../../../services/auth/detallefactura.service';
import { ToastrService } from '../../../../common/service/toastr.service';


@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
	rol_menus;
	nombre_rol;
	roles_administrativos:string="";

	dtOptions: any = {};

	medidor_numero;
	registros_detallefactura;
	temp_detallefactura:Object=false;

	datos_usuario_medidor;

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private _detallefacturaService:DetallefacturaService,
		private toastrService:ToastrService,
		) {

		this.rol_menus = this._usersService.getRol();
      	this.nombre_rol = this._usersService.getNombreRol();
	}

	ngOnInit(): void {
		this.cargar();
  	}

  	/*
	* Obtener Historial del medidor detallefactura
	*/
	getAllDetallefacturaNumMedidor(){
		this._detallefacturaService.getAllDetallefacturaNumMedidor(this.medidor_numero).subscribe(
			res => {
				if(res.code == 200){
					console.log(res);
					this.registros_detallefactura=res.data;
					this.temp_detallefactura = true;
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
	* mostrar datos de usuario y medidor por numeromedidor
	*/
	getUserMedidorNumeromedidor(){
		this._usersService.getUserMedidorNumeromedidor(this.medidor_numero).subscribe(
			res => {
				if(res.code == 200){
					console.log(res);
					this.datos_usuario_medidor=res.data;
				}else{
					console.log(res);
				}
			},
			error => {
				console.log(<any>error);
			}
			);
	}

	//obtener parametro
	getParametro(){
		this._route.params.forEach((params:Params)=>{this.medidor_numero=params['medidor_numero'];});
	}

	cargar(){
		this.getParametro();
		//roles usuarios
		if(this.rol_menus==1||this.rol_menus==2||this.rol_menus==3){
			this.roles_administrativos="admin";
		}
		else if(this.rol_menus==4){
			this.roles_administrativos="operador";
			this.dtOptions = {
				pagingType: 'full_numbers',
				"deferRender": true,
				responsive: true,
				dom: 'Bfrtip',
				buttons: [
        			{
                        extend: 'colvis', title: 'Reporte',
                        text: '<i class="fa fa-eye"> Visualizar</i>',
                    },
                    {
                        extend: 'excel', title: 'Reporte',
                        text: '<i class="fa fa-file-excel-o"> Excel</i>',
                        messageTop: 'Reporte de consumo del usuario',
                        exportOptions: {
		                    columns: [ 1, 2, 3, 4, 5 ]
		                }
                    },
                    {
                        extend: 'print', title: 'Reporte',
                        text: '<i class="fa  fa-print"> Imprimir</i>',
                        messageTop: 'Reporte de consumo del usuario',
                        autoPrint: false,
                        exportOptions: {
		                    columns: [ 1, 2, 3, 4, 5 ]
		                }
                    },
			        {
                        extend: 'pdfHtml5',
                        title: 'Reporte',
                        text: '<i class="fa fa-file-pdf-o"> PDF</i>',
                        messageTop: 'Reporte de consumo del usuario',
                        exportOptions: {
		                    columns: [ 1, 2, 3, 4, 5 ]
		                }
                    }
			    ],
				language: {
					emptyTable: "No hay datos disponibles",
					infoEmpty: "Mostrando ningún dato",
					infoFiltered: "(filtrado _MAX_ datos totales)",
					lengthMenu: "Mostrar _MENU_ elementos",
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
			this.getAllDetallefacturaNumMedidor();
			this.getUserMedidorNumeromedidor();
			
		}
		else{
			this.roles_administrativos="user";
		}
	}

}
