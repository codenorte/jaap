import { Users } from '../../model/users';

export interface Medidorusers {
    
    IDUSUARIO: string;
    SERIE: string;
    NUMMEDIDOR: number;
    CODIGO:string;
    ESTADO: string;
    VALORPORCONEXION: number;
    PAGADO: string;
    SALDO: number;
    FECHA: Date;
    visto: string;
    detallemat_id: number;
    users:Users;
}

