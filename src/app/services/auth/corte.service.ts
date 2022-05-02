import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable, of,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GLOBAL } from '../service';

@Injectable({
  providedIn: 'root'
})
export class CorteService {

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
	 * Obtener Corte
	 *
	 * @param 
	 * @return List
	 */	
	getAllCorte(): Observable<any>{

		return this.http.get(this.url+'getAllCorte',this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Obtener Corte por id
	 *
	 * @param 
	 * @return List
	 */	
	getIdCorte(Corte_id): Observable<any>{
		
		return this.http.get(this.url+'getIdCorte/'+Corte_id,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * crear Corte
	 *
	 * @param 
	 * @return List
	 */	
	createCorte(Corte): Observable<any>{
		let json=JSON.stringify(Corte);
    	return this.http.post(this.url+'createCorte',json,this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * editar Corte
	 *
	 * @param 
	 * @return List
	 */	
	editCorte(id,Corte): Observable<any>{
		let json=JSON.stringify(Corte);
    	return this.http.put(this.url+'editCorte/'+id,json,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Borrar Corte
	 *
	 * @param 
	 * @return List
	 */	
	destroyCorte(id): Observable<any>{
      	
      	return this.http.delete(this.url+'destroyCorte/'+id,this.headers)
    	.pipe(catchError( this.handleError));
    }
    
    /**
	 * Obtener Corte por IDMEDIDOR
	 *
	 * @param 
	 * @return List
	 */	
	getCorteporMedidor(IDMEDIDOR): Observable<any>{
		
		return this.http.get(this.url+'getCorteporMedidor/'+IDMEDIDOR,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Buscar cortes por CODIGO
	 *
	 * @param 
	 * @return List
	 */	
	getCorteporMedidorCodigo(CODIGO): Observable<any>{
		
		return this.http.get(this.url+'getCorteporMedidorCodigo/'+CODIGO,this.headers)
    	.pipe(catchError( this.handleError));
	}

	/**
	 * Obtener lista de usuarios con reconexion
	 *
	 * @param 
	 * @return List
	 */	
	getAllCorteUser(): Observable<any>{

		return this.http.get(this.url+'getAllCorteUser',this.headers)
    	.pipe(catchError( this.handleError));
	}
}
