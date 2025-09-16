import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly httpClient: HttpClient = inject(HttpClient);

  private $category: Observable<any> | null = null;

  getAllCategories(): Observable<any> {
    if (!this.$category) {
      this.$category = this.httpClient
        .get<any>(`${environment.baseUrl}categories`)
        .pipe(shareReplay(1));
    }
    return this.$category;
  }
}
