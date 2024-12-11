import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { MessageService } from 'primeng/api';
import { Product } from '../../Models/product.model';

@Component({
  selector: 'app-all-products',
  standalone: false,
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  private productsService = inject(ProductsService);
  private meassageService = inject(MessageService);

  allProducts: Product[] = [];
  allCategories: string[] = [];
  isSpinner: boolean = false;
  cartData: any[] = [];

  ngOnInit() {
    this.getAllProducts();
    this.getAllCategories();
  }

  // Get All products
  getAllProducts() {
    this.isSpinner = true;
    return this.productsService.getAllProducts().subscribe((products: any) => {
      this.allProducts = products;
      this.isSpinner = false;
    })
  }

  // Get all Categories
  getAllCategories() {
    this.isSpinner = true;
    return this.productsService.getAllCategories().subscribe((category: any) => {
      this.allCategories = category;
      this.isSpinner = false;
    });
  }

  // Get products by Category
  getProductByCategory(event: any) {
    const category = event.target.value;
    this.isSpinner = true;
    (category === 'all') ? this.getAllProducts() : this.filterProductsByCategory(category);
  }

  // Filter products by Category
  filterProductsByCategory(category: string) {
    this.productsService.getProductsByCategory(category).subscribe((product: any) => {
      this.allProducts = product;
      this.isSpinner = false;
    });
  }

  // Add product To card 
  addProductToCard(product: any) {
    if (product.quantity > 0) {
      if ('cart' in localStorage) {
        this.cartData = JSON.parse(localStorage.getItem('cart')!);
        const exist = this.cartData.find((item: any) => item.item.id === product.item.id);
        this.productsService.cartCountSubject.next(this.cartData.length); // update count Cart Header
        if (exist) {
          this.meassageService.add({ severity: 'info', summary: 'Alert', detail: 'The product is already in your cart!' });

        } else {
          this.cartData.push(product);
          localStorage.setItem('cart', JSON.stringify(this.cartData));
          this.productsService.cartCountSubject.next(this.cartData.length); // update count Cart Header
          this.meassageService.add({ severity: 'success', summary: 'Successfully', detail: 'The product has been added to your cart!' });
        }

      } else {
        this.cartData.push(product)
        localStorage.setItem('cart', JSON.stringify(this.cartData))
        this.productsService.cartCountSubject.next(this.cartData.length); // update count Cart Header
      }
    }
  }
}
