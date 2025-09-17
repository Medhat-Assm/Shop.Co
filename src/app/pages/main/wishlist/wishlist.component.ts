import { Component, inject, OnInit, signal } from '@angular/core';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { Product } from '../../../core/interfaces/product';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-wishlist',
  imports: [TranslatePipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService: WishlistService = inject(WishlistService);
  wishlistProducts = signal<Product[] | null>(null);
  ngOnInit(): void {
    this.getWishlistProduct();
  }

  removeFromWishlist(productId: string) {
    this.wishlistService
      .removeProductFromWishlist(productId)
      .subscribe(() => this.getWishlistProduct());
  }

  getWishlistProduct() {
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this.wishlistProducts.set(res.data);
      },
    });
  }
}
