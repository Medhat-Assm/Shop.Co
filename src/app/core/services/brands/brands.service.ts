import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  private readonly httpClient: HttpClient = inject(HttpClient);

  private $brand: Observable<any> | null = null;

  getAllBrands(): Observable<any> {
    if (!this.$brand) {
      this.$brand = this.httpClient.get<any>(`${environment.baseUrl}brands`).pipe(shareReplay(1));
    }
    return this.$brand;
  }
}
