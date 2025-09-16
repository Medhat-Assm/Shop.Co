import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { Product } from '../../../core/interfaces/product';
import { ProductCardComponent } from './product-card/product-card.component';

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  //#region Service Inject
  private readonly productService: ProductsService = inject(ProductsService);
  //#endregion

  //#region Variables
  @Input() products = signal<Product[]>([]);
  //#endregion

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.products.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
