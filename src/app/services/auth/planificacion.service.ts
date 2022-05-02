import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable, of,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GLOBAL } from '../service';

@Injectable({
  providedIn: 'root'
})
export class PlanificacionService {
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
	 * Obtener Planificacion
	 *
	 * @param 
	 * @return List
	 */	
	getAllPlanificacion(): Observable<any>{

		return this.http.get(this.url+'getAllPlanificacion',this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * Obtener Planificacion por id
	 *
	 * @param 
	 * @return List
	 */	
	getIdPlanificacion(Planificacion_id): Observable<any>{
		
		return this.http.get(this.url+'getIdPlanificacion/'+Planificacion_id,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * crear Planificacion
	 *
	 * @param 
	 * @return List
	 */	
	createPlanificacion(Planificacion): Observable<any>{
		let json=JSON.stringify(Planificacion);
    	return this.http.post(this.url+'createPlanificacion',json,this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * editar Planificacion
	 *
	 * @param 
	 * @return List
	 */	
	editPlanificacion(id,Planificacion): Observable<any>{
		let json=JSON.stringify(Planificacion);
    	return this.http.put(this.url+'editPlanificacion/'+id,json,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Borrar Planificacion
	 *
	 * @param 
	 * @return List
	 */	
	destroyPlanificacion(id): Observable<any>{
      	
      	return this.http.delete(this.url+'destroyPlanificacion/'+id,this.headers)
    	.pipe(catchError( this.handleError));
    }

    /**
	 * cambia de estado revisando el tiempo de caducidad 
	 *
	 * @param 
	 * @return
	 */	
	caducarPlanificacionEstado(): Observable<any>{

		return this.http.get(this.url+'caducarPlanificacionEstado',this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	 /**
	 * Crear Planificacion con todos los medidores activos se registra como NO ASISTIDO a la minga
	 *
	 * @param 
	 * @return
	 */	
	createPlanificacionAllUser(planificacion_id,planificacion_array): Observable<any>{
		console.log(planificacion_array);
		let json=JSON.stringify(planificacion_array);
		return this.http.put(this.url+'createPlanificacionAllUser/'+planificacion_id,json,this.headers)
    	.pipe(catchError( this.handleError));
		
	}
}
