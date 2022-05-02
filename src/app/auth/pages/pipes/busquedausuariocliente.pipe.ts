import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../interface/user';

@Pipe({
  name: 'busquedausuariocliente'
})
export class BusquedausuarioclientePipe implements PipeTransform {

  transform(user: User[], searchValue: string): User[] {
    
    if(!user||!searchValue){
      return user;
    }
    //console.log(user);
    return user.filter(user=>
      user.RUCCI.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.NOMBRES.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.APELLIDOS.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.APADOSN.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.SECTOR.toLowerCase().includes(searchValue.toLowerCase()) 
      );
  }
}


