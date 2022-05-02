import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable, of,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GLOBAL } from '../service';

@Injectable({
  providedIn: 'root'
})
export class AguasobranteService {
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
	 * Obtener Aguasobrante
	 *
	 * @param 
	 * @return List
	 */	
	getAllAguasobrante(): Observable<any>{

		return this.http.get(this.url+'getAllAguasobrante',this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * Obtener Aguasobrante por id
	 *
	 * @param 
	 * @return List
	 */	
	getIdAguasobrante(Aguasobrante_id): Observable<any>{
		
		return this.http.get(this.url+'getIdAguasobrante/'+Aguasobrante_id,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * crear Aguasobrante
	 *
	 * @param 
	 * @return List
	 */	
	createAguasobrante(Aguasobrante): Observable<any>{
		let json=JSON.stringify(Aguasobrante);
    	return this.http.post(this.url+'createAguasobrante',json,this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * editar Aguasobrante
	 *
	 * @param 
	 * @return List
	 */	
	editAguasobrante(id,Aguasobrante): Observable<any>{
		let json=JSON.stringify(Aguasobrante);
    	return this.http.put(this.url+'editAguasobrante/'+id,json,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Borrar Aguasobrante
	 *
	 * @param 
	 * @return List
	 */	
	destroyAguasobrante(id): Observable<any>{
      	
      	return this.http.delete(this.url+'destroyAguasobrante/'+id,this.headers)
    	.pipe(catchError( this.handleError));
    }
    /**
	 * Obtener totales Aguasobrante
	 *
	 * @param 
	 * @return List
	 */	
	getAllAguasobranteTotales(): Observable<any>{

		return this.http.get(this.url+'getAllAguasobranteTotales',this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * mostrar Aguasobrante por user
	 *
	 * @param 
	 * @return List
	 */	
	getAllUserAguasobrante(): Observable<any>{
		
		return this.http.get(this.url+'getAllUserAguasobrante',this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * mostrar lista de usuarios registrados para detallefacturasobrante
	 *
	 * @param 
	 * @return List
	 */	
	getIdControlAguasobrante(controlaguasobrante_id): Observable<any>{
		
		return this.http.get(this.url+'getIdControlAguasobrante/'+controlaguasobrante_id,this.headers)
    	.pipe(catchError( this.handleError));
	}
}
