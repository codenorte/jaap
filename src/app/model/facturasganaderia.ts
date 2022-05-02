export class Facturasganaderia {
	constructor(
		
		public NUMFACTURA:string,
		public FECHAEMISION:Date,
		public SUBTOTAL:number,
		public IVA:number,
		public TOTAL:number,
		public USUARIOACTUAL:string,
		public estado:string,

		){
	}
}
