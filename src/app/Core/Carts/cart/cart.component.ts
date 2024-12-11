import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../Products/Services/products.service';
import { CartService } from '../Services/cart.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private productService = inject(ProductsService);
  private cartService = inject(CartService);
  private meassageService = inject(MessageService);

  cartData: any = {};
  totalPrices = signal<any>(0);
  isSpinner: boolean = false;

  ngOnInit() {
    this.getProductsCartList()
    this.getTotalPriceCart()
  }

  // Get Products of Cart
  getProductsCartList() {
    if ('cart' in localStorage) {
      this.cartData = JSON.parse(localStorage.getItem('cart')!);
    }
  }

  // Get total Price 
  getTotalPriceCart() {
    this.totalPrices = signal(0);
    let total = 0;
    for (let item of this.cartData) {
      total += item.item.price * item.quantity;
    }
    this.totalPrices.set(total);
  }

  // Minus Amount
  minusAmount(index: number) {
    if (this.cartData[index].quantity > 1) {
      this.cartData[index].quantity--;
      localStorage.setItem('cart', JSON.stringify(this.cartData));
      this.getTotalPriceCart();
    }
  }

  // Plus Amount 
  plusAmount(index: number) {
    this.cartData[index].quantity++;
    localStorage.setItem('cart', JSON.stringify(this.cartData));
    this.getTotalPriceCart();
  }

  // Change Detect 
  changeDetect() {
    localStorage.setItem('cart', JSON.stringify(this.cartData));
    this.getTotalPriceCart()

  }

  // Delete Product from Cart 
  deleteProductCart(index: number) {
    this.cartData.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartData));
    this.productService.cartCountSubject.next(this.cartData.length)
    this.getTotalPriceCart()
    this.meassageService.add({ severity: 'success', summary: 'Successfully', detail: 'The product has been deleted from the cart' });

  }

  // Clear Cart Data 
  clearCartData() {
    if (this.cartData.length > 0) {
      const confirmClear = window.confirm('هل أنت متأكد أنك تريد مسح بيانات السلة؟');
      if (confirmClear) {
        localStorage.removeItem('cart');
        this.cartData = [];
        this.getTotalPriceCart();
        this.changeDetect();
        this.productService.cartCountSubject.next(this.cartData.length)
        this.meassageService.add({ severity: 'success', summary: 'Successfully', detail: 'Success! The cart is cleard!' });
      }
    }
  }

  // Add Order
  addOrder() {
    let products = this.cartData.map((product: any) => {
      return { productId: product.item.id, quantity: product.quantity }
    })

    let Model = {
      userId: 5,
      date: new Date(),
      products: products,
    }
    this.isSpinner = true;

    this.cartService.sendOrderCart(Model).subscribe((res) => {
      this.isSpinner = false;
      localStorage.removeItem('cart');
      this.cartData = [];
      this.getTotalPriceCart();
      this.changeDetect();
      this.productService.cartCountSubject.next(this.cartData.length)
      this.meassageService.add({ severity: 'success', summary: 'Successfully', detail: 'Order send successfully' });
    })
  }
}
