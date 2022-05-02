import { Component, OnInit } from '@angular/core';

import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from '../../common/service/toastr.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

	customOptions: OwlOptions = {
		loop: true,
		//autoplay: true,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		dots: true,
		navSpeed: 700,
		navText: ['', ''],
		responsive: {
			0: {
				items: 1
			},
			400: {
				items: 2
			},
			740: {
				items: 3
			},
			940: {
				items: 1
			}
		},
		nav: true
	};

	slideObject = [
	{
		id: 1,
		src:'../../../assets/public/img/banner/banner2.png',
		alt:'Carousel 1',
		title:'Carousel 1'
	},
	{
		id: 2,
		src:'../../../assets/public/img/banner/banner.png',
		alt:'Carousel 2',
		title:'Carousel 2'
	},
	{
		id: 3,
		src:'../../../assets/public/img/banner/banner2.png',
		alt:'Carousel 3',
		title:'Carousel 3'
	}
	];

	constructor(
		private toastrService:ToastrService,
		) {

	}

	ngOnInit(): void {
		//this.toastrService.Success("Bienvenido","JAAPT");
	}

}
