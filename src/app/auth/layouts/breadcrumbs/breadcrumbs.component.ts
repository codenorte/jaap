import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Data, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import {Location} from '@angular/common';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo: string;
  public tituloraiz:string;
  public tituloSubs$: Subscription;

  constructor(private router: Router, private _location: Location) {
    this.tituloSubs$ = this.getTituloPagina()
    .subscribe( ({tituloraiz,titulo}) => {
      //console.log(titulo);
      //console.log(tituloraiz);
      // El argumento recibido es el objeto data, al que le realizamos un destructuring
      // para obtener cada clave como un parámetro
      this.tituloraiz=tituloraiz;
      this.titulo = titulo;
      // Titulo que se mostará en la pestaña del navegador para la página
      document.title = titulo;
    });

    this.buscartitulo();
  }

  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getTituloPagina(): Observable<Data> {
    return this.router.events
      .pipe(
        filter( event => event instanceof ActivationEnd),
        filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
        map( (event: ActivationEnd) => event.snapshot.data )
      );
  }

  buscartitulo(){

    this.getTituloPagina().subscribe(
        response=>{
          //console.log(response);
        },
        error=>{
        }
        );

  }
  regresarPagina() {
    this._location.back();
  }

}
