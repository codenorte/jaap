import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable, of,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GLOBAL } from '../service';

@Injectable({
  providedIn: 'root'
})
export class OtrospagosService {
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
	 * Obtener Otrospagos
	 *
	 * @param 
	 * @return List
	 */	
	getAllOtrospagos(): Observable<any>{

		return this.http.get(this.url+'getAllOtrospagos',this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Obtener Otrospagos por id
	 *
	 * @param 
	 * @return List
	 */	
	getIdOtrospagos(Otrospagos_id): Observable<any>{
		
		return this.http.get(this.url+'getIdOtrospagos/'+Otrospagos_id,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * crear Otrospagos
	 *
	 * @param 
	 * @return List
	 */	
	createOtrospagos(Otrospagos,IDFACTURA): Observable<any>{
		console.log(Otrospagos);
		let json=JSON.stringify(Otrospagos);
    	return this.http.post(this.url+'createOtrospagos/'+IDFACTURA,json,this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * editar Otrospagos
	 *
	 * @param 
	 * @return List
	 */	
	editOtrospagos(id,Otrospagos): Observable<any>{
		let json=JSON.stringify(Otrospagos);
    	return this.http.put(this.url+'editOtrospagos/'+id,json,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Borrar Otrospagos
	 *
	 * @param 
	 * @return List
	 */	
	destroyOtrospagos(id): Observable<any>{
      	
      	return this.http.delete(this.url+'destroyOtrospagos/'+id,this.headers)
    	.pipe(catchError( this.handleError));
    }
}
