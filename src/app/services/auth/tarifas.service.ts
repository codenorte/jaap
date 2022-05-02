import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable, of,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GLOBAL } from '../service';

@Injectable({
  providedIn: 'root'
})
export class TarifasService {
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
	 * Obtener Tarifas
	 *
	 * @param 
	 * @return List
	 */	
	getAllTarifas(): Observable<any>{

		return this.http.get(this.url+'getAllTarifas',this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * Obtener Tarifas por id
	 *
	 * @param 
	 * @return List
	 */	
	getIdTarifas(Tarifas_id): Observable<any>{
		
		return this.http.get(this.url+'getIdTarifas/'+Tarifas_id,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * crear Tarifas
	 *
	 * @param 
	 * @return List
	 */	
	createTarifas(Tarifas): Observable<any>{
		let json=JSON.stringify(Tarifas);
    	return this.http.post(this.url+'createTarifas',json,this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * editar Tarifas
	 *
	 * @param 
	 * @return List
	 */	
	editTarifas(id,Tarifas): Observable<any>{
		let json=JSON.stringify(Tarifas);
    	return this.http.put(this.url+'editTarifas/'+id,json,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Borrar Tarifas
	 *
	 * @param 
	 * @return List
	 */	
	destroyTarifas(id): Observable<any>{
      	
      	return this.http.delete(this.url+'destroyTarifas/'+id,this.headers)
    	.pipe(catchError( this.handleError));
    }
}
