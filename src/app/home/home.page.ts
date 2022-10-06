import { Component, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ModalProductoPage } from '../modal-producto/modal-producto.page';
import { Producto } from '../model/Producto';
import { ServiceService } from '../services/service.service';
import { Util } from '../shared/util';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public productos = Array<Producto>();

  constructor(
    private modal: ModalController,
    private serviceService: ServiceService,
    private util: Util,
   ) {}
  ngOnInit() {
    this.cargarProductos()
  }

  public async openModal(accion: string,producto:Producto){
    let event = new EventEmitter<string>();
    event.subscribe(() => {
      this.cargarProductos();
    })
    const modal = await this.modal.create({
      component: ModalProductoPage,
      cssClass: 'modal-producto-css',
      componentProps: {
        producto:producto,
        accion:accion,
        closeEvent:event,
      }
    })
    await modal.present();
  }

  public cargarProductos() {

    this.util.showLoading("Cargando....")

    const productos = this.serviceService.getProductos().toPromise();
    Promise.all([productos]).then(res => {
      this.productos = res[0];
      console.log(this.productos)
      this.util.hideLoader()
    }).catch(err => {
      console.log(err)
    })
  }

  public eliminar(id) {
    this.util.presentConfirm("Está seguro que desea eliminar producto?").then(response => {

      if (response) {
        this.util.showLoading("Cargando....")
        const productos = this.serviceService.eliminarProducto(id).toPromise();
        Promise.all([productos]).then(res => {
          this.util.hideLoader()
          this.util.presentAlert("Producto eliminado exitosamente", "Mensaje")
          this.cargarProductos()
        }).catch(err => {
          console.log(err)
        })
      }

    })
  }



}
