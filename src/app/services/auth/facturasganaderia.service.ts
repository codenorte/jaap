import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable, of,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GLOBAL } from '../service';

@Injectable({
  providedIn: 'root'
})
export class FacturasganaderiaService {

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
	 * realizar pago de la facturaganaderia
	 *
	 * @param 
	 * @return List
	 */	
	realizarPagoFacturaGanaderia(dato_array): Observable<any>{

		let json=JSON.stringify(dato_array);
		//console.log(json);
    	return this.http.post(this.url+'realizarPagoFacturaGanaderia',json,this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * Historial de pagos de agua ganaderia
	 *
	 * @param 
	 * @return List
	 */	
	historialFacturaGanaderia(IDAGUAGANADERIA): Observable<any>{
		
		return this.http.get(this.url+'historialFacturaGanaderia/'+IDAGUAGANADERIA,this.headers)
    	.pipe(catchError( this.handleError));
	}
}
