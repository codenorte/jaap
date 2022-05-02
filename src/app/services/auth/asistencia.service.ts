import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable, of,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GLOBAL } from '../service';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
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
	 * Obtener Asistencia
	 *
	 * @param 
	 * @return List
	 */	
	getAllAsistencia(): Observable<any>{

		return this.http.get(this.url+'getAllAsistencia',this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * Obtener Asistencia por id
	 *
	 * @param 
	 * @return List
	 */	
	getIdAsistencia(Asistencia_id): Observable<any>{
		
		return this.http.get(this.url+'getIdAsistencia/'+Asistencia_id,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * crear Asistencia
	 *
	 * @param 
	 * @return List
	 */	
	createAsistencia(Asistencia): Observable<any>{
		let json=JSON.stringify(Asistencia);
    	return this.http.post(this.url+'createAsistencia',json,this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * editar Asistencia
	 *
	 * @param 
	 * @return List
	 */	
	editAsistencia(id,Asistencia): Observable<any>{
		let json=JSON.stringify(Asistencia);
    	return this.http.put(this.url+'editAsistencia/'+id,json,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Borrar Asistencia
	 *
	 * @param 
	 * @return List
	 */	
	destroyAsistencia(id): Observable<any>{
      	
      	return this.http.delete(this.url+'destroyAsistencia/'+id,this.headers)
    	.pipe(catchError( this.handleError));
    }

    /**
	 * Obtener lista de usuarios
	 *
	 * @param 
	 * @return List
	 */	
	getIdAsistenciaMedidorUsers(planificacion_id): Observable<any>{
		
		return this.http.get(this.url+'getIdAsistenciaMedidorUsers/'+planificacion_id,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Registrar asistencia, cambio de estado 
	 *
	 * @param 
	 * @return List
	 */	
	registrarAsistencia(planificacion_id, Asistencia): Observable<any>{
		let json=JSON.stringify(Asistencia);
    	return this.http.put(this.url+'registrarAsistencia/'+planificacion_id,json,this.headers)
    	.pipe(catchError( this.handleError));
	}

	/**
	 * Buscar multas de mingas
	 *
	 * @param 
	 * @return List
	 */	
	buscarMingasUsuarioId(IDMEDIDOR): Observable<any>{
		
		return this.http.get(this.url+'buscarMingasUsuarioId/'+IDMEDIDOR,this.headers)
    	.pipe(catchError( this.handleError));
	}
}
