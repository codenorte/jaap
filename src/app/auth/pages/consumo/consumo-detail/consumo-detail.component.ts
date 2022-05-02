import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { ToastrService } from '../../../../common/service/toastr.service';

import { UsersService } from '../../../../services/auth/users.service';
import { DetallefacturaService } from '../../../../services/auth/detallefactura.service';
import { ControlaniomesdetallefacturaService } from '../../../../services/auth/controlaniomesdetallefactura.service';
import { CorteService } from '../../../../services/auth/corte.service';

//model
import { Detallefactura } from '../../../../model/detallefactura';
import { Corte } from '../../../../model/corte';

//modals
import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

//datatable
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-consumo-detail',
  templateUrl: './consumo-detail.component.html',
  styleUrls: ['./consumo-detail.component.css']
})
export class ConsumoDetailComponent implements OnDestroy, OnInit {

	dtOptions: any  = {};
	dtOptions_conlectura: any  = {};
	listausuario;
	
	rol_menus;
	nombre_rol;
	roles_administrativos:string="";

	detallefactura;
	medidor_sinlectura;
	temp_detallefactura:Object=false;
	temp_medidor_sinlectura:Object=false;
	//modal boostrap
  	closeResult: string;
  	//modales registrar consumo
  	controlaniomes;
  	listamedidor;
  	ultimos_registros;
  	detallefactura_model:Detallefactura;
  	controlaniomes_id;
  	//editar detallefactura
  	detallefactura_edit:Detallefactura;
  	id_detallefac;
  	//si son mas de 3 meses crear corte o multa por reconexion
  	corte:Corte;
  	//calcular consumo
  	medidaactual:number =0;
  	consumo:number = 0;
  	medidaexcedido:number = 0;
  	tarifa_excedido :number = 0;
  	suma_tarifas:number = 0;

