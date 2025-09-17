import { Component, inject, OnInit, signal } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { NewArrivalComponent } from './new-arrival/new-arrival.component';
import { ProductsService } from '../../../core/services/products/products.service';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { BrandsService } from '../../../core/services/brands/brands.service';
import { Product } from '../../../core/interfaces/product';
import { PlatformService } from '../../../core/services/platform/platform.service';
import { Category } from '../../../core/interfaces/category';
import { Brand } from '../../../core/interfaces/brand';
import { BrowserByCategoryComponent } from './browser-by-category/browser-by-category.component';
import { TopSellingComponent } from './top-selling/top-selling.component';
import { TestimonialComponent } from './testimonial/testimonial.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    NewArrivalComponent,
    BrowserByCategoryComponent,
    TopSellingComponent,
    TestimonialComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly productService: ProductsService = inject(ProductsService);
  private readonly categoriesService: CategoriesService = inject(CategoriesService);
  private readonly brandsService: BrandsService = inject(BrandsService);
  private readonly platformService: PlatformService = inject(PlatformService);

  products = signal<Product[] | null>(null);
  categories = signal<Category[] | null>(null);
  brands = signal<Brand[] | null>(null);

  ngOnInit(): void {
    if (this.platformService.checkPlatFormBrowser()) {
      this.productService.getAllProducts().subscribe((res) => this.products.set(res.data));
      this.categoriesService.getAllCategories().subscribe((res) => this.categories.set(res.data));
      this.brandsService.getAllBrands().subscribe((res) => this.brands.set(res.data));
    }
  }
}
