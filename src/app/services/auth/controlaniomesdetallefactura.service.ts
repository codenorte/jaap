import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable, of,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GLOBAL } from '../service';

@Injectable({
  providedIn: 'root'
})
export class ControlaniomesdetallefacturaService {

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
	 * Obtener Controlaniomesdetallefactura
	 *
	 * @param 
	 * @return List
	 */	
	getAllControlaniomesdetallefactura(): Observable<any>{

		return this.http.get(this.url+'getAllControlaniomesdetallefactura',this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * Obtener Controlaniomesdetallefactura por id
	 *
	 * @param 
	 * @return List
	 */	
	getIdControlaniomesdetallefactura(Controlaniomesdetallefactura_id): Observable<any>{
		
		return this.http.get(this.url+'getIdControlaniomesdetallefactura/'+Controlaniomesdetallefactura_id,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * crear Controlaniomesdetallefactura
	 *
	 * @param 
	 * @return List
	 */	
	createControlaniomesdetallefactura(Controlaniomesdetallefactura): Observable<any>{
		let json=JSON.stringify(Controlaniomesdetallefactura);
    	return this.http.post(this.url+'createControlaniomesdetallefactura',json,this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * editar Controlaniomesdetallefactura
	 *
	 * @param 
	 * @return List
	 */	
	editControlaniomesdetallefactura(id,Controlaniomesdetallefactura): Observable<any>{
		let json=JSON.stringify(Controlaniomesdetallefactura);
    	return this.http.put(this.url+'editControlaniomesdetallefactura/'+id,json,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Borrar Controlaniomesdetallefactura
	 *
	 * @param 
	 * @return List
	 */	
	destroyControlaniomesdetallefactura(id): Observable<any>{
      	
      	return this.http.delete(this.url+'destroyControlaniomesdetallefactura/'+id,this.headers)
    	.pipe(catchError( this.handleError));
    }

    /**
	 * obtener lista de medidores con factura y detallefactura por cobrar - detallecontrolaniomes
	 *
	 * @param 
	 * @return List
	 */	
	getControlaniomesIdDetalle(controlaniomes_id): Observable<any>{

		return this.http.get(this.url+'getControlaniomesIdDetalle/'+controlaniomes_id,this.headers)
    	.pipe(catchError( this.handleError));
		
	}

	/**
	 * Obtener anio descentetemente
	 *
	 * @param 
	 * @return List
	 */	
	getAllContrlaniomesDescencente(): Observable<any>{

		return this.http.get(this.url+'getAllContrlaniomesDescencente',this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * Obtener anio descentetemente con parametro desde inicial hasta fin
	 *
	 * @param 
	 * @return List
	 */	
	getAllControlaniomesDescencenteInicioFin(desde): Observable<any>{

		return this.http.get(this.url+'getAllControlaniomesDescencenteInicioFin/'+desde,this.headers)
    	.pipe(catchError( this.handleError));
		
	}

}
