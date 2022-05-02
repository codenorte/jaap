import { Component, OnInit } from '@angular/core';
//reactive form
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

import { Router,ActivatedRoute,Params } from '@angular/router';
//servicios
import { MedidorService } from '../../../../services/auth/medidor.service';
import { UsersService } from '../../../../services/auth/users.service';
import { ToastrService } from '../../../../common/service/toastr.service';
//interface 
import { Usermedidor } from '../../../interface/usermedidor';
//models
import { Users } from '../../../../model/users';
import { Medidor } from '../../../../model/medidor';

import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-traspaso-detail',
  templateUrl: './traspaso-detail.component.html',
  styleUrls: ['./traspaso-detail.component.css']
})
export class TraspasoDetailComponent implements OnInit {

	roles_administrativos:string="";
	rol_menus;
	nombre_rol;

  	medidor:Medidor;
  	users:Users;
  	//datos medidor
	datos_usuario;
	//modal boostrap
  	closeResult: string;
  	dtOptions: any = {};

  	numeromedidor_id:number=null;

	constructor(
		private modalService: NgbModal,
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private toastrService:ToastrService,
		private _medidorService:MedidorService,
		private formBuilder: FormBuilder,
		) {

		this.rol_menus = this._usersService.getRol();
      	this.nombre_rol = this._usersService.getNombreRol();
      	this.medidor = new Medidor(null,null,null,null,null,null,null,null,null,null,null);
		this.users=new Users(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		this._route.params.forEach((params:Params)=>{this.numeromedidor_id=params['medidor_id'];});
	}

	ngOnInit(): void {
	    this.cargar();
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
		                this.datos_usuario = res.data;

		            }else{
		            	console.log(res);
		            }
		        },
		        error => {
		            console.log(<any>error);
		        }
			);
	}


	cargar(){
		//roles usuarios
		if(this.rol_menus==1||this.rol_menus==2||this.rol_menus==3){
			
			this.getIdMedidorUserIdmedidor();

			this.roles_administrativos="admin";
			this.dtOptions = {
				pagingType: 'full_numbers',
				"deferRender": true,
				responsive: true,
				"bPaginate": false,
				columnDefs: [
				{ 
					orderable: false,
					searchable: false,
					targets: 5
				}],
				dom: 'Bfrtip',
				buttons: [
				{
					extend: 'colvis', title: 'Reporte',
					text: '<i class="fa fa-eye"> Visualizar</i>',
				},
				{
					extend: 'excel', title: 'Reporte',
					text: '<i class="fa fa-file-excel-o"> Excel</i>',
					messageTop: 'Reporte usuario sin lectura',
					exportOptions: {
						columns: [ 0, 1, 2 ]
					}
				},
				{
					extend: 'print', title: 'Reporte',
					text: '<i class="fa  fa-print"> Imprimir</i>',
					messageTop: 'Reporte usuario sin lectura',
					autoPrint: false,
					exportOptions: {
						columns: [ 0, 1, 2 ]
					}
				},
				{
					extend: 'pdfHtml5',
					title: 'Reporte de usuario sin lectura',
					text: '<i class="fa fa-file-pdf-o"> PDF</i>',
					messageTop: 'Reporte usuario sin lectura',
					exportOptions: {
						columns: [ 0, 1, 2 ]
					}
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
		}
		else if(this.rol_menus==4){
			this.roles_administrativos="operador";
		}
		else{
			this.roles_administrativos="user";
		}
	}

}
