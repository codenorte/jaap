import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable, of,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GLOBAL } from '../service';

@Injectable({
  providedIn: 'root'
})
export class TarifassobranteService {
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
   * Obtener Tarifassobrante
   *
   * @param 
   * @return List
   */ 
  getAllTarifassobrante(): Observable<any>{

    return this.http.get(this.url+'getAllTarifassobrante',this.headers)
      .pipe(catchError( this.handleError));
    
  }
  /**
   * Obtener Tarifassobrante por id
   *
   * @param 
   * @return List
   */ 
  getIdTarifassobrante(Tarifassobrante_id): Observable<any>{
    
    return this.http.get(this.url+'getIdTarifassobrante/'+Tarifassobrante_id,this.headers)
      .pipe(catchError( this.handleError));
  }
  /**
   * crear Tarifassobrante
   *
   * @param 
   * @return List
   */ 
  createTarifassobrante(Tarifassobrante): Observable<any>{
    let json=JSON.stringify(Tarifassobrante);
      return this.http.post(this.url+'createTarifassobrante',json,this.headers)
      .pipe(catchError( this.handleError));
    
  }
  /**
   * editar Tarifassobrante
   *
   * @param 
   * @return List
   */ 
  editTarifassobrante(id,Tarifassobrante): Observable<any>{
    let json=JSON.stringify(Tarifassobrante);
      return this.http.put(this.url+'editTarifassobrante/'+id,json,this.headers)
      .pipe(catchError( this.handleError));
  }
  /**
   * Borrar Tarifassobrante
   *
   * @param 
   * @return List
   */ 
  destroyTarifassobrante(id): Observable<any>{
        
        return this.http.delete(this.url+'destroyTarifassobrante/'+id,this.headers)
      .pipe(catchError( this.handleError));
    }

   /**
   * Obtener Tarifassobrante por id
   *
   * @param 
   * @return List
   */ 
  getTarifassobranteLatest(): Observable<any>{
    
    return this.http.get(this.url+'getTarifassobranteLatest',this.headers)
      .pipe(catchError( this.handleError));
  }
}
