import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

/*GUARDIAS*/
import { LoginGuard } from '../../common/guards/login.guard';


import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

import { UsersComponent } from './users/users.component';
import { UsuariosListaComponent } from './users/usuarios-lista/usuarios-lista.component';
import { UsersAddComponent } from './users/users-add/users-add.component';
import { UsersDetailComponent } from './users/users-detail/users-detail.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';
import { UsersPerfilComponent } from './users/users-perfil/users-perfil.component';


import { MedidorComponent } from './medidor/medidor.component';
import { MedidorAddComponent } from './medidor/medidor-add/medidor-add.component';
import { MedidorDetailComponent } from './medidor/medidor-detail/medidor-detail.component';
import { MedidorEditComponent } from './medidor/medidor-edit/medidor-edit.component';
import { MedidorListaComponent } from './medidor/medidor-lista/medidor-lista.component';
import { ActualizarcodigoComponent } from './medidor/actualizarcodigo/actualizarcodigo.component';
//transpaso
import { TraspasoComponent } from './medidor/traspaso/traspaso.component';
import { TraspasoDetailComponent } from './medidor/traspaso-detail/traspaso-detail.component';

import { FacturaComponent } from './factura/factura.component';
import { FacturaListaComponent } from './factura/factura-lista/factura-lista.component';
import { FacturaEstadoComponent } from './factura/factura-estado/factura-estado.component';
import { FacturaCobroComponent } from './factura/factura-cobro/factura-cobro.component';

import { ConsumoComponent } from './consumo/consumo.component';
import { ConsumoListaComponent } from './consumo/consumo-lista/consumo-lista.component';
import { ConsumoRegistroComponent } from './consumo/consumo-registro/consumo-registro.component';
import { ConsumoDetailComponent } from './consumo/consumo-detail/consumo-detail.component';
import { DetailUserComponent } from './consumo/detail-user/detail-user.component';

//modulo compras
import { ComprasListaComponent } from './compras/compras-lista/compras-lista.component';
import { ComprasDetailComponent } from './compras/compras-detail/compras-detail.component';
import { ComprasComponent } from './compras/compras.component';
import { RealizarComprasComponent } from './compras/realizar-compras/realizar-compras.component';
//modulo proveedores
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ProveedoresListaComponent } from './proveedores/proveedores-lista/proveedores-lista.component';
import { ProveedoresAddComponent } from './proveedores/proveedores-add/proveedores-add.component';
import { ProveedoresDetailComponent } from './proveedores/proveedores-detail/proveedores-detail.component';

//modulo contabilidad
import { ContabilidadComponent } from './contabilidad/contabilidad.component';
import { ContabilidadDetailComponent } from './contabilidad/contabilidad-detail/contabilidad-detail.component';


//configuracion
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { ConfiguracionInstitucionComponent } from './configuracion/configuracion-institucion/configuracion-institucion.component';
import { RolesComponent } from './configuracion/roles/roles.component';
import { UsuariosAdminComponent } from './configuracion/usuarios-admin/usuarios-admin.component';
import { TarifasComponent } from './configuracion/tarifas/tarifas.component';

//planificacion
import { PlanificacionComponent } from './planificacion/planificacion.component';
import { MingasComponent } from './planificacion/mingas/mingas.component';
import { PlanificacionDetailComponent } from './planificacion/planificacion-detail/planificacion-detail.component';

//agua sobrante
import { AguasobranteComponent } from './aguasobrante/aguasobrante.component';
import { AguasobranteListaComponent } from './aguasobrante/aguasobrante-lista/aguasobrante-lista.component';
import { AguasobranteDetailComponent } from './aguasobrante/aguasobrante-detail/aguasobrante-detail.component';
import { TarifassobranteComponent } from './aguasobrante/tarifassobrante/tarifassobrante.component';
import { ControlaniomessobranteComponent } from './aguasobrante/controlaniomessobrante/controlaniomessobrante.component';
import { ControlaniomessobranteDetailComponent } from './aguasobrante/controlaniomessobrante-detail/controlaniomessobrante-detail.component';
import { AguasobranteEditComponent } from './aguasobrante/aguasobrante-edit/aguasobrante-edit.component';
import { FacturasSobranteComponent } from './aguasobrante/facturas-sobrante/facturas-sobrante.component';

