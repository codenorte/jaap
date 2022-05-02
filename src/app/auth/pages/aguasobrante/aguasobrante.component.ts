import { Component, OnInit } from '@angular/core';
import { PagesService } from '../pages.service';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-aguasobrante',
  templateUrl: './aguasobrante.component.html',
  styleUrls: ['./aguasobrante.component.css']
})
export class AguasobranteComponent implements OnInit {

  constructor(
	  	private _pagesService: PagesService,
		private _settingsService: SettingsService

  	) { }

  ngOnInit(): void {
  }

}
