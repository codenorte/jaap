import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable, of,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GLOBAL } from '../service';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  	public url:string;
	options: any;
	//sacar datos del localStorage
	public identity;
	public foto;
	//obtener rol
	public rol_valor;
	nombre_rol:string;

	public institucion;
	public users;

	header: HttpHeaders;

	constructor(public http: HttpClient) {
		this.url=GLOBAL.url;
	}
	get headers() {
		return {
			headers: {
				'token': this.token,
				'Content-Type': 'application/json',
				'Accept': 'q=0.8;application/json;q=0.9'
			}
		}
	}
	get headerPublic() {
		return {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'q=0.8;application/json;q=0.9'
			}
		}
	}

	/**
	 * Metodo de Captura de error
	 *
	 * @param 
	 * @return text
	 */
	private handleError (error: HttpErrorResponse) {
		console.log(error.error);
	    return throwError(error);
	}

	/**
	 * Metodo de Captura de error
	 *
	 * @param 
	 * @return text
	 */
	get token(): string {
		return localStorage.getItem('token') || '';
	}

	/*--------------localstorage---------------*/
	//obtener desde localStorage el objeto usuario
	getIdentity(){
		let identity=JSON.parse(localStorage.getItem('identity'));
		if(identity!='undefined'){
			this.identity=identity;
		}
		else{
			this.identity=null;
		}
		return this.identity;
	}
	//obtener desde localStorage el token
	/*
	getToken(){
		let token=localStorage.getItem('token');
		if(token!='undefined'){
			this.token=token;
		}else{
			this.token=null;
		}
		return this.token;
	}
	*/
	//obtener desde localStorage el token
	getFoto(){
		let foto=JSON.parse(localStorage.getItem('foto'));
		if(foto!='undefined'){
			this.foto=foto;
		}else{
			this.foto=null;
		}
		return this.foto;
	}
	//obtener rol edmin - empresa
	getRol(){
		let rol_valor=localStorage.getItem('channels');
		var ss=rol_valor.split("name:Landscapes");
		if(rol_valor!='undefined'){
			this.rol_valor=ss[1];
		}else{
			this.rol_valor=null;
		}
		return parseInt(this.rol_valor);
	}
	//obtener rol edmin - empresa
	getNombreRol(){

		if(this.getRol()==1){
			this.nombre_rol = "Super-Administrador";
		}
		else if(this.getRol()==2){
			this.nombre_rol = "Administrador";
		}
		else if(this.getRol()==3){
			this.nombre_rol = "Secretario/a";
		}
		else if(this.getRol()==4){
			this.nombre_rol = "Operador";
		}
		else if(this.getRol()==5){
			this.nombre_rol = "Usuario";
		}
		else{
			this.nombre_rol = null;
		}
		return this.nombre_rol;
	}
	//obtener datos de la institucion
	getInstitucion(){
		let institucion=JSON.parse(localStorage.getItem('institucion'));
		if(institucion!='undefined'&&institucion!=null){
			this.institucion=institucion;
		}else{
			this.institucion=null;
		}
		return this.institucion;
	}
	//guardar usuarios[medidor]
	getUsuariosLocal(){
		let users=JSON.parse(localStorage.getItem('users'));
		if(users!='undefined'&&users!=null){
			this.users=users;
		}else{
			this.users=null;
		}
		return this.users;
	}

	/**
	 * Obtener User
	 *
	 * @param 
	 * @return List
	 */	
	getAllUser(): Observable<any>{

		return this.http.get(this.url+'getAllUser',this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * Obtener User
	 *
	 * @param 
	 * @return List
	 */	
	getAllUserPaginar(page?): Observable<any>{

		return this.http.get(this.url+'getAllUser?page='+page,this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * Obtener User por id
	 *
	 * @param 
	 * @return List
	 */	
	getIdUser(User_id): Observable<any>{
		
		return this.http.get(this.url+'getIdUser/'+User_id,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Obtener User por id
	 *
	 * @param 
	 * @return List
	 */	
	getUser(User_id): Observable<any>{
		
		return this.http.get(this.url+'getUser/'+User_id,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Obtener User por id
	 *
	 * @param 
	 * @return List
	 */	
	getUserHeader(): Observable<any>{
		return this.http.get(this.url+'getUserHeader',this.headers)
    	.pipe(catchError( this.handleError));
	}
	
	/**
	 * crear User
	 *
	 * @param 
	 * @return List
	 */	
	createUser(User): Observable<any>{
		let json=JSON.stringify(User);
    	return this.http.post(this.url+'createUser',json,this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * editar User
	 *
	 * @param 
	 * @return List
	 */	
	editUser(id,User): Observable<any>{
		let json=JSON.stringify(User);
    	return this.http.put(this.url+'editUser/'+id,json,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Borrar User
	 *
	 * @param 
	 * @return List
	 */	
	destroyUser(id): Observable<any>{
      	
      	return this.http.delete(this.url+'destroyUser/'+id,this.headers)
    	.pipe(catchError( this.handleError));
    }

    /**
	 * Obtener User
	 *
	 * @param 
	 * @return List
	 */	
	getAllUserTotales(): Observable<any>{

		return this.http.get(this.url+'getAllUserTotales',this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Obtener User con medidor
	 *
	 * @param 
	 * @return List
	 */	
	getAllUserMedidor(): Observable<any>{

		return this.http.get(this.url+'getAllUserMedidor',this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Obtener User con medidor
	 *
	 * @param 
	 * @return List
	 */	
	getAllUserMedidorEstado(planificacion_id): Observable<any>{

		return this.http.get(this.url+'getAllUserMedidorEstado/'+planificacion_id,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Obtener User con medidor
	 *
	 * @param 
	 * @return List
	 */	
	getAllUserMedidorEstadoActivo(): Observable<any>{

		return this.http.get(this.url+'getAllUserMedidorEstadoActivo',this.headers)
    	.pipe(catchError( this.handleError));
	}

    /**
	 * iniciar sesion
	 *
	 * @param 
	 * @return List
	 */	
	 //iniciar sesion
	login(user): Observable<any>{
		let json=JSON.stringify(user);
		
	    return this.http.post(this.url+'users/login',json, this.headerPublic)
	    .pipe(catchError(this.handleError));
	}
	/**
	 * editar User estado
	 *
	 * @param 
	 * @return List
	 */	
	actualizarEstadoUsuario(id,User): Observable<any>{
		let json=JSON.stringify(User);
    	return this.http.put(this.url+'actualizarEstadoUsuario/'+id,json,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * mostrar datos de usuario y medidor por numeromedidor
	 *
	 * @param 
	 * @return List
	 */	
	getUserMedidorNumeromedidor(numero_medidor): Observable<any>{
		
		return this.http.get(this.url+'getUserMedidorNumeromedidor/'+numero_medidor,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Obtener detallefactura por cobrar
	 *
	 * @param 
	 * @return List
	 */	
	getUserRucCi(cedula,roles_id?,estado?): Observable<any>{

		return this.http.get(this.url+'getUserRucCi/'+cedula+'/'+roles_id+'/'+estado,this.headers)
    	.pipe(catchError( this.handleError));
		
	}

	/**
	 * Obtener User administradores
	 *
	 * @param 
	 * @return List
	 */	
	getAllUserAdmin(): Observable<any>{

		return this.http.get(this.url+'getAllUserAdmin',this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * cambiar clave de usuario
	 *
	 * @param 
	 * @return List
	 */	
	actualizarClaveDeUsuario(id,User): Observable<any>{

		let json=JSON.stringify(User);
    	return this.http.put(this.url+'actualizarClaveDeUsuario/'+id,json,this.headers)
    	.pipe(catchError( this.handleError));
	}

	/**
	 * Obtener User clientes
	 *
	 * @param 
	 * @return List
	 */	
	getAllUserCliente(): Observable<any>{

		return this.http.get(this.url+'getAllUserCliente',this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * edit user agua ganaderia
	 *
	 * @param 
	 * @return List
	 */	
	editUserAguaGanaderia(id,User): Observable<any>{
		let json=JSON.stringify(User);
    	return this.http.put(this.url+'editUserAguaGanaderia/'+id,json,this.headers)
    	.pipe(catchError( this.handleError));
	}

	/**
	 * Obtener usuarios con medidor retirado y usuario sin medidor
	 *
	 * @param 
	 * @return List
	 */	
	getUserMedidorRetirado(): Observable<any>{

		return this.http.get(this.url+'getUserMedidorRetirado',this.headers)
    	.pipe(catchError( this.handleError));
	}
}
