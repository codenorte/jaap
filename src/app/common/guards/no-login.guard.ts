import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoLoginGuard implements CanActivate {
	constructor(private _router:Router){

	}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean>| Promise<boolean> | boolean {

		if(localStorage.getItem('token')==null){
			return true;
		}
		else{
			this._router.navigate(['/']);
			return false;
		}
	}
  
}
