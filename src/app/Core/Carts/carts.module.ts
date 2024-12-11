import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../Shared/shared.module';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, FormsModule, SharedModule, ToastModule],
  exports: [CartComponent],

})
export class CartsModule { }
