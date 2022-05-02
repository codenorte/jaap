import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable, of,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GLOBAL } from '../service';

@Injectable({
  providedIn: 'root'
})
export class DetallefacturaganaderiaService {
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
	 * Obtener Detallefacturaganaderia
	 *
	 * @param 
	 * @return List
	 */	
	getAllDetallefacturaganaderia(): Observable<any>{

		return this.http.get(this.url+'getAllDetallefacturaganaderia',this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * Obtener Detallefacturaganaderia por id
	 *
	 * @param 
	 * @return List
	 */	
	getIdDetallefacturaganaderia(Detallefacturaganaderia_id): Observable<any>{
		
		return this.http.get(this.url+'getIdDetallefacturaganaderia/'+Detallefacturaganaderia_id,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * crear Detallefacturaganaderia
	 *
	 * @param 
	 * @return List
	 */	
	createDetallefacturaganaderia(controlanionesganaderia_id,Detallefacturaganaderia): Observable<any>{
		let json=JSON.stringify(Detallefacturaganaderia);
    	return this.http.post(this.url+'createDetallefacturaganaderia/'+controlanionesganaderia_id,json,this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * editar Detallefacturaganaderia
	 *
	 * @param 
	 * @return List
	 */	
	editDetallefacturaganaderia(id,Detallefacturaganaderia): Observable<any>{
		let json=JSON.stringify(Detallefacturaganaderia);
    	return this.http.put(this.url+'editDetallefacturaganaderia/'+id,json,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Borrar Detallefacturaganaderia
	 *
	 * @param 
	 * @return List
	 */	
	destroyDetallefacturaganaderia(id): Observable<any>{
      	
      	return this.http.delete(this.url+'destroyDetallefacturaganaderia/'+id,this.headers)
    	.pipe(catchError( this.handleError));
    }
    /**
     * Crear todas las facturas de la lista
     *
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse
     */
     createAllDetallefacturaganaderia(controlaniomesganaderia_id): Observable<any>{
		
		return this.http.get(this.url+'createAllDetallefacturaganaderia/'+controlaniomesganaderia_id,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
     * Obtener lista de facturas detalleganaderia
     *
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse
     */
     getDetallefacturaganaderia(aguaganaderia_id): Observable<any>{
		
		return this.http.get(this.url+'getDetallefacturaganaderia/'+aguaganaderia_id,this.headers)
    	.pipe(catchError( this.handleError));
	}

	/**
	 * Calcular cobro mensual
	 *
	 * @param 
	 * @return List
	 */	
	obtenerCobroMensualGanaderia(aniomes_inicio,aniomes_fin?): Observable<any>{

		return this.http.get(this.url+'obtenerCobroMensualGanaderia/'+aniomes_inicio+'/'+aniomes_fin,this.headers)
    	.pipe(catchError( this.handleError));
		
	}
    
}
