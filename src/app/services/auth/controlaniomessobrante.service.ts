import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable, of,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GLOBAL } from '../service';

@Injectable({
  providedIn: 'root'
})
export class ControlaniomessobranteService {
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
	 * Obtener Controlaniomessobrante
	 *
	 * @param 
	 * @return List
	 */	
	getAllControlaniomessobrante(): Observable<any>{

		return this.http.get(this.url+'getAllControlaniomessobrante',this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Obtener Controlaniomessobrante por id
	 *
	 * @param 
	 * @return List
	 */	
	getIdControlaniomessobrante(Controlaniomessobrante_id): Observable<any>{
		
		return this.http.get(this.url+'getIdControlaniomessobrante/'+Controlaniomessobrante_id,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * crear Controlaniomessobrante
	 *
	 * @param 
	 * @return List
	 */	
	createControlaniomessobrante(Controlaniomessobrante): Observable<any>{
		let json=JSON.stringify(Controlaniomessobrante);
    	return this.http.post(this.url+'createControlaniomessobrante',json,this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * editar Controlaniomessobrante
	 *
	 * @param 
	 * @return List
	 */	
	editControlaniomessobrante(id,Controlaniomessobrante): Observable<any>{
		let json=JSON.stringify(Controlaniomessobrante);
    	return this.http.put(this.url+'editControlaniomessobrante/'+id,json,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Borrar Controlaniomessobrante
	 *
	 * @param 
	 * @return List
	 */	
	destroyControlaniomessobrante(id): Observable<any>{
      	
      	return this.http.delete(this.url+'destroyControlaniomessobrante/'+id,this.headers)
    	.pipe(catchError( this.handleError));
    }
    
}
