import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient: HttpClient = inject(HttpClient);

  addProductCart(productId: string | null): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}cart`, {
      productId: productId,
    });
  }
}
