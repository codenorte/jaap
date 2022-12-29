import { LOCALE_ID } from '@angular/core';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//dependencias 
//import { NgSelect2Module } from 'ng-select2';

//form reactive
import { ReactiveFormsModule } from '@angular/forms';
//tabla material
import {CdkTableModule} from '@angular/cdk/table';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

//import { SharedModule } from '../../shared/shared.module';

import { LayoutsModule } from '../layouts/layouts.module';

import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

import { DataTablesModule } from "angular-datatables";

import { UsersComponent } from './users/users.component';
import { UsersAddComponent } from './users/users-add/users-add.component';
import { UsersDetailComponent } from './users/users-detail/users-detail.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';
import { UsuariosListaComponent } from './users/usuarios-lista/usuarios-lista.component';
import { UsersPerfilComponent } from './users/users-perfil/users-perfil.component';

import { MedidorComponent } from './medidor/medidor.component';
import { MedidorAddComponent } from './medidor/medidor-add/medidor-add.component';
import { MedidorDetailComponent } from './medidor/medidor-detail/medidor-detail.component';
import { MedidorEditComponent } from './medidor/medidor-edit/medidor-edit.component';
import { MedidorListaComponent } from './medidor/medidor-lista/medidor-lista.component';
import { ActualizarcodigoComponent } from './medidor/actualizarcodigo/actualizarcodigo.component';

import { FacturaComponent } from './factura/factura.component';
import { FacturaListaComponent } from './factura/factura-lista/factura-lista.component';
import { FacturaEstadoComponent } from './factura/factura-estado/factura-estado.component';
import { FacturaCobroComponent } from './factura/factura-cobro/factura-cobro.component';

import { ConsumoComponent } from './consumo/consumo.component';
import { ConsumoListaComponent } from './consumo/consumo-lista/consumo-lista.component';
import { ConsumoRegistroComponent } from './consumo/consumo-registro/consumo-registro.component';
import { ConsumoDetailComponent } from './consumo/consumo-detail/consumo-detail.component';
import { ConsumoregistrarModalComponent } from './consumo/modals/consumoregistrar-modal/consumoregistrar-modal.component';
import { DetailUserComponent } from './consumo/detail-user/detail-user.component';

//modulo compras
import { ComprasComponent } from './compras/compras.component';
import { RealizarComprasComponent } from './compras/realizar-compras/realizar-compras.component';
import { ComprasListaComponent } from './compras/compras-lista/compras-lista.component';
import { ComprasDetailComponent } from './compras/compras-detail/compras-detail.component';
//modulo proveedores
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ProveedoresListaComponent } from './proveedores/proveedores-lista/proveedores-lista.component';
import { ProveedoresAddComponent } from './proveedores/proveedores-add/proveedores-add.component';
import { ProveedoresDetailComponent } from './proveedores/proveedores-detail/proveedores-detail.component';

// pipes
import { BusquedausuarioPipe } from './pipes/busquedausuario.pipe';
import { DateWithLocalePipe } from './pipes/date-with-locale.pipe';
import { BusquedausuarioclientePipe } from './pipes/busquedausuariocliente.pipe';

//contabilidad
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
import { BusquedamedidoruserPipe } from './pipes/busquedamedidoruser.pipe';
//seleccionar opcion de creacion de medidor
import { MedidorAddSelectComponent } from './medidor/medidor-add-select/medidor-add-select.component';
import { MedidorAddExistenteComponent } from './medidor/medidor-add-existente/medidor-add-existente.component';
//transpaso
import { TraspasoComponent } from './medidor/traspaso/traspaso.component';
import { TraspasoDetailComponent } from './medidor/traspaso-detail/traspaso-detail.component';
import { SumasubtotalPipe } from './pipes/sumasubtotal.pipe';

registerLocaleData(es);

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    UsersComponent,
    UsersAddComponent,
    UsersDetailComponent,
    MedidorComponent,
    MedidorAddComponent,
    MedidorDetailComponent,
    UsersEditComponent,
    MedidorEditComponent,
    UsuariosListaComponent,
    MedidorListaComponent,
    UsersPerfilComponent,
    FacturaComponent,
    FacturaListaComponent,
    FacturaEstadoComponent,
    FacturaCobroComponent,
    ConsumoComponent,
    ConsumoListaComponent,
    ConsumoRegistroComponent,
    ConsumoDetailComponent,
    ConsumoregistrarModalComponent,
    DetailUserComponent,
    ComprasComponent,
    RealizarComprasComponent,
    ProveedoresComponent,
    ComprasListaComponent,
    ComprasDetailComponent,
    ProveedoresListaComponent,
    ProveedoresAddComponent,
    ProveedoresDetailComponent,
    BusquedausuarioPipe,
    ContabilidadComponent,
    ContabilidadDetailComponent,
    ConfiguracionComponent,
    ConfiguracionInstitucionComponent,
    RolesComponent,
    UsuariosAdminComponent,
    TarifasComponent,
    PlanificacionComponent,
    MingasComponent,
    PlanificacionDetailComponent,
    DateWithLocalePipe,
    TraspasoComponent,
    TraspasoDetailComponent,
    ActualizarcodigoComponent,
    AguasobranteComponent,
    AguaganaderiaComponent,
    AguasobranteListaComponent,
    AguaganaderiaListaComponent,
    AguaganaderiaDetailComponent,
    AguasobranteDetailComponent,
    TarifassobranteComponent,
    TarifasganaderiaComponent,
    BusquedausuarioclientePipe,
    FacturasGanaderiaComponent,
    ControlaniomesganaderiaComponent,
    ControlaniomesganaderiaDetailComponent,
    ControlaniomessobranteComponent,
    ControlaniomessobranteDetailComponent,
    AguaganaderiaEditComponent,
    FacturasSobranteComponent,
    AguasobranteEditComponent,
    BusquedamedidoruserPipe,
    MedidorAddSelectComponent,
    MedidorAddExistenteComponent,
    SumasubtotalPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    //SharedModule,
    LayoutsModule,
    RouterModule,
    ComponentsModule,
    DataTablesModule,
    ChartsModule,

    CdkTableModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    //NgSelect2Module
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es-EC' }]
})
export class PagesModule { }
