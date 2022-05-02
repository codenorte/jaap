import { Component, OnInit } from '@angular/core';
import { PagesService } from '../pages.service';
import { SettingsService } from '../../../services/settings.service';


@Component({
  selector: 'app-medidor',
  templateUrl: './medidor.component.html',
  styleUrls: ['./medidor.component.css']
})
export class MedidorComponent implements OnInit {

	constructor(
		private _pagesService: PagesService,
		private _settingsService: SettingsService
		) {

	}

	ngOnInit(): void {
	}

}
