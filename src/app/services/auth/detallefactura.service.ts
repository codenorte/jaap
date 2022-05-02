import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable, of,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GLOBAL } from '../service';


@Injectable({
  providedIn: 'root'
})
export class DetallefacturaService {

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
	 * Obtener historial total de consumo
	 *
	 * @param 
	 * @return List
	 */	
	getAllDetallefacturaNumMedidor(numero_medidor): Observable<any>{

		return this.http.get(this.url+'getAllDetallefacturaNumMedidor/'+numero_medidor,this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * Obtener historial consumo
	 *
	 * @param 
	 * @return List
	 */	
	getHistorialConsumo(numero_medidor): Observable<any>{

		return this.http.get(this.url+'getHistorialConsumo/'+numero_medidor,this.headers)
    	.pipe(catchError( this.handleError));
		
	}

	/**
	 * Crear detallefactura - Registrar consumo
	 *
	 * @param 
	 * @return List
	 */	
	createDetallefactura(detallefactura): Observable<any>{
		let json=JSON.stringify(detallefactura);
		
	    return this.http.post(this.url+'createDetallefactura',json, this.headers)
	    .pipe(catchError(this.handleError));
	}
	/**
	 * Crear detallefactura - Registrar consumo
	 *
	 * @param 
	 * @return List
	 */	
	editDetallefactura(detallefactura,id_detallefactura): Observable<any>{
		let json=JSON.stringify(detallefactura);
		
	    return this.http.put(this.url+'editDetallefactura/'+id_detallefactura,json, this.headers)
	    .pipe(catchError(this.handleError));
	}
	/**
	 * Obtener 5 ultimos registros de un usuario por NUMEDIDOR
	 *
	 * @param 
	 * @return List
	 */	
	getUltimosRegistrosDet(IDMEDIDOR): Observable<any>{

		return this.http.get(this.url+'getUltimosRegistrosDet/'+IDMEDIDOR,this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * Obtener detallefactura por cobrar
	 *
	 * @param 
	 * @return List
	 */	
	getDetallefacturaNumMedidor(numero_medidor): Observable<any>{

		return this.http.get(this.url+'getDetallefacturaNumMedidor/'+numero_medidor,this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * Obtener detallefactura por cobrar por idmedidor
	 *
	 * @param 
	 * @return List
	 */	
	getDetallefacturaIdmedidor(IDMEDIDOR): Observable<any>{

		return this.http.get(this.url+'getDetallefacturaIdmedidor/'+IDMEDIDOR,this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * lista de facturas pendientes por pagar, buscar por codigo
	 *
	 * @param 
	 * @return List
	 */	
	getDetallefacturaCodigo(codigo): Observable<any>{

		return this.http.get(this.url+'getDetallefacturaCodigo/'+codigo,this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	
	/**
	 * obtener lista de detallefactura con lectura y sin lectura controlando el año
	 *
	 * @param 
	 * @return List
	 */	
	getDetallefacturasinlectura(controlaniomes_id): Observable<any>{

		return this.http.get(this.url+'getDetallefacturasinlectura/'+controlaniomes_id,this.headers)
    	.pipe(catchError( this.handleError));
		
	}

	/**
	 * Obtener lista de usuarios con la suma de meses que debe
	 *
	 * @param 
	 * @return List
	 */	
	getCountDetallefacturaPorCobrar(): Observable<any>{

		return this.http.get(this.url+'getCountDetallefacturaPorCobrar',this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * Calcular cobro mensual
	 *
	 * @param 
	 * @return List
	 */	
	obtenerCobroMensual(aniomes_inicio,aniomes_fin?): Observable<any>{

		return this.http.get(this.url+'obtenerCobroMensual/'+aniomes_inicio+'/'+aniomes_fin,this.headers)
    	.pipe(catchError( this.handleError));
		
	}
}
