export class Detallefacturaganaderia {
	constructor(
		public IDTARIFASGANADERIA:number,
		public IDAGUAGANADERIA:number,
		public ANIOMES:Date,
		public SUBTOTAL:number,
		public TOTAL:number,
		public OBSERVACION:string,
		public DETALLE:string,
		public estado:string,
		public IDFACTURASGANADERIA:number,
		public NUMFACTURA:string,
		){
	}
}
