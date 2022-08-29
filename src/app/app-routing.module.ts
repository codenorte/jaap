import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//rutas
import { PagesRoutingModule } from './auth/pages/pages-routing.module';
import { PublicRoutingModule } from './public/public-routing.module';
//componentes
import { NopagefoundComponent } from './nopagefound/nopagefound.component';


const routes: Routes = [

  // path: '/dashboard'    PagesRouting
  { path: '', redirectTo: '/inicio', pathMatch: 'full'},
  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    PublicRoutingModule,
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
