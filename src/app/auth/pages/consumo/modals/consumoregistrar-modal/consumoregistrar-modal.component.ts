import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-consumoregistrar-modal',
  templateUrl: './consumoregistrar-modal.component.html',
  styleUrls: ['./consumoregistrar-modal.component.css']
})
export class ConsumoregistrarModalComponent implements OnInit {

	@Input() title = 'Sin titulo';
	@Input('valor') listamedidor;

	constructor() { }

	ngOnInit(): void {
		console.log(this.listamedidor);
	}

}
