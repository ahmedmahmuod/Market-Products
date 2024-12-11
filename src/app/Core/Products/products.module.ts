import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './Components/all-products/all-products.component';
import { ProductsDetailsComponent } from './Components/products-details/products-details.component';
import { SharedModule } from "../../Shared/shared.module";
import { ProductComponent } from './Components/product/product.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [AllProductsComponent, ProductsDetailsComponent, ProductComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterLink,
    BrowserAnimationsModule,
    CardModule,
    ToastModule,
  ],
  providers: [MessageService]
})
export class ProductsModule { }
