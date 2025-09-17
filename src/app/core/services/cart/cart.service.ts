import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
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

  updateCartProduct(pId: string | null, pCount: number): Observable<any> {
    return this.httpClient.put(
      `${environment.baseUrl}cart/${pId}`,
      {
        count: pCount,
      },
      {}
    );
  }

  getAllCart(): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}cart`);
  }
  removeSpecificProduct(pId: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}cart/${pId}`, {});
  }

  clearAllCart(): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}cart`, {});
  }
}
