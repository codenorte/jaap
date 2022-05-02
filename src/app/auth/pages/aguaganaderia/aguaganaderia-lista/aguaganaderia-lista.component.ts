import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
//servicios
import { MedidorService } from '../../../../services/auth/medidor.service';
import { UsersService } from '../../../../services/auth/users.service';
import { AguaganaderiaService } from '../../../../services/auth/aguaganaderia.service';

import { Aguaganaderia } from '../../../../model/aguaganaderia';

import { ToastrService } from '../../../../common/service/toastr.service';
import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Users } from '../../../../model/users';

import * as validateDocument from '../../../../../../node_modules/validate-document-ecuador';

//interface 
import { User } from '../../../interface/user';



@Component({
  selector: 'app-aguaganaderia-lista',
  templateUrl: './aguaganaderia-lista.component.html',
  styleUrls: ['./aguaganaderia-lista.component.css']
})
export class AguaganaderiaListaComponent implements OnInit {
	roles_administrativos:string="";
	rol_menus;
	nombre_rol;

	dtOptions: any = {};
	lista_ganaderia;
	temp_var:Object=false;
	//modal boostrap
  	closeResult: string;

	aguaganaderia: Aguaganaderia;

	total:number=0;
	total_activos:number=0;
	total_inactivos:number=0;
	total_retirados:number=0;
	//crear usuario
	users:Users;
	sector;
	institucion;
	validarcedula = "";
	tipo_cedula = '';
	saldo:number = 0;

	lista_usuarios;
	temp_var_usuarios: boolean= false;

	//busqueda por pipe 
	searchValue = '';
	user:User[];
	alluser:User[];
	total_user;

	//paginacion
	public page=1;
	public pageSize = 10;
	collectionSize: number;

	//comm-section >tab
	array_datos = [];

	seleccionar_sector =[
		{ id:1, name:'Sanja Pamba' },
		{ id:2, name:'Lobojo' }
	];


	constructor(
		private modalService: NgbModal,
		private _route:ActivatedRoute,
		private _router:Router,
		private _usersService:UsersService,
		private _aguaganaderiaService:AguaganaderiaService,
		private toastrService:ToastrService,
		private _medidorService:MedidorService,
		) {

		this.rol_menus = this._usersService.getRol();
      	this.nombre_rol = this._usersService.getNombreRol();
		this.users=new Users('','','','',null,'','','','','','','','','','','','',null);
      	this.aguaganaderia = new Aguaganaderia(null,null,null,null,null,null,null,null,null,null);
	    
	}

	ngOnInit(): void {
	    this.cargar();
	}

