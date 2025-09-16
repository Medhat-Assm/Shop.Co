import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly httpClient: HttpClient = inject(HttpClient);

  private $product: Observable<any> | null = null;

  getAllProducts(): Observable<any> {
    if (!this.$product) {
      this.$product = this.httpClient
        .get<any>(`${environment.baseUrl}products`)
        .pipe(shareReplay(1));
    }
    return this.$product;
  }
  getSpecificProducts(pId: string | null): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}products/${pId}`);
  }
}
