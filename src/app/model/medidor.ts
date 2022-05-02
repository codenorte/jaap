export class Medidor {
	constructor(

	public IDUSUARIO: string,
        public SERIE: string,
        public NUMMEDIDOR: number,
        public CODIGO:number,
        public ESTADO: string,
        public VALORPORCONEXION: number,
        public PAGADO: string,
        public SALDO: number,
        public FECHA: Date,
        public visto: string,
        public detallemat_id: number,
		){
	}
}