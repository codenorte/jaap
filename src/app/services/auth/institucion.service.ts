import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable, of,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GLOBAL } from '../service';

@Injectable({
  providedIn: 'root'
})
export class InstitucionService {

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
	 * Obtener Institucion
	 *
	 * @param 
	 * @return List
	 */	
	getAllInstitucion(): Observable<any>{

		return this.http.get(this.url+'getAllInstitucion',this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * Obtener Institucion por id
	 *
	 * @param 
	 * @return List
	 */	
	getIdInstitucion(Institucion_id): Observable<any>{
		
		return this.http.get(this.url+'getIdInstitucion/'+Institucion_id,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * crear Institucion
	 *
	 * @param 
	 * @return List
	 */	
	createInstitucion(Institucion): Observable<any>{
		let json=JSON.stringify(Institucion);
    	return this.http.post(this.url+'createInstitucion',json,this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * editar Institucion
	 *
	 * @param 
	 * @return List
	 */	
	editInstitucion(id,Institucion): Observable<any>{
		let json=JSON.stringify(Institucion);
    	return this.http.put(this.url+'editInstitucion/'+id,json,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Borrar Institucion
	 *
	 * @param 
	 * @return List
	 */	
	destroyInstitucion(id): Observable<any>{
      	
      	return this.http.delete(this.url+'destroyInstitucion/'+id,this.headers)
    	.pipe(catchError( this.handleError));
    }
}
