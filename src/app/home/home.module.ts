import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { ModalProductoPage } from '../modal-producto/modal-producto.page'
import { ModalProductoPageModule } from '../modal-producto/modal-producto.module';


@NgModule({
  entryComponents:[ModalProductoPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ModalProductoPageModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
