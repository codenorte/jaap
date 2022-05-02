import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { ToastrService } from '../../../../common/service/toastr.service';

import { UsersService } from '../../../../services/auth/users.service';
import { DetallefacturaganaderiaService } from '../../../../services/auth/detallefacturaganaderia.service';
import { ControlaniomesganaderiaService } from '../../../../services/auth/controlaniomesganaderia.service';
import { AguaganaderiaService } from '../../../../services/auth/aguaganaderia.service';

//model
import { Detallefacturaganaderia } from '../../../../model/detallefacturaganaderia';

//modals
import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

//datatable
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-controlaniomesganaderia-detail',
  templateUrl: './controlaniomesganaderia-detail.component.html',
  styleUrls: ['./controlaniomesganaderia-detail.component.css']
})
export class ControlaniomesganaderiaDetailComponent implements OnInit {

	dtOptions: any  = {};
	
	rol_menus;
	nombre_rol;
	roles_administrativos:string="";

	controlaniomesganaderia_id;

	listausuario;
	listausuario_sinregistro;
	total_sinlectura;
	temp_detallefactura:Object=false;

	//modal boostrap
  	closeResult: string;
  	total;

  	//select 
	public arr=[];
	lista_us:any[];

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private _detallefacturaganaderiaService:DetallefacturaganaderiaService,
		private _controlaniomesganaderiaService:ControlaniomesganaderiaService,
		private _aguaganaderiaService:AguaganaderiaService,
		private toastrService:ToastrService,
		private modalService: NgbModal,
		) {

		this.rol_menus = this._usersService.getRol();
      	this.nombre_rol = this._usersService.getNombreRol();

	}

	ngOnInit(): void {
		this.cargar();
	}


	/*
	* obtener control anio mes por id
	*/
	getIdControlAguaganaderia(){

		this._aguaganaderiaService.getIdControlAguaganaderia(this.controlaniomesganaderia_id).subscribe(
			res => {
				if(res.code == 200){
					console.log(res);
					this.listausuario =res.data;
					this.total = res.total;
					this.listausuario_sinregistro=res.sinlectura;
					this.total_sinlectura=res.total_sinlectura;

					this.temp_detallefactura=true;
				}else{
					console.log(res);
				}
			},
			error => {
				console.log(<any>error);
			}
			);
	}
	/* No ocupa
	* obtener control anio mes por id
	*/
	createAllDetallefacturaganaderia(){

		this._detallefacturaganaderiaService.createAllDetallefacturaganaderia(this.controlaniomesganaderia_id).subscribe(
			res => {
				if(res.code == 201){
					console.log(res);
					this.getIdControlAguaganaderia();
			        this.toastrService.Success(res.message,res.title);

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

	/*
	* Obtener medidor y usuario
	*/
	createDetallefacturaganaderia(){
		console.log(this.listausuario_sinregistro);
    	this._detallefacturaganaderiaService.createDetallefacturaganaderia(this.controlaniomesganaderia_id,this.listausuario_sinregistro).subscribe(
				res => {
		            if(res.code == 201){
		                console.log(res);
		                this.getIdControlAguaganaderia();
		                this.toastrService.Success(res.message,res.title);
		                this.toastrService.Info("Se cargan todos los usuarios activos","Datos cargados");
		            }else{
		            	console.log(res);
		            	this.toastrService.Error(res.message,res.title);
		            }
		        },
		        error => {
		            console.log(<any>error);
		            this.toastrService.Error(<any>error.error.error,"Error");
		        }
			);
	}
	

	/*************************************************
	************* Modals *****************************
	**************************************************
	*/
	//modal crear cliente
	openRegistrarConsumoModal(registrarConsumo) {
		this.modalService.open(registrarConsumo, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then(
			(result) => {
				this.closeResult = `cerrado con: ${result}`;
				if(result=="guardar"){
					console.log("guardado");
					this.createDetallefacturaganaderia();
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

	//metodos locales 
	getUsers(e,data){
		this.lista_us = data;

		//console.log(data);
		//console.log(this.lista_medidores_activos);

		//console.log(this.arr);
		//this.splice(0, this.lista_medidores_activos.length);
		this.arr=[];
		this.listausuario_sinregistro.forEach(
			x => {
				x.checked;

				if(x.checked) 
				{ 
					this.arr.push(x);
					//console.log(x);
					//console.log(this.arr);
				}
				/*
				else{
					this.arr.pop();
				}*/
				//console.log(this.lista_medidores_activos);
			} 
		);
		console.log(this.arr);
	}
	checkAllCheckBox(ev) {
		this.arr=[];
		this.listausuario_sinregistro.forEach(
			x => {
				x.checked = ev.target.checked;
				if(x.checked) 
				{ 
					this.arr.push(x);
				}
			} 
		);
		console.log(this.arr);
	}
	isAllCheckBoxChecked() {
		//Determina si todos los elementos en el array satisfacen una condición. return true|false
		return this.listausuario_sinregistro.every(
				p =>{
					p.checked;
				}
			);
	}

	cargar(){
		//roles usuarios
		if(this.rol_menus==1||this.rol_menus==2||this.rol_menus==3){
			this.roles_administrativos="admin";

			this._route.params.forEach((params:Params)=>{this.controlaniomesganaderia_id=params['controlaniomes_id'];});
			console.log(this.controlaniomesganaderia_id);
			this.getIdControlAguaganaderia();
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
			console.log(this.roles_administrativos);

		}
		else{
			this.roles_administrativos="user";
		}
	}

}
