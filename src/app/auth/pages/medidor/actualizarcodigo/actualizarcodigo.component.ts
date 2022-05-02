import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
//servicios
import { MedidorService } from '../../../../services/auth/medidor.service';
import { UsersService } from '../../../../services/auth/users.service';
import { Medidor } from '../../../../model/medidor';
import { ToastrService } from '../../../../common/service/toastr.service';

import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

//datatable
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-actualizarcodigo',
  templateUrl: './actualizarcodigo.component.html',
  styleUrls: ['./actualizarcodigo.component.css']
})
export class ActualizarcodigoComponent implements OnDestroy,OnInit {
	roles_administrativos:string="";
	rol_menus;
	nombre_rol;

	//modal boostrap
  	closeResult: string;

  	medidor:Medidor;
  	dtOptions: any = {};
	lista_medidor;
	temp_var:Object=false;

	dtTrigger: Subject<any> = new Subject();
	@ViewChild(DataTableDirective) dtElement: DataTableDirective;

	constructor(
		private modalService: NgbModal,
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private toastrService:ToastrService,
		private _medidorService:MedidorService,
		private chRef : ChangeDetectorRef
		) {

		this.rol_menus = this._usersService.getRol();
      	this.nombre_rol = this._usersService.getNombreRol();
      	this.medidor = new Medidor(null,null,null,null,null,null,null,null,null,null,null);
	    
	}

	ngOnInit(): void {
	    this.cargar();
	}

	
	/*
	* actualizar codigo de medidor
	*/
	updateCodigoMedidor(){
		this._medidorService.updateCodigoMedidor(this.medidor.NUMMEDIDOR,this.medidor).subscribe(
			response=>{
				if(response.code == 200){
					console.log(response);
					this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
						//elimina dt
				      	dtInstance.destroy();
						this.getAllMedidorUser();
						this.toastrService.Success(response.message,response.title);
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
			);
	}


	/**************************************
	*************** Modales****************
	***************************************
	*/

	openEditMedidorModal(editCodigoMedidor, medidor) {
		this.medidor = medidor;
		
		this.modalService.open(editCodigoMedidor, {ariaLabelledBy: 'modal-basic-title'}).result.then(
			(result) => {
				this.closeResult = `cerrado con: ${result}`;
				if(result=="guardar"){
					console.log("guardado");
					console.log(this.medidor);
					this.updateCodigoMedidor();
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
		if(this.rol_menus==1||this.rol_menus==2||this.rol_menus==3){
			this.roles_administrativos="admin";
			this.getAllMedidorUser();
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
	ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
		this.dtTrigger.unsubscribe();
	}

}
