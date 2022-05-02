import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable, of,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GLOBAL } from '../service';


@Injectable({
  providedIn: 'root'
})
export class MedidorService {

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
	 * Obtener Medidor
	 *
	 * @param 
	 * @return List
	 */	
	getAllMedidor(): Observable<any>{

		return this.http.get(this.url+'getAllMedidor',this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * Obtener Medidor por id
	 *
	 * @param 
	 * @return List
	 */	
	getIdMedidor(Medidor_id): Observable<any>{
		
		return this.http.get(this.url+'getIdMedidor/'+Medidor_id,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * crear Medidor
	 *
	 * @param 
	 * @return List
	 */	
	createMedidor(Medidor): Observable<any>{
		let json=JSON.stringify(Medidor);
    	return this.http.post(this.url+'createMedidor',json,this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * editar Medidor
	 *
	 * @param 
	 * @return List
	 */	
	editMedidor(id,Medidor): Observable<any>{
		let json=JSON.stringify(Medidor);
    	return this.http.put(this.url+'editMedidor/'+id,json,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Borrar Medidor
	 *
	 * @param 
	 * @return List
	 */	
	destroyMedidor(id): Observable<any>{
      	
      	return this.http.delete(this.url+'destroyMedidor/'+id,this.headers)
    	.pipe(catchError( this.handleError));
    }
    /**
	 * Obtener Medidor por id
	 *
	 * @param 
	 * @return List
	 */	
	getMedidorIdUsers(users_id): Observable<any>{
		
		return this.http.get(this.url+'getMedidorIdUsers/'+users_id,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Obtener Medidor y User por medidor_id
	 *
	 * @param 
	 * @return List
	 */	
	getIdMedidorUser(Medidor_id): Observable<any>{
		
		return this.http.get(this.url+'getIdMedidorUser/'+Medidor_id,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * mostrar Medidor y User por codigo
	 *
	 * @param 
	 * @return List
	 */	
	getIdMedidorUserCodigo(codigo): Observable<any>{
		
		return this.http.get(this.url+'getIdMedidorUserCodigo/'+codigo,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Obtener Medidor y User por medidor_id
	 *
	 * @param 
	 * @return List
	 */	
	getIdMedidorUserIdmedidor(Medidor_id): Observable<any>{
		
		return this.http.get(this.url+'getIdMedidorUserIdmedidor/'+Medidor_id,this.headers)
    	.pipe(catchError( this.handleError));
	}

	/**
	 * Obtener Medidor por id
	 *
	 * @param 
	 * @return List
	 */	
	createPDF(): Observable<any>{
		
		return this.http.get(this.url+'createPDF/pdf',this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Obtener Medidor
	 *
	 * @param 
	 * @return List
	 */	
	getAllMedidorUser(): Observable<any>{

		return this.http.get(this.url+'getAllMedidorUser',this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * editar codigo de medidor
	 *
	 * @param 
	 * @return List
	 */	
	updateCodigoMedidor(numero_medidor,Medidor): Observable<any>{
		let json=JSON.stringify(Medidor);
    	return this.http.put(this.url+'updateCodigoMedidor/'+numero_medidor,json,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * editar codigo de medidor
	 *
	 * @param 
	 * @return List
	 */	
	editMedidorEstado(IDUSUARIO,Medidor): Observable<any>{
		let json=JSON.stringify(Medidor);
    	return this.http.put(this.url+'editMedidorEstado/'+IDUSUARIO,json,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Obtener Medidor
	 *
	 * @param 
	 * @return List
	 */	
	getCodigoMedidorDisponible(): Observable<any>{

		return this.http.get(this.url+'getCodigoMedidorDisponible',this.headers)
    	.pipe(catchError( this.handleError));
		
	}

	/**
	 * Realizar pago de instalacion
	 *
	 * @param 
	 * @return List
	 */	
	realizarPagoInstalacion(IDMEDIDOR,Medidor): Observable<any>{
		let json=JSON.stringify(Medidor);
    	return this.http.put(this.url+'realizarPagoInstalacion/'+IDMEDIDOR,json,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * mostrar Medidores activos y user
	 *
	 * @param 
	 * @return List
	 */	
	getAllMedidorUserActivo(): Observable<any>{

		return this.http.get(this.url+'getAllMedidorUserActivo',this.headers)
    	.pipe(catchError( this.handleError));
		
	}
}
