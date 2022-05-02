import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { UsersService } from '../../../services/auth/users.service';
import { ToastrService } from '../../../common/service/toastr.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

    //public isCollapsed = false;
    public isCollapsedProfile = true;
    public isCollapsedDashboard = true;
    public isCollapsedUsers = true;
    public isCollapsedMedidor = true;
    public isCollapsedFactura = true;
    public isCollapsedCompras = true;
    public isCollapsedContabilidad = true;
    public isCollapsedConfiguracion = true;
    public isCollapsedPlanificacion = true;
    public isCollapsedAguasobrante = true;
    public isCollapsedAguaganaderia = true;

    public isCollapsed:boolean;

    menuItems: any[];
    numero;
    //path;

    identity;
    rol_menus;
    nombre_rol;
    ubicacion;

    roles_administrativos:string= "";

    constructor(
      private sidebarService: SidebarService,
      private _route:ActivatedRoute,
      private _router:Router,
      private _usersService:UsersService,
      private toastrService:ToastrService,
      ) {
      
      //this.ubicacion=this.menuItems[0].path;
      //this.path=window.location.pathname;
      //activar si path es proveedores
      //console.log(this.path);


      //console.log(this.ubicacion);
      //console.log(this.menuItems);

      this.identity = this._usersService.getIdentity();
      this.rol_menus = this._usersService.getRol();
      this.nombre_rol = this._usersService.getNombreRol();

       this.obtenerRoles();

       console.log(this._router.url);
       //console.log(this._router);
    }

      ngOnInit(): void {
      this.cargar();
    }

    //carga de roles en template
    cargar(){
      
      console.log(this._router.url);
      var ss=this._router.url.split("/");

      this.isCollapsedDashboard = true;
      this.isCollapsedUsers = true;
      this.isCollapsedMedidor = true;
      this.isCollapsedFactura = true;
      this.isCollapsedCompras = true;
      this.isCollapsedContabilidad = true;
      this.isCollapsedConfiguracion = true;
      this.isCollapsedPlanificacion = true;
      this.isCollapsedAguasobrante = true;
      this.isCollapsedAguaganaderia = true;

      for (var i = 0; i < this.menuItems.length; i++) {
        //console.log(this.menuItems[i].path);
        //this.ubicacion=this.menuItems[i].path;

        if(ss[1]=="dashboard"){
          this.isCollapsedDashboard = false;
          console.log("dashboard");
          break;
        }
        else if(ss[1]=="users"){
          this.isCollapsedUsers = false;
          console.log("users");
          break;
        }
        else if(ss[1]=="medidor"){
          this.isCollapsedMedidor = false;
          console.log("medidor");
          break;
        }
        else if(ss[1]=="factura"){
          this.isCollapsedFactura = false;
          console.log("factura");
          break;
        }
        else if(ss[1]=="compras"||ss[1]=="proveedores"){
          this.isCollapsedCompras = false;
          console.log("compras");
          break;
        }
        else if(ss[1]=="contabilidad"){
          this.isCollapsedContabilidad = false;
          console.log("contabilidad");
          break;
        }
        else if(ss[1]=="configuracion"){
          this.isCollapsedConfiguracion = false;
          console.log("configuracion");
          break;
        }
        else if(ss[1]=="planificacion"){
          this.isCollapsedPlanificacion = false;
          console.log("planificacion");
          break;
        }
        else if(ss[1]=="aguasobrante"){
          this.isCollapsedAguasobrante = false;
          console.log("aguasobrante");
          break;
        }
        else if(ss[1]=="aguaganaderia"){
          this.isCollapsedAguaganaderia = false;
          console.log("aguaganaderia");
          break;
        }
      }
    }

    obtenerRoles(){
      //cargar menu menuItems
      //roles usuario 
      if(this.rol_menus==1){
        //lista usuarios
        this.roles_administrativos="superadmin";
        this.menuItems = this.sidebarService.menu;
      }
      else if(this.rol_menus==2){
        this.roles_administrativos="admin";
        this.menuItems = this.sidebarService.menu;
      }
      else if(this.rol_menus==3){
        this.roles_administrativos="cobrador";
        this.menuItems = this.sidebarService.menu;
      }
      else if(this.rol_menus==4){
        this.roles_administrativos="operador";
        this.menuItems = this.sidebarService.menuOperador;
      }
      else{
        this.roles_administrativos="user";
        //menu user cliente
        this.menuItems = this.sidebarService.menuCliente;
      }
      console.log(this.menuItems);
      console.log(this._usersService.getRol());
      console.log(this.roles_administrativos);
    }

}