  	medidaactualmensaje:Object= null;
  	tarifas;
  	//datatable options 
  	dtTrigger: Subject<any> = new Subject();
	@ViewChild(DataTableDirective) dtElement: DataTableDirective;
	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private _detallefacturaService:DetallefacturaService,
		private _corteService:CorteService,
		private _controlaniomesdetallefacturaService:ControlaniomesdetallefacturaService,
		private toastrService:ToastrService,
		private modalService: NgbModal,
		private chRef : ChangeDetectorRef
		) {

		this.rol_menus = this._usersService.getRol();
      	this.nombre_rol = this._usersService.getNombreRol();
      	this.getIdControlaniomesdetallefactura();

      	this.detallefactura_model = new Detallefactura(null,null,'',null,null,null,null,null,null,null,null,null,null,null,null,null,null);
      	this.detallefactura_edit = new Detallefactura(null,null,'',null,null,null,null,null,null,null,null,null,null,null,null,null,null);

      	this.corte = new Corte(null,null,null,null,null,null,null,null);
	}

	ngOnInit(): void {
		this.cargar();
	}
	/*
	* obtener control anio mes por id
	*/
	getIdControlaniomesdetallefactura(){
		this._route.params.forEach((params:Params)=>
		{
			this.controlaniomes_id=params['consumo_id'];
			this._controlaniomesdetallefacturaService.getIdControlaniomesdetallefactura(this.controlaniomes_id).subscribe(
				res => {
					if(res.code == 200){
						console.log(res);
						this.tarifas = res.tarifas;
						this.controlaniomes=res.data;
					}else{
						console.log(res);
					}
				},
				error => {
					console.log(<any>error);
				}
				);
		}
		);
	}

	/*
	* Actualizar estado users
	*/
	getDetallefacturasinlectura(){
		this._detallefacturaService.getDetallefacturasinlectura(this.controlaniomes_id).subscribe(
			res => {
				if(res.code == 200){
					console.log(res);
					this.detallefactura = res.detallefactura;
					this.temp_detallefactura = true;

					this.medidor_sinlectura = res.medidor_sinlectura;
					this.temp_medidor_sinlectura = true;
					//console.log(this.medidor_sinlectura);

					//this.chRef.detectChanges();
					//Actualizar dt
					//this.dtTrigger.next();
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
	* Obtener 5 ultimos registros de un usuario por NUMEDIDOR
	*/
	getUltimosRegistrosDet(IDMEDIDOR){
    	this._detallefacturaService.getUltimosRegistrosDet(IDMEDIDOR).subscribe(
				res => {
		            if(res.code == 200){
		                console.log(res);
		                this.ultimos_registros=res.data;
		            }else{
		            	console.log(res);
		            }
		        },
		        error => {
		            console.log(<any>error);
		        }
			);
	}

	//Crear detallefactura - Registrar consumo
	createDetallefactura(){
		//registrar consumo
		//this.detallefactura_model.CONSUMO = this.detallefactura_model.MEDIDAACT-this.listamedidor.detalleanterior.MEDIDAANT;
		//registro excedido
		//this.detallefactura_model.MEDEXCEDIDO = (this.detallefactura_model.MEDIDAACT-this.listamedidor.detalleanterior.MEDIDAANT);
		console.log(this.detallefactura_model);

		if(this.detallefactura_model.MEDIDAACT<this.detallefactura_model.MEDIDAANT){
			this.toastrService.Warning("La medida actual no debe ser menor a la medida anterior","Error");
		}
		else{
			this._detallefacturaService.createDetallefactura(this.detallefactura_model).subscribe(
					res => {
			            if(res.code == 201){
			                console.log(res);

			                this.toastrService.Success(res.message,res.title);
			                this.getDetallefacturasinlectura();
			                //limpiar variables
			                this.detallefactura_model = new Detallefactura(null,null,'',null,null,null,null,null,null,null,null,null,null,null,null,null,null);
			                this.medidaactual = null;
							this.consumo = null;
							this.medidaexcedido = null;

							//crear corte
							this.corte.IDMEDIDOR = res.data.IDMEDIDOR;
							console.log(this.corte);
							this.createCorte();
							/*
			                this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
								//elimina dt
						      	dtInstance.destroy();
								
								
						    });
						    */


			            }else{
			            	console.log(res);
			            	this.toastrService.Error("Error al crear","Error");
			            }
			        },
			        error => {
			            console.log(<any>error);
			            this.toastrService.Error(<any>error.error.error,"Error");
			        }
				);
		}
	}

	//Crear detallefactura - Registrar consumo
	editDetallefactura(){
		console.log(this.detallefactura_edit);
		console.log(this.id_detallefac);
		if(this.detallefactura_edit.MEDIDAACT<this.detallefactura_edit.MEDIDAANT){
			this.toastrService.Warning("La medida actual no debe ser menor a la medida anterior","Error");
		}
		else{
			this._detallefacturaService.editDetallefactura(this.detallefactura_edit,this.id_detallefac).subscribe(
					res => {
			            if(res.code == 200){
			                console.log(res);

			                this.toastrService.Success(res.message,res.title);
			                this.getDetallefacturasinlectura();
			                //limpiar variables
			                this.detallefactura_edit = new Detallefactura(null,null,'',null,null,null,null,null,null,null,null,null,null,null,null,null,null);
			                this.medidaactual = null;
							this.consumo = null;
							this.medidaexcedido = null;


			            }else{
			            	console.log(res);
			            	this.toastrService.Error("Error al crear","Error");
			            }
			        },
			        error => {
			            console.log(<any>error);
			            this.toastrService.Error(<any>error.error.error,"Error");
			        }
				);
		}
	}

	createCorte(){

		this._corteService.createCorte(this.corte).subscribe(
			res => {
				if(res.code == 201){
					console.log(res);
					this.toastrService.Success(res.message,res.title);
					this.corte = new Corte(null,null,null,null,null,null,null,null);
				}else{
					console.log(res);
				}
			},
			error => {
				console.log(<any>error);
			}
			);
	}

	/*************************************************
	************* Modals *****************************
	**************************************************
	*/
	//modal crear cliente
	openRegistrarConsumoModal(registrarConsumo,users) {
		this.listamedidor = users;
		console.log(this.listamedidor);
		this.detallefactura_model.IDMEDIDOR = this.listamedidor.IDMEDIDOR;
		this.detallefactura_model.controlaniomes_id = this.controlaniomes_id;
		this.detallefactura_model.ANIOMES = this.controlaniomes.aniomes;
		this.detallefactura_model.MEDIDAANT = this.listamedidor.detalleanterior.MEDIDAACT;

		this.tarifa_excedido = 0;
		this.suma_tarifas = 0;

		//this.tarifas.BASE

		//this.detallefactura_model.MEDIDAANT = this.listamedidor.detalleanterior.MEDIDAANT;

		this.getUltimosRegistrosDet(this.listamedidor.IDMEDIDOR); 


		this.modalService.open(registrarConsumo, {ariaLabelledBy: 'modal-basic-title',size: 'xl'}).result.then(
			(result) => {
				this.closeResult = `cerrado con: ${result}`;
				if(result=="guardarestado"){
					console.log("guardado");
				}
			},
			(reason) => {
				//this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				//console.log(reason);
		});
	}
	openEditarConsumoModal(editarConsumo,users) {
		this.detallefactura_edit = users;
		this.id_detallefac = users.IDDETALLEFAC;
		console.log(users);
		this.getUltimosRegistrosDet(users.medidor_usuario.IDMEDIDOR);

		this.modalService.open(editarConsumo, {ariaLabelledBy: 'modal-basic-title',size: 'xl'}).result.then(
			(result) => {
				this.closeResult = `cerrado con: ${result}`;
				if(result=="guardar"){
					console.log("guardado");
				}
			},
			(reason) => {
				//this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				//console.log(reason);
		});
	}

	openEditarConsumoMedidorModal(editarConsumoMedida) {

		this.modalService.open(editarConsumoMedida, {ariaLabelledBy: 'modal-basic-title',size: 'xl'}).result.then(
			(result) => {
				this.closeResult = `cerrado con: ${result}`;
				if(result=="guardar"){
					console.log("guardado");
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
	/*************************************************
	************* fin Modals *************************
	**************************************************
	*/
	/*************************************************
	************* Otros metodos **********************
	**************************************************
	*/
	calcularConsumo(event){
		console.log(event.control.value);

		var medidaanterior = Number(this.detallefactura_model.MEDIDAANT);
		this.medidaactual = parseInt(event.control.value);

		


		if(this.detallefactura_model.MEDIDAACT>=this.detallefactura_model.MEDIDAANT){

			this.consumo = Number(this.medidaactual - medidaanterior);
			if(this.consumo>=this.tarifas.BASE){
	  			this.medidaexcedido = Number(this.consumo - this.tarifas.BASE);
	  			this.tarifa_excedido = Number(this.medidaexcedido * this.tarifas.VALOREXCESO);

	  			this.suma_tarifas = parseFloat(this.tarifas.TARBASE + this.tarifas.APORTEMINGA + this.tarifa_excedido);
			}
			else{
				this.medidaexcedido = 0;
				this.tarifa_excedido = 0;
				this.suma_tarifas = Number(this.tarifas.TARBASE+ this.tarifas.APORTEMINGA);
			}
	  		this.medidaactualmensaje = false;
		}
		else{
			this.consumo = 0;
			this.medidaexcedido = 0;
			this.tarifa_excedido = 0;
			this.suma_tarifas = 0;
			this.medidaactualmensaje = true;
		}
	}
	calcularConsumoEdit(event){
		console.log(event.control.value);

		var medidaanterior = Number(this.detallefactura_edit.MEDIDAANT);
		this.medidaactual = parseInt(event.control.value);

		if(this.medidaactual>=medidaanterior){

			this.consumo = Number(this.medidaactual - medidaanterior);
			if(this.consumo>=this.tarifas.BASE){
	  			this.medidaexcedido = Number(this.consumo - this.tarifas.BASE);
			}
			else{
				this.medidaexcedido = 0;
			}
	  		this.medidaactualmensaje = false;
		}
		else{
			this.consumo = 0;
			this.medidaactualmensaje = true;
		}
	}
	/*************************************************
	************* fin Otros metodos ******************
	**************************************************
	*/

	cargar(){
		//roles usuarios
		if(this.rol_menus==1||this.rol_menus==2||this.rol_menus==3){
			this.roles_administrativos="admin";
		}
		else if(this.rol_menus==4){
			this.roles_administrativos="operador";
			console.log(this.roles_administrativos);
			this.getDetallefacturasinlectura();

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

			this.dtOptions_conlectura = {
				pagingType: 'full_numbers',
				"deferRender": true,
				responsive: true,
				"bPaginate": false,
				columnDefs: [
				{ 
					orderable: false,
					searchable: false,
					targets: 7
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
					messageTop: 'Reporte de usuario con lectura mensual',
					exportOptions: {
						columns: [ 0, 1, 2, 3, 4, 5, 6 ]
					}
				},
				{
					extend: 'print', title: 'Reporte',
					text: '<i class="fa  fa-print"> Imprimir</i>',
					messageTop: 'Reporte de usuario con lectura mensual',
					autoPrint: false,
					exportOptions: {
						columns: [ 0, 1, 2, 3, 4, 5, 6 ]
					}
				},
				{
					extend: 'pdfHtml5',
					title: 'Reporte',
					text: '<i class="fa fa-file-pdf-o"> PDF</i>',
					messageTop: 'Reporte de usuario con lectura mensual',
					exportOptions: {
						columns: [ 0, 1, 2, 3, 4, 5, 6 ]
					},

					orientation: 'landscape',
				}
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
		else{
			this.roles_administrativos="user";
		}
	}
	ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
		this.dtTrigger.unsubscribe();
	}
}
