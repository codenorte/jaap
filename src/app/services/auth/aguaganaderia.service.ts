import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable, of,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GLOBAL } from '../service';

@Injectable({
  providedIn: 'root'
})
export class AguaganaderiaService {

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
	 * Obtener Aguaganaderia
	 *
	 * @param 
	 * @return List
	 */	
	getAllAguaganaderia(): Observable<any>{

		return this.http.get(this.url+'getAllAguaganaderia',this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * Obtener Aguaganaderia por id
	 *
	 * @param 
	 * @return List
	 */	
	getIdAguaganaderia(Aguaganaderia_id): Observable<any>{
		
		return this.http.get(this.url+'getIdAguaganaderia/'+Aguaganaderia_id,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * crear Aguaganaderia
	 *
	 * @param 
	 * @return List
	 */	
	createAguaganaderia(Aguaganaderia): Observable<any>{
		let json=JSON.stringify(Aguaganaderia);
    	return this.http.post(this.url+'createAguaganaderia',json,this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * editar Aguaganaderia
	 *
	 * @param 
	 * @return List
	 */	
	editAguaganaderia(id,Aguaganaderia): Observable<any>{
		let json=JSON.stringify(Aguaganaderia);
    	return this.http.put(this.url+'editAguaganaderia/'+id,json,this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * Borrar Aguaganaderia
	 *
	 * @param 
	 * @return List
	 */	
	destroyAguaganaderia(id): Observable<any>{
      	
      	return this.http.delete(this.url+'destroyAguaganaderia/'+id,this.headers)
    	.pipe(catchError( this.handleError));
    }
    /**
	 * Obtener totales Aguaganaderia
	 *
	 * @param 
	 * @return List
	 */	
	getAllAguaganaderiaTotales(): Observable<any>{

		return this.http.get(this.url+'getAllAguaganaderiaTotales',this.headers)
    	.pipe(catchError( this.handleError));
		
	}
	/**
	 * mostrar Aguaganaderias leftjoin
	 *
	 * @param 
	 * @return List
	 */	
	getUserLeftjoinAguaganaderia(): Observable<any>{
		
		return this.http.get(this.url+'getUserLeftjoinAguaganaderia',this.headers)
    	.pipe(catchError( this.handleError));
	}
	/**
	 * mostrar Aguaganaderias por user
	 *
	 * @param 
	 * @return List
	 */	
	getAllUserAguaganaderia(): Observable<any>{
		
		return this.http.get(this.url+'getAllUserAguaganaderia',this.headers)
    	.pipe(catchError( this.handleError));
	}

	/**
	 * mostrar lista de usuarios registrados para detallefacturaganaderia
	 *
	 * @param 
	 * @return List
	 */	
	getIdControlAguaganaderia(controlaguaganaderia_id): Observable<any>{
		
		return this.http.get(this.url+'getIdControlAguaganaderia/'+controlaguaganaderia_id,this.headers)
    	.pipe(catchError( this.handleError));
	}
}