//agua ganaderia
import { AguaganaderiaComponent } from './aguaganaderia/aguaganaderia.component';
import { AguaganaderiaListaComponent } from './aguaganaderia/aguaganaderia-lista/aguaganaderia-lista.component';
import { AguaganaderiaDetailComponent } from './aguaganaderia/aguaganaderia-detail/aguaganaderia-detail.component';
import { TarifasganaderiaComponent } from './aguaganaderia/tarifasganaderia/tarifasganaderia.component';
import { FacturasGanaderiaComponent } from './aguaganaderia/facturas-ganaderia/facturas-ganaderia.component';
import { ControlaniomesganaderiaComponent } from './aguaganaderia/controlaniomesganaderia/controlaniomesganaderia.component';
import { ControlaniomesganaderiaDetailComponent } from './aguaganaderia/controlaniomesganaderia-detail/controlaniomesganaderia-detail.component';
import { AguaganaderiaEditComponent } from './aguaganaderia/aguaganaderia-edit/aguaganaderia-edit.component';
//seleccionar opcion de creacion de medidor
import { MedidorAddSelectComponent } from './medidor/medidor-add-select/medidor-add-select.component';
import { MedidorAddExistenteComponent } from './medidor/medidor-add-existente/medidor-add-existente.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate:[LoginGuard],
    data: {tituloraiz: 'Dashboard'},
    children: [
      { path: '', component: DashboardComponent, data: {titulo: 'Administracion'} },
      { path: 'progress', component: ProgressComponent, data: {titulo: 'Progreso'} },
      { path: 'grafica1', component: Grafica1Component, data: {titulo: 'Estadísticas'} },
      { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Configuración'} },
    ]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate:[LoginGuard],
    data: {tituloraiz: 'users'},
    children: [
      { path: '', component: UsuariosListaComponent, data: {titulo: 'Usuarios lista'} },
      { path: 'agregar', component: UsersAddComponent, data: {tituloraiz: 'users',titulo: 'Agregar usuario'} },
      { path: 'edit/:usuarios_id', component: UsersEditComponent, data: {titulo: 'Editar usuario'} },
      { path: 'detail/:usuarios_id', component: UsersDetailComponent, data: {titulo: 'Detalle usuario'} },
      { path: 'perfil/:usuarios_id', component: UsersPerfilComponent, data: {titulo: 'Perfil usuario'} },
    ]
  },
  {
    path: 'medidor',
    component: MedidorComponent,
    canActivate:[LoginGuard],
    data: {tituloraiz: 'medidor'},
    children: [
      { path: '', component: MedidorListaComponent, data: {titulo: 'Medidores lista'} },
      { path: 'agregar', component: MedidorAddComponent, data: {tituloraiz: 'medidor',titulo: 'Agregar nuevo medidor'} },
      { path: 'agregar-existente', component: MedidorAddExistenteComponent, data: {tituloraiz: 'medidor',titulo: 'Agregar usuario existente'} },
      { path: 'agregar-opcion', component: MedidorAddSelectComponent, data: {tituloraiz: 'medidor',titulo: 'Seleccionar opcion'} },
      //{ path: 'actualizarcodigo', component: ActualizarcodigoComponent, data: {tituloraiz: 'medidor',titulo: 'Actualizar codigo medidor'} },
      { path: 'detail/:medidor_id', component: MedidorDetailComponent, data: {titulo: 'Detalle medidor'} },
      { path: 'edit/:medidor_id', component: MedidorEditComponent, data: {titulo: 'Editar medidor'} },
      { path: 'transpaso', component: TraspasoComponent, data: {titulo: 'Transpaso de medidor'} },
      { path: 'transpaso/:medidor_id', component: TraspasoDetailComponent, data: {titulo: 'Transpaso detalle'} },

    ]
  },
  {
    path: 'factura',
    component: FacturaComponent,
    canActivate:[LoginGuard],
    data: {tituloraiz: 'factura'},
    children: [
      { path: '', component: FacturaListaComponent, data: {titulo: 'facturas'} },
      { path: 'estado', component: FacturaEstadoComponent, data: {tituloraiz: 'factura',titulo: 'Estado factura'} },
      { path: 'cobro', component: FacturaCobroComponent, data: {titulo: 'Cobro factura'} },
    ]
  },
  {
    path: 'consumo',
    component: ConsumoComponent,
    canActivate:[LoginGuard],
    data: {tituloraiz: 'consumo'},
    children: [
      { path: '', component: ConsumoListaComponent, data: {titulo: 'lista consumo'} },
      { path: 'detail/:consumo_id', component: ConsumoDetailComponent, data: {titulo: 'Detalle de consumo mensual'} },
      { path: 'registro', component: ConsumoRegistroComponent, data: {titulo: 'Registrar consumo'} },
      { path: 'detail-user/:medidor_numero', component: DetailUserComponent, data: {titulo: 'Detalle de usuario consumo'} },
    ]
  },
  {
    path: 'compras',
    component: ComprasComponent,
    canActivate:[LoginGuard],
    data: {tituloraiz: 'compras'},
    children: [
      { path: '', component: ComprasListaComponent, data: {titulo: 'lista compras'} },
      { path: 'detail/:compras_id', component: ComprasDetailComponent, data: {titulo: 'Detalle de compras'} },
      { path: 'ingresar', component: RealizarComprasComponent, data: {titulo: 'Ingresar compras'} },
      { path: 'detail-compras/:compras_id', component: DetailUserComponent, data: {titulo: 'Detalle de compras'} },
    ]
  },
  {
    path: 'proveedores',
    component: ProveedoresComponent,
    canActivate:[LoginGuard],
    data: {tituloraiz: 'proveedores'},
    children: [
      { path: '', component: ProveedoresListaComponent, data: {titulo: 'lista proveedores'} },
      { path: 'registrar', component: ProveedoresAddComponent, data: {titulo: 'Registrar proveedores'} },
      { path: 'detail-proveedor/:proveedor_id', component: ProveedoresDetailComponent, data: {titulo: 'Detalle proveedor'} },

      

    ]
  },
  {
    path: 'contabilidad',
    component: ContabilidadComponent,
    canActivate:[LoginGuard],
    data: {tituloraiz: 'contabilidad'},
    children: [
      { path: '', component: ContabilidadDetailComponent, data: {titulo: 'contabilidad detail'} },
    ]
  },
  {
    path: 'configuracion',
    component: ConfiguracionComponent,
    canActivate:[LoginGuard],
    data: {tituloraiz: 'configuracion'},
    children: [
      { path: '', component: ConfiguracionInstitucionComponent, data: {titulo: 'Configuracion institucion'} },
      { path: 'roles', component: RolesComponent, data: {titulo: 'Roles'} },
      { path: 'users-admin', component: UsuariosAdminComponent, data: {titulo: 'Usuarios administradores'} },
      { path: 'tarifas', component: TarifasComponent, data: {titulo: 'Tarifas'} },
    ]
  },
  {
    path: 'planificacion',
    component: PlanificacionComponent,
    canActivate:[LoginGuard],
    data: {tituloraiz: 'planificacion'},
    children: [
      { path: '', component: MingasComponent, data: {titulo: 'Lista planificacion'} },
      { path: 'planificacion-detail/:planificacion_id', component: PlanificacionDetailComponent, data: {titulo: 'Planificacion detalle'} },
    ]
  },
  {
    path: 'aguasobrante',
    component: AguasobranteComponent,
    canActivate:[LoginGuard],
    data: {tituloraiz: 'aguasobrante'},
    children: [
      { path: '', component: AguasobranteListaComponent, data: {titulo: 'Lista aguasobrante'} },
      { path: 'aguasobrante-detail/:aguasobrante_id', component: AguasobranteDetailComponent, data: {titulo: 'Aguasobrante detalle'} },
      { path: 'aguasobrante-edit/:usuarios_id', component: AguasobranteEditComponent, data: {titulo: 'Aguasobrante edit usuario'} },
      { path: 'tarifa-aguasobrante', component: TarifassobranteComponent, data: {titulo: 'Aguasobrante Tarifa'} },
      { path: 'controlaniomessobrante', component: ControlaniomessobranteComponent, data: {titulo: 'Registro mensual agua sobrante'} },
      { path: 'controlaniomessobrante-detail/:controlaniomessobrante_id', component: ControlaniomessobranteDetailComponent, data: {titulo: 'Detalle registro mensual agua sobrante'} },
      { path: 'factura-cobro-sobrante', component: FacturasSobranteComponent, data: {titulo: 'Factura cobro agua sobrante'} },
    ]
  },
  {
    path: 'aguaganaderia',
    component: AguaganaderiaComponent,
    canActivate:[LoginGuard],
    data: {tituloraiz: 'aguaganaderia'},
    children: [
      { path: '', component: AguaganaderiaListaComponent, data: {titulo: 'Lista aguaganaderia'} },
      { path: 'aguaganaderia-detail/:aguaganaderia_id', component: AguaganaderiaDetailComponent, data: {titulo: 'Aguaganaderia detalle'} },
      { path: 'aguaganaderia-edit/:usuarios_id', component: AguaganaderiaEditComponent, data: {titulo: 'Aguaganaderia edit usuario'} },
      { path: 'tarifa-aguaganaderia', component: TarifasganaderiaComponent, data: {titulo: 'Aguaganaderia Tarifa'} },
      { path: 'controlaniomesganaderia', component: ControlaniomesganaderiaComponent, data: {titulo: 'Registro mensual ganaderia'} },
      { path: 'controlaniomesganaderia-detail/:controlaniomes_id', component: ControlaniomesganaderiaDetailComponent, data: {titulo: 'Detalle registromensual ganaderia'} },
      { path: 'factura-cobro-ganaderia', component: FacturasGanaderiaComponent, data: {titulo: 'Factura cobro ganaderia'} },
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class PagesRoutingModule {}


