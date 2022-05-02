import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable, of,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GLOBAL } from '../service';

@Injectable({
  providedIn: 'root'
})
export class ControlaniomesganaderiaService {
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
	 * Obtener Controlaniomesganaderia
	 *
	 * @param 
	 * @return List
	 */	
	getAllControlaniomesganaderia(): Observable<any>{

		return this.http.get(this.url+'getAllControlaniomesganaderia',this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Obtener Controlaniomesganaderia por id
	 *
	 * @param 
	 * @return List
	 */	
	getIdControlaniomesganaderia(Controlaniomesganaderia_id): Observable<any>{
		
		return this.http.get(this.url+'getIdControlaniomesganaderia/'+Controlaniomesganaderia_id,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * crear Controlaniomesganaderia
	 *
	 * @param 
	 * @return List
	 */	
	createControlaniomesganaderia(Controlaniomesganaderia): Observable<any>{
		let json=JSON.stringify(Controlaniomesganaderia);
    	return this.http.post(this.url+'createControlaniomesganaderia',json,this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * editar Controlaniomesganaderia
	 *
	 * @param 
	 * @return List
	 */	
	editControlaniomesganaderia(id,Controlaniomesganaderia): Observable<any>{
		let json=JSON.stringify(Controlaniomesganaderia);
    	return this.http.put(this.url+'editControlaniomesganaderia/'+id,json,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Borrar Controlaniomesganaderia
	 *
	 * @param 
	 * @return List
	 */	
	destroyControlaniomesganaderia(id): Observable<any>{
      	
      	return this.http.delete(this.url+'destroyControlaniomesganaderia/'+id,this.headers)
    	.pipe(catchError( this.handleError));
    }

    /**
	 * Obtener anio descentetemente aguaganaderia
	 *
	 * @param 
	 * @return List
	 */	
	getAllContrlaniomesDescencenteGanaderia(): Observable<any>{

		return this.http.get(this.url+'getAllContrlaniomesDescencenteGanaderia',this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Obtener anio descentetemente aguaganaderia
	 *
	 * @param 
	 * @return List
	 */	
	getAllControlaniomesDescencenteInicioFinGanaderia(desde): Observable<any>{

		return this.http.get(this.url+'getAllControlaniomesDescencenteInicioFinGanaderia/'+desde,this.headers)
    	.pipe(catchError( this.handleError));
	}
    
}
