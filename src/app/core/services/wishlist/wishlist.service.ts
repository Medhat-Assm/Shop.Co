import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly httpClient: HttpClient = inject(HttpClient);

  addProductToWishlist(productId: string | null): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}wishlist`, {
      productId: productId,
    });
  }
  getLoggedUserWishlist(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}wishlist`);
  }
}
