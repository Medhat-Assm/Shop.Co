import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../../core/interfaces/product';
import { CartService } from '../../../../core/services/cart/cart.service';
import { ProductsService } from '../../../../core/services/products/products.service';
import { CurrencyPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { WishlistService } from '../../../../core/services/wishlist/wishlist.service';
import { PlatformService } from '../../../../core/services/platform/platform.service';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe, TranslatePipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  private readonly productService: ProductsService = inject(ProductsService);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly cartService: CartService = inject(CartService);
  private readonly wishlistService: WishlistService = inject(WishlistService);
  private readonly toastr: ToastrService = inject(ToastrService);
  private readonly platformService: PlatformService = inject(PlatformService);

  productId: string | null = '';
  product = signal<Product | null>(null);
  wishlistProducts = signal<Product[] | null>(null);
  isInWishlistFlag = signal<boolean>(false);
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((productId) => {
      this.productId = productId.get('id');

      // Get Specific Product Details
      this.productService.getSpecificProducts(this.productId).subscribe({
        next: (product) => {
          this.product.set(product.data);
          // console.log(product.data);
        },
        error: (error) => {
          console.error('Error fetching product details:', error);
        },
      });
    });

    if (this.platformService.checkPlatFormBrowser()) {
      this.wishlistService.getLoggedUserWishlist().subscribe({
        next: (res) => {
          this.wishlistProducts.set(res.data);
          this.isInWishlist(this.productId!);
        },
      });
    }
  }

  //#region Check if product added to wishlist before
  isInWishlist(productId: string): void {
    this.isInWishlistFlag.set(
      this.wishlistProducts()?.some((p) => p._id === productId || p.id === productId) ?? false
    );
  }

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
  addToWishlist(pId: string | null) {
    this.wishlistService.addProductToWishlist(pId).subscribe({
      next: (res) => {
        this.toastr.success(res.message, 'Wishlist Operation');
        this.wishlistService.getLoggedUserWishlist().subscribe({
          next: (res) => {
            this.wishlistProducts.set(res.data);
            this.isInWishlist(this.productId!);
          },
        });
      },
      error: (error) => {
        this.toastr.error(error.message, 'Wishlist Operation');
      },
    });
  }
}
