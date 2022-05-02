import { Component, OnInit } from '@angular/core';
import { PagesService } from '../pages.service';
import { SettingsService } from '../../../services/settings.service';
import { Router,ActivatedRoute,Params } from '@angular/router';

@Component({
  selector: 'app-contabilidad',
  templateUrl: './contabilidad.component.html',
  styleUrls: ['./contabilidad.component.css']
})
export class ContabilidadComponent implements OnInit {

	constructor(
		private _pagesService: PagesService,
		private _settingsService: SettingsService,
		private _route:ActivatedRoute,
      	private _router:Router,
		) {
	}

	ngOnInit(): void {
	}

}
