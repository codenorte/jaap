import { Component, OnInit } from '@angular/core';

import { Router,ActivatedRoute,Params } from '@angular/router';
//servicios
import { MedidorService } from '../../../../services/auth/medidor.service';
import { UsersService } from '../../../../services/auth/users.service';
import { ToastrService } from '../../../../common/service/toastr.service';
//interface 
import { Usermedidor } from '../../../interface/usermedidor';
//model
import { Medidor } from '../../../../model/medidor';
import { Users } from '../../../../model/users';

import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-medidor-add-existente',
  templateUrl: './medidor-add-existente.component.html',
  styleUrls: ['./medidor-add-existente.component.css']
})
export class MedidorAddExistenteComponent implements OnInit {


	roles_administrativos:string="";
	rol_menus;
	nombre_rol;

  	medidor:Medidor;
	users:Users;
	//modal boostrap
  	closeResult: string;
  	dtOptions: any = {};

  	sinmedidor;
	temp_var:Object=false;

	codigos_disponibles;
	usermedidor:Usermedidor[];
	sector;

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
		this.users=new Users(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
	}

	ngOnInit(): void {
	    this.cargar();
	}


	/*
	* lista de medidores
	*/
	getUserMedidorRetirado(){
		this._usersService.getUserMedidorRetirado().subscribe(
			response=>{
				if(response.code == 200){
					console.log(response);
					this.sinmedidor = response.data;
					this.temp_var=true;

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
	* Obtener codigo de medidor disponibles
	*/
	getCodigoMedidorDisponible(){
		this._medidorService.getCodigoMedidorDisponible().subscribe(
			response=>{
				if(response.code == 200){
					console.log(response);
					this.codigos_disponibles = response.data;
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

	openAsignarCodigoMedidorModal(asignarCodigoMedidor,medidor) {
		this.usermedidor = medidor;
		console.log(medidor);
		console.log(this.usermedidor);
		this.modalService.open(asignarCodigoMedidor, {ariaLabelledBy: 'modal-basic-title'}).result.then(
			(result) => {
				this.closeResult = `cerrado con: ${result}`;
				if(result=="guardar"){
					console.log("guardado");
					console.log(this.users);
					console.log(this.medidor);
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


	cargar(){
		//roles usuarios
		this.sector = [
		      	{id: 1, name: "Capillapamba"},
		      	{id: 2, name: "Coragaloma"},
		      	{id: 3, name: "Pilchibuela"},
		      	{id: 4, name: "Tocagon Alto"}
		   	];
		if(this.rol_menus==1||this.rol_menus==2||this.rol_menus==3){
			this.roles_administrativos="admin";
			this.getUserMedidorRetirado();
			this.getCodigoMedidorDisponible();
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
