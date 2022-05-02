import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//angular material
//tabla material
import {CdkTableModule} from '@angular/cdk/table';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

//rutas
import { AppRoutingModule } from './app-routing.module';
//modulos
import { PagesModule } from './auth/pages/pages.module';
import { PublicModule } from './public/public.module';
//componentes
import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    PublicModule,
    NgbModule,
    BrowserAnimationsModule,

    CdkTableModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  exports: [
    BrowserAnimationsModule,
    CdkTableModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [ Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
