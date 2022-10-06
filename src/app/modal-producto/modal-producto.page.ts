import { Component, EventEmitter, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IonModal, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Producto } from '../model/Producto';
import { ServiceService } from '../services/service.service';
import { Util } from '../shared/util';

@Component({
  selector: 'app-modal-producto',
  templateUrl: 'modal-producto.page.html',
  styleUrls: ['modal-producto.page.scss'],
})


export class ModalProductoPage {

  @ViewChild(IonModal) modal: IonModal;

  private closeEvent: EventEmitter<string>;
  private fileImage: boolean;
  public accion: string;
  public title: string;
  public esRegistro = false;
  public esEdicion = false;
  public esDetalle = false;
  public producto: Producto;

  nombre : string;
  precio : string;
  stock : string;
  id : number;

  files: any = []
  imagenPrevia: any;

  constructor(
    private modalCtrl: ModalController,
    private util: Util,
    private serviceService: ServiceService,
    private sanitizer: DomSanitizer,) {}

  ngOnInit(){
    this.accion === 'nuevo' ? this.esRegistro = true : this.accion === 'editar' ? this.esDetalle = true : this.esEdicion = true;

    if( this.esEdicion || this.esDetalle ){
      this.nombre = this.producto.nombre
      this.precio = this.producto.precio
      this.stock = this.producto.stock
      this.id = this.producto.id
      this.imagenPrevia = 'http://127.0.0.1:8000/imagenes/'+this.producto.imagen
    }
  
  }

  public submitProducto() {

    if(this.nombre == '' || this.precio == null  || this.stock == null){
      this.util.presentAlert("Todos los campos son requeridos", 'Error');
    }else{
     
      this.util.showLoading('Trabajando...')

      let producto = {
        nombre: this.nombre,
        precio: this.precio,
        stock: this.stock,
      }
  
      if (this.esRegistro) {
        const registrarProducto = this.serviceService.crearProductos(producto).toPromise();
        Promise.all([registrarProducto]).then(res => {
  
       
          if(this.fileImage){
            this.util.hideLoader()
            this.loadImages(res[0].productId)
          }else{
            this.util.hideLoader()
            this.util.presentAlert("Producto registrado exitosamente", 'Exito');
            this.closeModal();
          }
  
        }).catch(err => {
          this.util.hideLoader()
          this.util.presentAlert("Error al registrar producto", 'Error');
        })
  
      } else  {
        let id = this.id
        const registrarProducto = this.serviceService.actualizarProductos(producto,id).toPromise();
        Promise.all([registrarProducto]).then(res => {
  
          if(this.fileImage){
            this.util.hideLoader()
            this.loadImages(res[0].productId)
          }else{
            this.util.hideLoader()
            this.util.presentAlert("Producto registrado exitosamente", 'Exito');
            this.closeModal();
          }
  
        }).catch(err => {
          this.util.hideLoader()
          this.util.presentAlert("Error al actualizar producto", 'Error');
        })
      }
    }
  }


  public openFile(event: any) {
    this.fileImage = true;
    const imagen = event.target.files[0];
    console.log(imagen.type);
    if (['image'].includes(imagen.type.slice(0, 5))) {

      this.files.push(imagen)
      this.blobFile(imagen).then((res: any) => {
        this.imagenPrevia = res.base;
      })
    } else {
      console.log('No es imagen');

    }
  }

  blobFile = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          blob: $event,
          image,
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          blob: $event,
          image,
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })

  public loadImages(id) {
    try {
      const formData = new FormData();
      this.files.forEach((item) => {
        formData.append('imagen', item)
        console.log(item)
      });
      formData.append('_method', 'PUT')
     const cargarImagen = this.serviceService.setImagen(formData,id).toPromise();
     Promise.all([cargarImagen]).then(res=>{
      this.util.presentAlert("Producto registrado exitosamente", 'Exito');
      this.closeModal();
     })
    } catch (e) {
      console.log('ERROR', e);
    }
  }

  public closeModal() {
    this.closeEvent.emit('');
    this.closeEvent.unsubscribe();
    this.modalCtrl.dismiss();
  }

  keyPress(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        // invalid character, prevent input
        event.preventDefault();
    }
}
}
