import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable, of,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GLOBAL } from '../service';

@Injectable({
  providedIn: 'root'
})
export class DetallefacturasobranteService {
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
	 * Obtener Detallefacturasobrante
	 *
	 * @param 
	 * @return List
	 */	
	getAllDetallefacturasobrante(): Observable<any>{

		return this.http.get(this.url+'getAllDetallefacturasobrante',this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * Obtener Detallefacturasobrante por id
	 *
	 * @param 
	 * @return List
	 */	
	getIdDetallefacturasobrante(Detallefacturasobrante_id): Observable<any>{
		
		return this.http.get(this.url+'getIdDetallefacturasobrante/'+Detallefacturasobrante_id,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * crear Detallefacturasobrante
	 *
	 * @param 
	 * @return List
	 */	
	createDetallefacturasobrante(controlanionessobrante_id,Detallefacturasobrante): Observable<any>{
		let json=JSON.stringify(Detallefacturasobrante);
    	return this.http.post(this.url+'createDetallefacturasobrante/'+controlanionessobrante_id,json,this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * editar Detallefacturasobrante
	 *
	 * @param 
	 * @return List
	 */	
	editDetallefacturasobrante(id,Detallefacturasobrante): Observable<any>{
		let json=JSON.stringify(Detallefacturasobrante);
    	return this.http.put(this.url+'editDetallefacturasobrante/'+id,json,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Borrar Detallefacturasobrante
	 *
	 * @param 
	 * @return List
	 */	
	destroyDetallefacturasobrante(id): Observable<any>{
      	
      	return this.http.delete(this.url+'destroyDetallefacturasobrante/'+id,this.headers)
    	.pipe(catchError( this.handleError));
    }

    /**
     * Obtener lista de facturas detallesobrante
     *
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse
     */
     getDetallefacturasobrante(aguasobrante_id): Observable<any>{
		
		return this.http.get(this.url+'getDetallefacturasobrante/'+aguasobrante_id,this.headers)
    	.pipe(catchError( this.handleError));
	}
}
