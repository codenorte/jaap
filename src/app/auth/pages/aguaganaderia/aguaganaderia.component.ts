import { Component, OnInit } from '@angular/core';
import { PagesService } from '../pages.service';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-aguaganaderia',
  templateUrl: './aguaganaderia.component.html',
  styleUrls: ['./aguaganaderia.component.css']
})
export class AguaganaderiaComponent implements OnInit {

  constructor(
  		private _pagesService: PagesService,
		private _settingsService: SettingsService
		) { }

  ngOnInit(): void {
  }

}
