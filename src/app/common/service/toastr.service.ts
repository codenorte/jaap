import { Injectable } from '@angular/core';
declare var toastr:any;
@Injectable()
export class ToastrService {

  constructor() { }

  Success(title:string,message?:string){
  	toastr.success(title,message);
  }
  Warning(title:string,message?:string){
  	toastr.warning(title,message);
  }
  Error(title:string,message?:string){
  	toastr.error(title,message);
  }
  Info(title:string,message?:string){
  	toastr.info(title,message);
  }
  setting(){
	toastr.options = {
		"closeButton": true,
		"debug": false,
		"progressBar": true,
		"preventDuplicates": false,
		"positionClass": "toast-bottom-right",
		"onclick": null,
		"showDuration": "400",
		"hideDuration": "1000",
		"timeOut": "7000",
		"extendedTimeOut": "1000",
		"showEasing": "swing",
		"hideEasing": "linear",
		"showMethod": "fadeIn",
		"hideMethod": "fadeOut"
	}
  }
}
