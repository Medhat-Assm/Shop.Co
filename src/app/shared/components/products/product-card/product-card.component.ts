import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../../core/interfaces/product';
import { CurrencyPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { CartService } from '../../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-card',
  imports: [RouterLink, CurrencyPipe, TranslatePipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  private readonly cartService: CartService = inject(CartService);
  private readonly toastr: ToastrService = inject(ToastrService);

  @Input() oneProduct: Product = {} as Product;

  addToCart(pId: string | null) {
    this.cartService.addProductCart(pId).subscribe({
      next: (res) => {
        this.toastr.success(res.message, 'Cart Operation');
      },
      error: (error) => {
        this.toastr.error(error.message, 'Cart Operation');
      },
    });
  }
}
