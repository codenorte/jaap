import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
//import { Select2OptionData } from 'ng-select2';
//services
import { UsersService } from '../../../../services/auth/users.service';
import { ProveedoresService } from '../../../../services/auth/proveedores.service';
import { MaterialesService } from '../../../../services/auth/materiales.service';

import { ToastrService } from '../../../../common/service/toastr.service';
import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

//modelo
import { Materiales } from '../../../../model/materiales';
import { Proveedor } from '../../../../model/proveedor';
import { ComprasNueva } from '../../../../model/compras_nueva';
import { DetalleComprasNueva } from '../../../../model/detallecompras_nueva';

//validar cedula
import * as validateDocument from '../../../../../../node_modules/validate-document-ecuador';
//reactive form
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';


let material_model: Material;

@Component({
  selector: 'app-realizar-compras',
  templateUrl: './realizar-compras.component.html',
  styleUrls: ['./realizar-compras.component.css']
})
export class RealizarComprasComponent implements OnInit {

	roles_administrativos:string="";
	rol_menus;
	nombre_rol;

  	//crear proveedores
  	proveedor : Proveedor;
  	buscar_proveedor : Proveedor;

  	validarcedula = "";
	tipo_cedula = '';

	proveedor_encontrado;
	proveedor_nuevo:boolean= false;
	compras_nueva: ComprasNueva;
	detalle_compras_nueva: DetalleComprasNueva;

	closeResult: string;

	//reactive form listafacturas
  	detallecomprasForm  = new FormGroup({
    	listadetallecompras: new FormArray([]),
	});

	listafactura_tamanio:number = 0;
	listafactura_restar_tamanio:number = 0;
	facturasForm_removidas  = new FormGroup({
    	listafacturas_removidas: new FormArray([]),
	});

  	subtotal: number=0;
  	iva: number=0;
  	tarexcedido: number=0;
  	alcantarillado: number=0;
  	total: number=0;

  	//materiales
  	materiales : Materiales;
  	lista_de_materiales;
  	//public lista_materiales: Array<Select2OptionData>;
  	public lista2:any[]=[];
  	oject_materiales:Object = false;

  	dtOptions: any = {};

