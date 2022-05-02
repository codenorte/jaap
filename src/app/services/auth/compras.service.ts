import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable, of,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GLOBAL } from '../service';


@Injectable({
  providedIn: 'root'
})
export class ComprasService {

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
	 * Obtener Compra
	 *
	 * @param 
	 * @return List
	 */	
	getAllCompra(): Observable<any>{

		return this.http.get(this.url+'getAllCompra',this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Obtener Compra por id
	 *
	 * @param 
	 * @return List
	 */	
	getIdCompra(Compra_id): Observable<any>{
		
		return this.http.get(this.url+'getIdCompra/'+Compra_id,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * crear Compra
	 *
	 * @param 
	 * @return List
	 */	
	createCompra(Compra): Observable<any>{
		let json=JSON.stringify(Compra);
    	return this.http.post(this.url+'createCompra',json,this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * editar Compra
	 *
	 * @param 
	 * @return List
	 */	
	editCompra(id,Compra): Observable<any>{
		let json=JSON.stringify(Compra);
    	return this.http.put(this.url+'editCompra/'+id,json,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Borrar Compra
	 *
	 * @param 
	 * @return List
	 */	
	destroyCompra(id): Observable<any>{
      	
      	return this.http.delete(this.url+'destroyCompra/'+id,this.headers)
    	.pipe(catchError( this.handleError));
    }
}
