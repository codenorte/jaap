import { Pipe, PipeTransform } from '@angular/core';
import { Detallefactura } from '../../../model/detallefactura';

@Pipe({
  name: 'sumasubtotal'
})
export class SumasubtotalPipe implements PipeTransform {


	transform(detallefactura, searchValue: string): any {

		//console.log(detallefactura);
		//console.log(detallefactura.APORTEMINGA);

		var APORTEMINGA = detallefactura.APORTEMINGA;
		var ALCANTARRILLADO = detallefactura.ALCANTARRILLADO;
		var SUBTOTAL = detallefactura.SUBTOTAL;

		var total = 0;
		total= parseFloat(APORTEMINGA)+parseFloat(ALCANTARRILLADO)+parseFloat(SUBTOTAL);
		//console.log(total);
		
		return total;	
	}

}
