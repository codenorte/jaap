import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';


@Pipe({
  name: 'dateWithLocale'
})
export class DateWithLocalePipe implements PipeTransform {

	transform(value: unknown, ...args: unknown[]): unknown {
		return null;
	}

	transform3(value: string, locale: string, pattern: string): any {
		console.log(pattern);
		console.log(value);
		console.log(locale);
		//var salida = new DatePipe(locale).transform(value, pattern);
		//return salida;
	}
	/*transform5(value: any, pattern: string = 'mediumDate'): any {
		const datePipe: DatePipe = new DatePipe(this.translateService.currentLang);
		return datePipe.transform(value, pattern);
	}
	*/


}
