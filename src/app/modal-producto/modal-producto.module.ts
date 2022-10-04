import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ModalProductoPage } from './modal-producto.page';

import { ModalProductoPageRoutingModule } from './modal-producto-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalProductoPageRoutingModule,
    
  ],
  declarations: [ModalProductoPage]
})
export class ModalProductoPageModule {}
