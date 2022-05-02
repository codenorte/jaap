import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable, of,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GLOBAL } from '../service';

@Injectable({
  providedIn: 'root'
})
export class MaterialesService {

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
	getAllMateriales(): Observable<any>{

		return this.http.get(this.url+'getAllMateriales',this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Obtener Materiales por id
	 *
	 * @param 
	 * @return List
	 */	
	getIdMateriales(Materiales_id): Observable<any>{
		
		return this.http.get(this.url+'getIdMateriales/'+Materiales_id,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * crear Materiales
	 *
	 * @param 
	 * @return List
	 */	
	createMateriales(Materiales): Observable<any>{
		let json=JSON.stringify(Materiales);
    	return this.http.post(this.url+'createMateriales',json,this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * editar Materiales
	 *
	 * @param 
	 * @return List
	 */	
	editMateriales(id,Materiales): Observable<any>{
		let json=JSON.stringify(Materiales);
    	return this.http.put(this.url+'editMateriales/'+id,json,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Borrar Materiales
	 *
	 * @param 
	 * @return List
	 */	
	destroyMateriales(id): Observable<any>{
      	
      	return this.http.delete(this.url+'destroyMateriales/'+id,this.headers)
    	.pipe(catchError( this.handleError));
    }

    /**
	 * buscar materiales por nombre y codigo
	 *
	 * @param 
	 * @return List
	 */	
	buscarNombreMateriales(Materiales_nombre): Observable<any>{
		
		return this.http.get(this.url+'buscarNombreMateriales/'+Materiales_nombre,this.headers)
    	.pipe(catchError( this.handleError));
	}

	
}
