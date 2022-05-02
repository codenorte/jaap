import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

/*GUARDIAS*/
import { NoLoginGuard } from '../common/guards/no-login.guard';

import { InicioComponent } from './inicio/inicio.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { BlogComponent } from './blog/blog.component';
import { ContactoComponent } from './contacto/contacto.component';

import { RegistrarseComponent } from './registrarse/registrarse.component';
import { LoginComponent } from './login/login.component';




const routes: Routes = [
	
	//public
  { path:'inicio', component: InicioComponent },
  { path:'noticias', component: NoticiasComponent },
  { path:'blog', component: BlogComponent },
  { path:'contacto', component: ContactoComponent },

  { path:'registrarse', component: RegistrarseComponent, canActivate:[NoLoginGuard] },
  { path:'login', component: LoginComponent, canActivate:[NoLoginGuard] },

];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class PublicRoutingModule {}
