import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../Models/product.model';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input({ required: true }) productData!: Product;
  @Output() productAdded = new EventEmitter();

  addButton: boolean = false;
  amount: number = 0;

  add() {
    this.productAdded.emit({ item: this.productData, quantity: this.amount });
    this.addButton = !this.addButton;
  }

}
