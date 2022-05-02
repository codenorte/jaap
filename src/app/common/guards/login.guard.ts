import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../../services/auth/users.service';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  public rol_valor;
  
  constructor(private _router:Router,private _usersService:UsersService,){
  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    
    this.getRol();
    
    if(localStorage.getItem('token')==null){
      this._router.navigate(['/login']);
      return false;
    }
    return true;

  }

  //obtener rol edmin - empresa
  getRol(){
    let rol_valor=localStorage.getItem('channels');
    if(rol_valor!='undefined'&&rol_valor!=null){
      var ss=rol_valor.split("name:Landscapes");
      this.rol_valor=ss[1];
    }else{
      this.rol_valor=null;
    }
    return parseInt(this.rol_valor);
  }
}
