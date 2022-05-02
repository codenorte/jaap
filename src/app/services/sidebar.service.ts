import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  //MENU ADMINISTRADOR
  menu: any[] = [
    {
      titulo: 'Inicio',
      icono: 'mdi mdi-gauge',
      path: '/dashboard',
      submenu: [
        { titulo: 'Inicio', url: '/dashboard'},
        //{ titulo: 'ProgressBar', url: '/dashboard/progress'},
        //{ titulo: 'Graficas', url: '/dashboard/grafica1'},
      ]
    },
    {
      titulo: 'Lista Usuario',
      icono: 'mdi mdi-gauge',
      path: '/users',
      submenu: [
        { titulo: 'Lista Usuario', url: '/users'},
        //{ titulo: 'Agregar Usuario', url: '/users/agregar'},

      ]
    },
    {
      titulo: 'Lista Medidor',
      icono: 'mdi mdi-gauge',
      path: '/medidor',
      submenu: [
        { titulo: 'Lista Medidor', url: '/medidor'},
        { titulo: 'Agregar Medidor', url: '/medidor/agregar-opcion'},
        //{ titulo: 'Actualizar codigo', url: '/medidor/actualizarcodigo'},
        { titulo: 'Transpaso', url: '/medidor/transpaso'},
      ]
    }
    ,
    {
      titulo: 'Facturación',
      icono: 'mdi mdi-gauge',
      path: '/factura',
      submenu: [
        { titulo: 'Estado factura', url: '/factura/estado'},
        { titulo: 'Cobrar factura', url: '/factura/cobro'},
        //{ titulo: 'Buscar factura', url: '/factura'},

      ]
    },
    {
      titulo: 'Compras',
      icono: 'mdi mdi-gauge',
      path: '/compras',
      submenu: [
        { titulo: 'Gestionar Compras', url: '/compras'},
        { titulo: 'Gestionar proveedores', url: '/proveedores'},
      ]
    },
    {
      titulo: 'Contabilidad',
      icono: 'mdi mdi-gauge',
      path: '/contabilidad',
      submenu: [
        { titulo: 'Gestionar contabilidad', url: '/contabilidad'},
      ]
    },
    {
      titulo: 'Configuración',
      icono: 'mdi mdi-gauge',
      path: '/configuracion',
      submenu: [
        { titulo: 'Institucion', url: '/configuracion'},
        { titulo: 'Roles', url: '/configuracion/roles'},
        { titulo: 'Usuarios', url: '/configuracion/users-admin'},
        { titulo: 'Tarifas', url: '/configuracion/tarifas'},
      ]
    },
    {
      titulo: 'planificacion',
      icono: 'mdi mdi-gauge',
      path: '/planificacion',
      submenu: [
        { titulo: 'Planificacion', url: '/planificacion'},
      ]
    },
    {
      titulo: 'aguasobrante',
      icono: 'mdi mdi-gauge',
      path: '/aguasobrante',
      submenu: [
        { titulo: 'Usuarios sobrante', url: '/aguasobrante'},
        { titulo: 'Tarifa', url: '/aguasobrante/tarifa-aguasobrante'},
        { titulo: 'Registro mes', url: '/aguasobrante/controlaniomessobrante'},
        { titulo: 'Factura sobrante', url: '/aguasobrante/factura-cobro-sobrante'},
      ]
    },
    {
      titulo: 'aguaganaderia',
      icono: 'mdi mdi-gauge',
      path: '/aguaganaderia',
      submenu: [
        { titulo: 'Usuarios ganaderia', url: '/aguaganaderia'},
        { titulo: 'Tarifa', url: '/aguaganaderia/tarifa-aguaganaderia'},
        { titulo: 'Registro mes', url: '/aguaganaderia/controlaniomesganaderia'},
        { titulo: 'Factura ganaderia', url: '/aguaganaderia/factura-cobro-ganaderia'},
      ]
    }
  ];

  /**********************************************************
  *999999999999999999999 menu Usuario cliente 
  ***********************************************************
  */
  menuCliente: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      path: '/dashboard',
      submenu: [
        { titulo: 'Main', url: '/dashboard'},
        //{ titulo: 'ProgressBar', url: '/dashboard/progress'},
        //{ titulo: 'Graficas', url: '/dashboard/grafica1'},
      ]
    },
    {
      titulo: 'Usuario',
      icono: 'mdi mdi-gauge',
      path: '/users',
      submenu: [
        { titulo: 'Usuario', url: '/users'},
      ]
    },
    {
      titulo: 'Medidor',
      icono: 'mdi mdi-gauge',
      path: '/medidor',
      submenu: [
        { titulo: 'Medidor', url: '/medidor'},
      ]
    }
    ,
    {
      titulo: 'Facturación',
      icono: 'mdi mdi-gauge',
      path: '/factura',
      submenu: [
        { titulo: 'Lista factura', url: '/factura'},
        { titulo: 'Estado factura', url: '/factura/estado'},
      ]
    }
  ];

  //menu Usuario Operador 
  menuOperador: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      path: '/dashboard',
      submenu: [
        { titulo: 'Main', url: '/dashboard'},
      ]
    },
    {
      titulo: 'Usuario',
      icono: 'mdi mdi-gauge',
      path: '/users',
      submenu: [
        { titulo: 'Usuario', url: '/users'},
      ]
    },
    {
      titulo: 'Medidor',
      icono: 'mdi mdi-gauge',
      path: '/medidor',
      submenu: [
        { titulo: 'Medidor', url: '/medidor'},
      ]
    }
    ,
    {
      titulo: 'Consumo',
      icono: 'mdi mdi-gauge',
      path: '/consumo',
      submenu: [
        { titulo: 'Lista mensual', url: '/consumo'},
        //{ titulo: 'Ingresar lectura', url: '/consumo/registro'},
      ]
    }
  ];

  constructor() { }
}
