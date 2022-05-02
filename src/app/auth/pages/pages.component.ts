import { Component, OnInit } from '@angular/core';
import { PagesService } from './pages.service';
import { SettingsService } from '../../services/settings.service';


// Para utilizar funciones globales javascript dentro de Angular
declare function customInitFunctions(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

	constructor(private _pagesService: PagesService,private _settingsService: SettingsService) {
		this._pagesService.cargar();
		this._settingsService.cargar();
	}

	ngOnInit(): void {
		customInitFunctions();
	}

}
