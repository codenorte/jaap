import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable, of,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GLOBAL } from '../service';

@Injectable({
  providedIn: 'root'
})
export class TarifasganaderiaService {

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
   * Obtener Tarifasganaderia
   *
   * @param 
   * @return List
   */ 
  getAllTarifasganaderia(): Observable<any>{

    return this.http.get(this.url+'getAllTarifasganaderia',this.headers)
      .pipe(catchError( this.handleError));
    
  }
  /**
   * Obtener Tarifasganaderia por id
   *
   * @param 
   * @return List
   */ 
  getIdTarifasganaderia(Tarifasganaderia_id): Observable<any>{
    
    return this.http.get(this.url+'getIdTarifasganaderia/'+Tarifasganaderia_id,this.headers)
      .pipe(catchError( this.handleError));
  }
  /**
   * crear Tarifasganaderia
   *
   * @param 
   * @return List
   */ 
  createTarifasganaderia(Tarifasganaderia): Observable<any>{
    let json=JSON.stringify(Tarifasganaderia);
      return this.http.post(this.url+'createTarifasganaderia',json,this.headers)
      .pipe(catchError( this.handleError));
    
  }
  /**
   * editar Tarifasganaderia
   *
   * @param 
   * @return List
   */ 
  editTarifasganaderia(id,Tarifasganaderia): Observable<any>{
    let json=JSON.stringify(Tarifasganaderia);
      return this.http.put(this.url+'editTarifasganaderia/'+id,json,this.headers)
      .pipe(catchError( this.handleError));
  }
  /**
   * Borrar Tarifasganaderia
   *
   * @param 
   * @return List
   */ 
  destroyTarifasganaderia(id): Observable<any>{
        
        return this.http.delete(this.url+'destroyTarifasganaderia/'+id,this.headers)
      .pipe(catchError( this.handleError));
    }

    /**
   * Obtener Tarifasganaderia por id
   *
   * @param 
   * @return List
   */ 
  getTarifasganaderiaLatest(): Observable<any>{
    
    return this.http.get(this.url+'getTarifasganaderiaLatest',this.headers)
      .pipe(catchError( this.handleError));
  }
}
