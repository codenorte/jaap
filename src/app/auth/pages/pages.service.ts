import { Injectable } from '@angular/core';
import { doesNotReject } from 'assert';


@Injectable({
  providedIn: 'root'
})
export class PagesService {

	private linkStyle =  document.querySelector('#adminstyle');

	constructor() {
		this.cargar();
	}
	cargar(){
		//console.log("aqui pagina");
		const themeSelected = './assets/css/style.css';
		this.linkStyle.setAttribute('href', themeSelected);
	}

}
