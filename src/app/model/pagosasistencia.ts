export class Pagosasistencia {
	constructor(

                        public IDASISTENCIA:number,
                        public FECHAPAGO:Date,
                        public NUMMINGAS:number,
                        public VALORMINGAS:number,
                        public OBSERVACION:string,
                        public USUARIOACTUAL:string,
                        public NUMFACTURA:number,
                        public estado:string,
                ){
	}
}


