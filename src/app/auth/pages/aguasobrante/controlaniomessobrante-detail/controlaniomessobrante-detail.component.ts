import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { ToastrService } from '../../../../common/service/toastr.service';

import { UsersService } from '../../../../services/auth/users.service';
import { DetallefacturasobranteService } from '../../../../services/auth/detallefacturasobrante.service';
import { ControlaniomessobranteService } from '../../../../services/auth/controlaniomessobrante.service';
import { AguasobranteService } from '../../../../services/auth/aguasobrante.service';

//modals
import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

//datatable
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-controlaniomessobrante-detail',
  templateUrl: './controlaniomessobrante-detail.component.html',
  styleUrls: ['./controlaniomessobrante-detail.component.css']
})
export class ControlaniomessobranteDetailComponent implements OnInit {

	dtOptions: any  = {};
	
	rol_menus;
	nombre_rol;
	roles_administrativos:string="";

	controlaniomessobrante_id;

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
		private _detallefacturasobranteService:DetallefacturasobranteService,
		private _controlaniomessobranteService:ControlaniomessobranteService,
		private _aguasobranteService:AguasobranteService,
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
	getIdControlAguasobrante(){

		this._aguasobranteService.getIdControlAguasobrante(this.controlaniomessobrante_id).subscribe(
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

	/*
	* Obtener medidor y usuario
	*/
	createDetallefacturasobrante(){
		console.log(this.listausuario_sinregistro);
    	this._detallefacturasobranteService.createDetallefacturasobrante(this.controlaniomessobrante_id,this.listausuario_sinregistro).subscribe(
				res => {
		            if(res.code == 201){
		                console.log(res);
		                this.getIdControlAguasobrante();
		                this.toastrService.Success(res.message,res.title);
		                this.toastrService.Info("Se registraron usurios correctamente","Datos cargados");
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
					this.createDetallefacturasobrante();
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

			this._route.params.forEach((params:Params)=>{this.controlaniomessobrante_id=params['controlaniomessobrante_id'];});
			console.log(this.controlaniomessobrante_id);
			this.getIdControlAguasobrante();
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
