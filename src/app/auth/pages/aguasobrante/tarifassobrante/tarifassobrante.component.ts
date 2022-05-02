import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
//services
import { UsersService } from '../../../../services/auth/users.service';
import { TarifassobranteService } from '../../../../services/auth/Tarifassobrante.service';

//notificacion
import { ToastrService } from '../../../../common/service/toastr.service';
//modal
import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
//model 
import { Tarifassobrante } from '../../../../model/Tarifassobrante';

@Component({
  selector: 'app-tarifassobrante',
  templateUrl: './tarifassobrante.component.html',
  styleUrls: ['./tarifassobrante.component.css']
})
export class TarifassobranteComponent implements OnInit {
  rol_menus;
  nombre_rol;
  roles_administrativos:string="";

  //modal boostrap
  closeResult: string;

  temp_var: Object = false;

  tarifassobrante:Tarifassobrante;
  tarifassobrante_id:number=0;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _usersService:UsersService,
    private _TarifassobranteService:TarifassobranteService,
    private toastrService:ToastrService,
    private modalService: NgbModal,
    ) {
    this.rol_menus = this._usersService.getRol();
        this.nombre_rol = this._usersService.getNombreRol();

        this.tarifassobrante = new Tarifassobrante(null,null,null,null);
  }

  ngOnInit(): void {
    this.cargar();
  }

  /*===================================
  =            metodosapis            =
  ===================================*/
  
  /*
  * Obtener Tarifassobrante
  */
  getTarifassobranteLatest(){
    this._TarifassobranteService.getTarifassobranteLatest().subscribe(
      res => {
        if(res.code == 200){
          console.log(res);
          this.temp_var = true;
          this.tarifassobrante =res.data;
          this.tarifassobrante_id= res.data.IDTARIFASSOBRANTE;
        }else{
          console.log(res);
        }
      },
      error => {
        console.log(<any>error);
      }
      );
  }

  /*
  * Obtener tarifas
  */
  editTarifassobrante(){
    console.log(this.tarifassobrante);
    console.log(this.tarifassobrante_id);
    this._TarifassobranteService.editTarifassobrante(this.tarifassobrante_id,this.tarifassobrante).subscribe(
      res => {
        if(res.code == 200){
          console.log(res);
          this.getTarifassobranteLatest();
          this.toastrService.Success(res.message,res.title);
        }else{
          console.log(res);
          this.toastrService.Error("Error","Error al editar dato");
        }
      },
      error => {
        console.log(<any>error);
        this.toastrService.Error(<any>error.error.error,"Error");
      }
      );
  }

    
  /*=====  End of metodosapis  ======*/

  /**************************************
  *************** Modales****************
  ***************************************
  */
  editarTarifasOpenModal(editTarifasModal) {
    this.modalService.open(editTarifasModal, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => {
        this.closeResult = `cerrado con: ${result}`;
      },
      (reason) => {
        //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        //console.log(reason);
    });
  }
  private getDismissReason(reason: any): string {
    
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  
  cargar(){
    if(this.rol_menus==1||this.rol_menus==2||this.rol_menus==3){
      this.roles_administrativos="admin";
      this.getTarifassobranteLatest();
    }
    else if(this.rol_menus==4){
      this.roles_administrativos="operador";
    }
    else{
      this.roles_administrativos="user";
    }
    console.log(this._usersService.getRol());
    console.log(this.roles_administrativos);

  }
}
