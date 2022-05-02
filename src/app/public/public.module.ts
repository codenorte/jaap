import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
// Importar HttpClientModule
import { HttpClientModule } from '@angular/common/http';

import { InicioComponent } from './inicio/inicio.component';
import { SliderComponent } from './layouts/slider/slider.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { BlogComponent } from './blog/blog.component';
import { ContactoComponent } from './contacto/contacto.component';
import { CabeceraComponent } from './layouts/cabecera/cabecera.component';

import { LoginComponent } from './login/login.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MenuComponent } from './layouts/menu/menu.component';

//toaester service message
import { ToastrService } from '../common/service/toastr.service';



@NgModule({
  declarations: [
  	InicioComponent,
    SliderComponent,
    FooterComponent,
    NoticiasComponent,
    BlogComponent,
    ContactoComponent,
    CabeceraComponent,
    MenuComponent,

    RegistrarseComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    CarouselModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
  ],
   exports: [
    InicioComponent,
    RegistrarseComponent,
    NoticiasComponent,
    BlogComponent,
    ContactoComponent,
    CabeceraComponent,

    RegistrarseComponent,
    LoginComponent,

  ],
  providers: [ToastrService]
})
export class PublicModule { }
