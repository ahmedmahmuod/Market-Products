import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);

  sendOrderCart(model: any) {
    return this.http.post(environment.baseAPIurl + 'carts', model);
  }
}
