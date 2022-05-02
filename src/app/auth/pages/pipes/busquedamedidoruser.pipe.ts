import { Pipe, PipeTransform } from '@angular/core';
import { Medidorusers } from '../../interface/medidorusers';

@Pipe({
  name: 'busquedamedidoruser'
})
export class BusquedamedidoruserPipe implements PipeTransform {

	transform(usermedidor: Medidorusers[], searchValue: string): Medidorusers[] {
		
		/*const resultadoUser = [];
		//si esta vacio devolvemos value, o menor a 3 caracteres

		for(const us of usermedidor){
			//console.log(us.NOMBRES);
			if(us.RUCCI.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
				us.NOMBRES.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
				//us.APELLIDOS.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
				us.SECTOR.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
				us.medidor[0].NUMMEDIDOR.toString().toLowerCase().indexOf(searchValue.toLowerCase()) > -1

				){
				resultadoUser.push(us);
			}
		}
		//console.log(resultadoUser);

		if(!usermedidor||!searchValue){
			return usermedidor;
		}*/
		//console.log(usermedidor);

		return usermedidor.filter(usermedidor=>
			usermedidor.users.RUCCI.toLowerCase().includes(searchValue.toLowerCase()) ||
			usermedidor.users.NOMBRES.toLowerCase().includes(searchValue.toLowerCase()) ||
			usermedidor.users.APELLIDOS.toLowerCase().includes(searchValue.toLowerCase()) ||
			usermedidor.users.APADOSN.toLowerCase().includes(searchValue.toLowerCase()) ||
			usermedidor.users.SECTOR.toLowerCase().includes(searchValue.toLowerCase()) 
			);
    }

}
