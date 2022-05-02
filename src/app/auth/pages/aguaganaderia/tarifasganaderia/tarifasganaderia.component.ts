import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
//services
import { UsersService } from '../../../../services/auth/users.service';
import { TarifasganaderiaService } from '../../../../services/auth/tarifasganaderia.service';

//notificacion
import { ToastrService } from '../../../../common/service/toastr.service';
//modal
import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
//model 
import { Tarifasganaderia } from '../../../../model/tarifasganaderia';


@Component({
  selector: 'app-tarifasganaderia',
  templateUrl: './tarifasganaderia.component.html',
  styleUrls: ['./tarifasganaderia.component.css']
})
export class TarifasganaderiaComponent implements OnInit {

  rol_menus;
  nombre_rol;
  roles_administrativos:string="";

  //modal boostrap
  closeResult: string;

  temp_var: Object = false;

  tarifasganaderia:Tarifasganaderia;
  tarifasganaderia_id:number=0;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _usersService:UsersService,
    private _tarifasganaderiaService:TarifasganaderiaService,
    private toastrService:ToastrService,
    private modalService: NgbModal,
    ) {
    this.rol_menus = this._usersService.getRol();
        this.nombre_rol = this._usersService.getNombreRol();

        this.tarifasganaderia = new Tarifasganaderia(null,null,null,null);
  }

  ngOnInit(): void {
    this.cargar();
  }

  /*===================================
  =            metodosapis            =
  ===================================*/
  
  /*
  * Obtener tarifasganaderia
  */
  getTarifasganaderiaLatest(){
    this._tarifasganaderiaService.getTarifasganaderiaLatest().subscribe(
      res => {
        if(res.code == 200){
          console.log(res);
          this.temp_var = true;
          this.tarifasganaderia =res.data;
          this.tarifasganaderia_id= res.data.IDTARIFASGANADERIA;
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
  editTarifasganaderia(){
    console.log(this.tarifasganaderia);
    this._tarifasganaderiaService.editTarifasganaderia(this.tarifasganaderia_id,this.tarifasganaderia).subscribe(
      res => {
        if(res.code == 200){
          console.log(res);
          this.getTarifasganaderiaLatest();
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
      this.getTarifasganaderiaLatest();
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
