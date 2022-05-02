import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable, of,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GLOBAL } from '../service';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

	public url:string;
	options: any;
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
	/**
	 * Obtener Proveedor
	 *
	 * @param 
	 * @return List
	 */	
	getAllProveedor(): Observable<any>{

		return this.http.get(this.url+'getAllProveedor',this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * Obtener Proveedor por id
	 *
	 * @param 
	 * @return List
	 */	
	getIdProveedor(Proveedor_id): Observable<any>{
		
		return this.http.get(this.url+'getIdProveedor/'+Proveedor_id,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * crear Proveedor
	 *
	 * @param 
	 * @return List
	 */	
	createProveedor(Proveedor): Observable<any>{
		let json=JSON.stringify(Proveedor);
    	return this.http.post(this.url+'createProveedor',json,this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * editar Proveedor
	 *
	 * @param 
	 * @return List
	 */	
	editProveedor(id,Proveedor): Observable<any>{
		let json=JSON.stringify(Proveedor);
    	return this.http.put(this.url+'editProveedor/'+id,json,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Borrar Proveedor
	 *
	 * @param 
	 * @return List
	 */	
	destroyProveedor(id): Observable<any>{
      	
      	return this.http.delete(this.url+'destroyProveedor/'+id,this.headers)
    	.pipe(catchError( this.handleError));
    }
    /**
	 * Obtener Proveedor por cedula
	 *
	 * @param 
	 * @return List
	 */	
	getCedulaProveedor(cedula_proveedor): Observable<any>{
		
		return this.http.get(this.url+'getCedulaProveedor/'+cedula_proveedor,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Obtener totales de proveedores
	 *
	 * @param 
	 * @return List
	 */	
	getTotalProveedores(): Observable<any>{

		return this.http.get(this.url+'getTotalProveedores',this.headers)
    	.pipe(catchError( this.handleError));
		
	}
}