	//proveedor
	public array_proveedor:any[]=[];
    //public lista_proveedores: Array<Select2OptionData>;
  

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _materialesService:MaterialesService,
		private _usersService:UsersService,
		private _proveedoresService:ProveedoresService,
		private toastrService:ToastrService,
		private modalService: NgbModal,
		private formBuilder: FormBuilder,
		) {
		this.rol_menus = this._usersService.getRol();
      	this.nombre_rol = this._usersService.getNombreRol();

      	this.proveedor = new Proveedor(null,null,null,null,null,null,null,null,null,null);
      	this.buscar_proveedor = new Proveedor(null,null,null,null,null,null,null,null,null,null);
      	this.compras_nueva = new ComprasNueva(null,null,null,null,null,null,null,null,null,null,null,null,null);
		this.detalle_compras_nueva = new DetalleComprasNueva(null,null,null,null,null,null,null,null);

		this.materiales = new Materiales(null,null,null,null,null,null,null,null);
	}

	ngOnInit(): void {
		this.cargar();
		console.log(this.detallecomprasForm);
		console.log(this.listadetallecompras);
	}

	/*
	* Reactive forms
	*/
	setPreset() {
		//this.cities.patchValue(['LA', 'MTV']);
	}
	//obtener listaFacturas
	get listadetallecompras(): FormArray {
		return this.detallecomprasForm.get('listadetallecompras') as FormArray;
	}
	initiateForm(detalle_compras_nueva): FormGroup {
		
		return this.formBuilder.group({
			nombre: detalle_compras_nueva.nombre,
			detalle: detalle_compras_nueva.detalle,
			codigo: detalle_compras_nueva.codigo,
			cantidad: detalle_compras_nueva.cantidad,
			categoriasmat_id: detalle_compras_nueva.categoriasmat_id,
			material_id: detalle_compras_nueva.material_id,
			tipomat_id: detalle_compras_nueva.tipomat_id,
			precio: detalle_compras_nueva.precio
		});
	}
	//obtener listaFacturas
	get listafacturas_removidas(): FormArray {
		return this.facturasForm_removidas.get('listafacturas_removidas') as FormArray;
	}

	//buscar proveedor por cedula 
	getAllProveedor(){

		this._proveedoresService.getAllProveedor().subscribe(
			response=>{
				if(response.code == 200){
					console.log(response);
					var dato = response.data;

					for (var i = 0; i < response.data.length; ++i) {
						this.array_proveedor.push({
							id: response.data[i].id,
							text: response.data[i].ciruc+' - ' +response.data[i].nombres+' ' + response.data[i].apellidos,
							data:response.data[i]
						});
					}
					//this.lista_proveedores= this.array_proveedor;
					//console.log(this.lista_proveedores);
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
	* buscar material
	*
	*/
	getAllMateriales(){

		this._materialesService.getAllMateriales().subscribe(
			response=>{
				if(response.code == 200){
					console.log(response);

					this.lista_de_materiales = response.data;
					this.oject_materiales = true;
					
					for (var i = 0; i < response.data.length; ++i) {
						this.lista2.push({
							categoriasmat_id: response.data[i].categoriasmat_id,
							codigo: response.data[i].codigo,
							detalle: response.data[i].detalle,
							estado: response.data[i].estado,
							id: response.data[i].id,
							nombre: response.data[i].nombre,
							stock: response.data[i].stock,
							total: response.data[i].total,
							text: response.data[i].nombre
						});
						//this.lista2[i]= lista;
					}
					//this.lista_materiales= this.lista2;
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
	* buscar material por nombre
	*
	*/
	buscarNombreMateriales(){
		console.log(this.materiales);
		this._materialesService.buscarNombreMateriales(this.materiales.nombre).subscribe(
			response=>{
				if(response.code == 200){
					console.log(response);
					
					/*
					for (var i = 0; i < response.data.length; ++i) {
						this.lista2.push({
							id: response.data[i].id,
							text: response.data[i].nombre,
							data:response.data[i]
						});
						//this.lista2[i]= lista;
					}
					this.lista_materiales= this.lista2;
					*/
				}
				else{
					console.log(response);
					this.toastrService.Error(response.message,response.title);
				}
			},
			error=>{
				console.log(<any>error.error);
				this.toastrService.Error(<any>error.error.error,"Error");

			}
			);
	}
	createProveedor(){

	}

	/**************************************
	*************** Modales****************
	***************************************
	*/
	openBuscarMaterialesModal(buscarMateriales) {
		//console.log(buscarMateriales);
		this.getAllMateriales();
		
		this.modalService.open(buscarMateriales, {ariaLabelledBy: 'modal-basic-title',size: 'lg'}).result.then(
			(result) => {
				this.closeResult = `cerrado con: ${result}`;
				if(result=="guardar"){
					console.log("guardado");
					console.log(this.proveedor);
				}
			},
			(reason) => {
				//this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				//console.log(reason);
		});
	}
	openAddProveedorModal(addProveedor) {
		console.log(addProveedor);
		this.modalService.open(addProveedor, {ariaLabelledBy: 'modal-basic-title'}).result.then(
			(result) => {
				this.closeResult = `cerrado con: ${result}`;
				if(result=="guardar"){
					console.log("guardado");
					console.log(this.proveedor);
					this.proveedor_encontrado = '1';
					//this.createInstalaciones();
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
	//buscar
	seleccionarMaterialCombo(){
		//$('#mat_nombre').on('select2:select', function (e) {
		    //var data = e.params.data;
		    //console.log(e);
		   // console.log(e.params);
		   // console.log(data);
		    //material_model.nombre='';
		    
		    /*
		    material_model.nombre=data.nombre;
			material_model.detalle=data.;
			material_model.codigo=data.;
			material_model.stock=data.;
			material_model.total=data.;
			material_model.estado=data.;
			material_model.categoriasmat_id=data.;
			material_model.compras_id=data.;
			*/
		//});
	}
	buscarMaterial(event){
		console.log(event);
		
		//console.log(this.templateRef);
		//TemplateRef buscarMateriales;
		
	}
	selectMaterialTable(material){
		console.log(material);
	}


	/*********************
	* validaciones
	**********************/
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
	    //console.log(re);
	    //console.log(re.test(String(email)));
	    return re.test(String(email).toLowerCase());
	}
	convertirMayuscula(str) {
		//console.log(str);
		var dato =str.control.value;
	  	dato.toUpperCase();
	  	
	  	if(str.name=='NOMBRES'){
	  		this.proveedor.nombres = dato.toUpperCase();
	  		//console.log(dato);
	  		//console.log(this.proveedor.nombres);
	  	}
	  	if(str.name=='APELLIDOS'){
	  		this.proveedor.apellidos = dato.toUpperCase();
	  	}
	}

	cargar(){
		if(this.rol_menus==1||this.rol_menus==2||this.rol_menus==3){
			this.roles_administrativos="admin";
			this.getAllMateriales();
			this.getAllProveedor();
			this.seleccionarMaterialCombo();

			this.dtOptions = {
				pagingType: 'full_numbers',
				"deferRender": true,
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

export interface Material {
  
	nombre:String;
	detalle:String;
	codigo:String;
	stock:Number;
	total:Number;
	estado:String;
	categoriasmat_id:Number;
	compras_id:Number;
}