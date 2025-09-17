import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly httpClient: HttpClient = inject(HttpClient);

  checkoutSession(CartId: string | null, addressValue: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}orders/checkout-session/${CartId}?url=${environment.webHostUrl}`,
      {
        shippingAddress: addressValue,
      }
    );
  }
}