	/*
	* crear usuario
	*/
	createAguaganaderia(){
		this.users.IDINSTITUCION=this.institucion.IDINSTITUCION;
		console.log(this.users);
		console.log(this.aguaganaderia);

		this.array_datos.push({
			users: this.users,
			aguaganaderia: this.aguaganaderia
		});
		console.log(this.array_datos);

		this._aguaganaderiaService.createAguaganaderia(this.array_datos).subscribe(
			response=>{
				if(response.code == 201){
					console.log(response);
					this.getAllAguaganaderiaTotales();
					this.getAllAguaganaderia();
					this.array_datos = [];

					this.toastrService.Success(response.message,response.title);
					this.users=new Users('','','','',null,'','','','','','','','','','','','',null);
      				this.aguaganaderia = new Aguaganaderia(null,null,null,null,null,null,null,null,null,null);

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
	/*
	* totales de aguaganaderia 
	*/
	getAllAguaganaderiaTotales(){
		this._aguaganaderiaService.getAllAguaganaderiaTotales().subscribe(
			response=>{
				if(response.code == 200){
					console.log(response);

					//admin
					this.total=response.data;
					this.total_activos=response.total_activos;
					this.total_inactivos=response.total_inactivos;
					this.total_retirados=response.total_retirados;

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
	* lista de aguaganaderia 
	*/
	getAllAguaganaderia(){
		this._aguaganaderiaService.getAllAguaganaderia().subscribe(
			response=>{
				if(response.code == 200){
					console.log(response);
					this.lista_ganaderia = response.data;
					this.temp_var = true;
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
	* Obtener User clientes 
	*/
	getUserLeftjoinAguaganaderia(){
		this._aguaganaderiaService.getUserLeftjoinAguaganaderia().subscribe(
			response=>{
				if(response.code == 200){
					console.log(response);
					this.user = response.data;
		            this.alluser=this.user;

					this.temp_var_usuarios = true;

					this.total_user = this.user.length;
	                console.log(this.user.length);

	                this.collectionSize = this.total_user;
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
	//modal crear cliente
	openAgregarNuevoUsuarioModal(agregarNuevoUsuario) {
      	//this.aguaganaderia = new Aguaganaderia(null,null,null,null,null,null,null,null,null,null);
		//this.users=new Users('','','','',null,'','','','','','','','','','','','',null);
		this.modalService.open(agregarNuevoUsuario, {ariaLabelledBy: 'modal-basic-title'}).result.then(
			(result) => {
				this.closeResult = `cerrado con: ${result}`;
				if(result=="guardarestado"){
					console.log("guardado");
					//this.createUser();
				}
			},
			(reason) => {
				//this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				//console.log(reason);
		});
	}
	//modal seleccionar cliente
	openSeleccionarUsuarioModal(seleccionarUsuario) {
		this.users=new Users('','','','',null,'','','','','','','','','','','','',null);
      	this.aguaganaderia = new Aguaganaderia(null,null,null,null,null,null,null,null,null,null);
		this.modalService.open(seleccionarUsuario, {ariaLabelledBy: 'modal-basic-title',size: 'lg'}).result.then(
			(result) => {
				this.closeResult = `cerrado con: ${result}`;
				if(result=="guardarestado"){
					console.log("guardado");
					//this.createInstalaciones();
				}
			},
			(reason) => {
				//this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				//console.log(reason);
		});
	}

	//modal confirmar seleccion cliente
	openConfirmarSelectUsuarioModal(confirmarSelectUsuario) {
		this.modalService.open(confirmarSelectUsuario, {ariaLabelledBy: 'modal-basic-title'}).result.then(
			(result) => {
				this.closeResult = `cerrado con: ${result}`;
				if(result=="guardarestado"){
					console.log("guardado");
					//this.createUser();
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


	/**************************************
	*************** metodos locales ****************
	***************************************
	*/

	//evento validar
	validarCI(event){
		var dato = event.control.value;
		var tamanio = dato.length;


		if(tamanio==10){
			const cedula = validateDocument.getValidateDocument( 'cedula', dato );
			if(cedula.status=="SUCCESS"){
				this.validarcedula = '1';
				this.tipo_cedula = cedula.message;
			}
			else{
				this.validarcedula = '0';
				this.tipo_cedula = cedula.message;
			}
			console.log(cedula);
		}
		else if(tamanio==13){
			const ruc = validateDocument.getValidateDocument( 'ruc', dato );
			if(ruc.status=='SUCCESS'){
				this.validarcedula = '1';
				this.tipo_cedula = ruc.message;
			}else{
				this.validarcedula = '0';
				this.tipo_cedula = ruc.message;
			}
			console.log(ruc);
		}
		else{
			this.validarcedula = '0';
			this.tipo_cedula = 'No valido';
			console.log("Caracter no valido");
		}

	}

	//validar email 
	validateEmail(email) {
	    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    console.log(re);
	    console.log(re.test(String(email)));
	    return re.test(String(email).toLowerCase());
	}
	convertirMayuscula(str) {
		//console.log(str);
		var dato =str.control.value;
	  	dato.toUpperCase();
	  	
	  	if(str.name=='NOMBRES'){
	  		this.users.NOMBRES = dato.toUpperCase();
	  		//console.log(dato);
	  		//console.log(this.users.NOMBRES);
	  	}
	  	if(str.name=='APELLIDOS'){
	  		this.users.APELLIDOS = dato.toUpperCase();
	  	}
	}

	eventoBuscar(value: string):void{
		//console.log(value);
	    this.user = this.alluser.filter(
	    	(user) => 
			user.RUCCI.toLowerCase().includes(value.toLowerCase()) ||
			user.NOMBRES.toLowerCase().includes(value.toLowerCase()) ||
			user.APELLIDOS.toLowerCase().includes(value.toLowerCase()) ||
			user.APADOSN.toLowerCase().includes(value.toLowerCase()) ||
			user.SECTOR.toLowerCase().includes(value.toLowerCase())

	    	);
    	this.collectionSize = this.user.length;
    	//console.log(this.usermedidor);
    	//console.log(this.collectionSize);
	}

	seleccionarUser(us){
		this.searchValue= "";
		this.collectionSize = this.total_user;
		this.users = us;
		console.log(this.users);
		this.aguaganaderia.IDUSUARIO = us.id;
	}

	cargar(){
		if(this.rol_menus==1||this.rol_menus==2||this.rol_menus==3){
			this.institucion=this._usersService.getInstitucion();
			//lista usuarios
			this.getAllAguaganaderiaTotales();
			this.getAllAguaganaderia();

			setTimeout(()=>{
		    	//this.getUserLeftjoinAguaganaderia();
	  	    }, 3000);
	  	    this.dtOptions = {
				pagingType: 'full_numbers',
				"bPaginate": false,
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
			this.roles_administrativos="admin";
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
