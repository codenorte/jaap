import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
//services
import { UsersService } from '../../../../services/auth/users.service';
import { AsistenciaService } from '../../../../services/auth/asistencia.service';
import { PlanificacionService } from '../../../../services/auth/planificacion.service';

//notificacion
import { ToastrService } from '../../../../common/service/toastr.service';
//modal
import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
//model 
import { Asistencia } from '../../../../model/asistencia';

@Component({
  selector: 'app-planificacion-detail',
  templateUrl: './planificacion-detail.component.html',
  styleUrls: ['./planificacion-detail.component.css']
})
export class PlanificacionDetailComponent implements OnInit {

	rol_menus;
	nombre_rol;
	roles_administrativos:string="";

	//modal boostrap
  	closeResult: string;

  	lista_usuarios;
	temp_var;
	dtOptions: any = {};

	lista_medidores_activos;
	total_sinlectura:number=0;
	temp_var_medidores:Object = false;

	planificacion_id;

	asistencia:Asistencia;
	IDASISTENCIA:number;

	dato_planificacion;
	//select 
	public arr=[];
	lista_us:any[];

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private _asistenciaService:AsistenciaService,
		private _planificacionService:PlanificacionService,
		private toastrService:ToastrService,
		private modalService: NgbModal,
		) {
		this.rol_menus = this._usersService.getRol();
      	this.nombre_rol = this._usersService.getNombreRol();
      	this.asistencia = new Asistencia(null,null,null,null,null,null,null);
	}

	ngOnInit(): void {
		this.cargar();
	}

	/*
	metodos de api
	*/

	/*
	* Obtener Planificacion por id
	*/
	getIdPlanificacion(){
		this._planificacionService.getIdPlanificacion(this.planificacion_id).subscribe(
			res => {
				if(res.code == 200){
					console.log(res);
					this.dato_planificacion = res.data;
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
	* lista de asistidos
	*/
	getIdAsistenciaMedidorUsers(){
		this._asistenciaService.getIdAsistenciaMedidorUsers(this.planificacion_id).subscribe(
			res => {
				if(res.code == 200){
					console.log(res);
					this.lista_usuarios = res.data;
					this.temp_var = true;
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
	getAllUserMedidorEstado(){
    	this._usersService.getAllUserMedidorEstado(this.planificacion_id).subscribe(
				res => {
		            if(res.code == 200){
		                console.log(res);
		                this.lista_medidores_activos = res.data;
						this.temp_var_medidores = true;
						this.total_sinlectura=res.total_sinlectura;
		                
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
	createPlanificacionAllUser(){
		console.log(this.lista_medidores_activos);
    	this._planificacionService.createPlanificacionAllUser(this.planificacion_id,this.lista_medidores_activos).subscribe(
				res => {
		            if(res.code == 201){
		                console.log(res);
		                this.getIdAsistenciaMedidorUsers();
		                this.getAllUserMedidorEstado();
		                this.toastrService.Success(res.message,res.title);
		                this.toastrService.Info("Se cargan todos los usuarios de medidores activos","Datos cargados");
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

	/*
	* Registrar asistencia, cambio de estado 
	*/
	registrarAsistencia(){
		if(this.asistencia.ASISTENCIA=='NO'){//valor actual, cambio en la condicion
			this.asistencia.ASISTENCIA="SI";
		}
		else{
			this.asistencia.ASISTENCIA="NO";
		}
		console.log(this.asistencia);
    	this._asistenciaService.registrarAsistencia(this.IDASISTENCIA,this.asistencia).subscribe(
				res => {
		            if(res.code == 200){
		                console.log(res);
		                this.getIdAsistenciaMedidorUsers();
		                this.toastrService.Success(res.message,res.title);
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

	
	/**************************************
	*************** Modales****************
	***************************************
	*/
	cargarUsuariosModal(cargarUsuarios) {
		this.arr = [];
		this.modalService.open(cargarUsuarios, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then(
			(result) => {
				this.closeResult = `cerrado con: ${result}`;
				if(result=="guardar"){
					console.log("guardado todos los usuarios");
					this.createPlanificacionAllUser();
				}
			},
			(reason) => {
				//this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				//console.log(reason);
		});
	}

	openRegistrarAsistenciaModal(registrarUsuario,us) {
		console.log(us);
		this.IDASISTENCIA=us.IDASISTENCIA;
		this.asistencia = us;
		this.modalService.open(registrarUsuario, {ariaLabelledBy: 'modal-basic-title'}).result.then(
			(result) => {
				this.closeResult = `cerrado con: ${result}`;
				if(result=="guardar"){
					console.log("Registro guardado");
					this.registrarAsistencia();
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
	//metodos locales 
	getUsers(e,data){
		this.lista_us = data;

		//console.log(data);
		//console.log(this.lista_medidores_activos);

		//console.log(this.arr);
		//this.splice(0, this.lista_medidores_activos.length);
		this.arr=[];
		this.lista_medidores_activos.forEach(
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
		this.lista_medidores_activos.forEach(
			x => {
				x.checked = ev.target.checked;
				if(x.checked) 
				{ 
					this.arr.push(x);
				}
				//console.log(x);
			} 
		);
		console.log(this.arr);
	}

	isAllCheckBoxChecked() {
		//Determina si todos los elementos en el array satisfacen una condición. return true|false
		return this.lista_medidores_activos.every(
				p =>{
					p.checked;
					//console.log(p.checked);
				}
			);
	}



	cargar(){
		
		this._route.params.forEach((params:Params)=>{this.planificacion_id=params['planificacion_id'];});


		if(this.rol_menus==1||this.rol_menus==2||this.rol_menus==3){
			this.roles_administrativos="admin";
			this.getIdAsistenciaMedidorUsers();
			setTimeout(()=>{
		    	this.getAllUserMedidorEstado();
	  	    }, 1000);
	  	    this.getIdPlanificacion();

			this.dtOptions = {
				pagingType: 'full_numbers',
				"deferRender": true,
				responsive: true,
				"bPaginate": false,
				//"searching": false,
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
