import { AlertController, LoadingController, NavController, Platform, ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class Util {

  hide: boolean

  constructor(public alertController: AlertController,
    public toastCtrl: ToastController,
    private router: Router,
    private loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public platform: Platform,
  ) { }

  async alertEpp(Titulo, mensaje) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: Titulo,
      // subHeader: 'Subtitle',
      message: mensaje,
      buttons: [{ text: 'Aceptar' }]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }

  async showLoading(mensaje: string) {
    this.hide = false
    await this.loadingCtrl.create({
      message: mensaje,
    }).then(load => {
      load.present()
      if (this.hide) {
        load.dismiss()
      }
    })
  }

  async hideLoader() {
    try {
      if (this.loadingCtrl.getTop() == undefined) return
      this.hide = true;
      await this.loadingCtrl.dismiss();
    }
    catch (e) {
      console.log("hideLoader", e)
    }
  }


  presentAlert(message: string, title: string = '', whitTitle: boolean = true, textBUtton = 'Aceptar', type = 'resolve', page = "/home") {
    return new Promise(async (resolve) => {
      if (whitTitle) {
        if (title == '')
          title ='Tienda'
      }
      const alert = await this.alertController.create({
        header: title,
        message: message,
        cssClass: 'my-custom-alert',
        buttons: [{
          text: textBUtton,
          handler: () => {
            resolve(true);
            /* if(type=='resolve')
               resolve(true);
             else
             this.navCtrl.navigateRoot(page);*/
          }
        }],
        backdropDismiss: false
      });
      await alert.present();
    })


  }




  async presentConfirm(message: string, title: string = '') {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: title,
        message: message,
        buttons: [{
          text: 'Cancelar',
          cssClass: 'secondary',
          handler: () => {
            resolve(false);
            //console.info('Cancel');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            resolve(true);
          }
        }],
        backdropDismiss: false
      });
      await alert.present();
    })
  }


}
