import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable, of,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GLOBAL } from '../service';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
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
	 * Obtener Roles
	 *
	 * @param 
	 * @return List
	 */	
	getAllRoles(): Observable<any>{

		return this.http.get(this.url+'getAllRoles',this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * Obtener Roles por id
	 *
	 * @param 
	 * @return List
	 */	
	getIdRoles(Roles_id): Observable<any>{
		
		return this.http.get(this.url+'getIdRoles/'+Roles_id,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * crear Roles
	 *
	 * @param 
	 * @return List
	 */	
	createRoles(Roles): Observable<any>{
		let json=JSON.stringify(Roles);
    	return this.http.post(this.url+'createRoles',json,this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * editar Roles
	 *
	 * @param 
	 * @return List
	 */	
	editRoles(id,Roles): Observable<any>{
		let json=JSON.stringify(Roles);
    	return this.http.put(this.url+'editRoles/'+id,json,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Borrar Roles
	 *
	 * @param 
	 * @return List
	 */	
	destroyRoles(id): Observable<any>{
      	
      	return this.http.delete(this.url+'destroyRoles/'+id,this.headers)
    	.pipe(catchError( this.handleError));
    }
}
