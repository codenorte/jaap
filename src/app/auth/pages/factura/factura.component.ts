import { Component, OnInit } from '@angular/core';
import { PagesService } from '../pages.service';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

	constructor(
		private _pagesService: PagesService,
		private _settingsService: SettingsService,
		) {

	}

	ngOnInit(): void {
	}

}
