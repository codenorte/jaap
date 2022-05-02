import { Component, OnInit } from '@angular/core';
import { PagesService } from '../pages.service';
import { SettingsService } from '../../../services/settings.service';


@Component({
  selector: 'app-consumo',
  templateUrl: './consumo.component.html',
  styleUrls: ['./consumo.component.css']
})
export class ConsumoComponent implements OnInit {

	constructor(
		private _pagesService: PagesService,
		private _settingsService: SettingsService,
		) { }

	ngOnInit(): void {
}

}
