import { Pipe, PipeTransform } from '@angular/core';
import { Usermedidor } from '../../interface/usermedidor';

@Pipe({
  name: 'busquedausuario'
})
export class BusquedausuarioPipe implements PipeTransform {

	/*
	transform(value: any, arg: any): any {
		const resultadoUser = [];
		//si esta vacio devolvemos value, o menor a 3 caracteres
		if(arg === undefined ||arg ==='' || arg.length < 3) return value;

		for(const us of value){
			console.log(us);
			//console.log(us.NOMBRES);
			if(us.NOMBRES.toLowerCase().indexOf(arg.toLowerCase()) > -1){
				console.log("encontrado");
				console.log(us);
				resultadoUser.push(us);
			}
		}
		return resultadoUser;
	}
	*/

	transform(usermedidor: Usermedidor[], searchValue: string): Usermedidor[] {
		
		const resultadoUser = [];
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
		}
		//console.log(usermedidor);
		return usermedidor.filter(usermedidor=>
			usermedidor.RUCCI.toLowerCase().includes(searchValue.toLowerCase()) ||
			usermedidor.NOMBRES.toLowerCase().includes(searchValue.toLowerCase()) ||
			usermedidor.APELLIDOS.toLowerCase().includes(searchValue.toLowerCase()) ||
			usermedidor.APADOSN.toLowerCase().includes(searchValue.toLowerCase()) ||
			usermedidor.SECTOR.toLowerCase().includes(searchValue.toLowerCase()) || 
			usermedidor.medidor[0].NUMMEDIDOR.toString().toLowerCase().includes(searchValue.toLowerCase()) 
			);

		
    }

}
