import { Component, inject, Input, signal } from '@angular/core';
import { BrandsService } from '../../../core/services/brands/brands.service';
import { Brand } from '../../../core/interfaces/brand';
import { BrandCardComponent } from './brand-card/brand-card.component';

@Component({
  selector: 'app-brands',
  imports: [BrandCardComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent {
  private readonly brandsService: BrandsService = inject(BrandsService);

  //#region Variables
  @Input() categories = signal<Brand[]>([]);
  //#endregion

  ngOnInit(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.categories.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
