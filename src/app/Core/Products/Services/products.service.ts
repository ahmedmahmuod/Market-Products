import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);

  constructor() {
    this.loadCartCount()
  }

  // Get all products
  getAllProducts() {
    return this.http.get(environment.baseAPIurl + 'products');
  }

  // Get all getAllCategories
  getAllCategories() {
    return this.http.get(environment.baseAPIurl + 'products/categories');
  }

  // Get products By category 
  getProductsByCategory(category: string) {
    return this.http.get(environment.baseAPIurl + 'products/category/' + category);

  }

  // Get Product Details 
  getProductDetailsById(id: any) {
    return this.http.get(environment.baseAPIurl + 'products/' + id);
  }

  // Update count of products counts in cart Header
  cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  private loadCartCount() {
    const data = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartCountSubject.next(data.length);
  }
}