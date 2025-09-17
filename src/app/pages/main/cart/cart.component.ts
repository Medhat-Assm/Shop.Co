import { Component, inject, OnInit, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from '../../../core/interfaces/cart-item';
import { CartService } from '../../../core/services/cart/cart.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [TranslatePipe, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly cartService: CartService = inject(CartService);
  private readonly toastr: ToastrService = inject(ToastrService);
  private readonly router: Router = inject(Router);

  cartItems = signal<CartItem[]>([]);
  totalPrice = signal<CartItem[]>([]);
  cartId = signal<string>('');

  ngOnInit(): void {
    this.getAllCart();
  }

  removeItem(pId: string) {
    this.cartService.removeSpecificProduct(pId).subscribe({
      next: () => {
        this.toastr.success('Product removed from cart', 'Cart Operation');
        this.getAllCart();
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  getAllCart() {
    this.cartService.getAllCart().subscribe({
      next: (item) => {
        this.cartItems.set(item.data.products);
        this.totalPrice.set(item.data.totalCartPrice);
        // console.log(item.data.products);

        this.cartId.set(item.cartId);
        console.log(this.cartId());
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  updateItemCount(itemCount: number, pId: string) {
    if (itemCount <= 0) {
      this.removeItem(pId);
    } else if (itemCount > 20) {
      this.toastr.error('You can not add more than 20 items', 'Cart Operation');
    } else {
      this.cartService.updateCartProduct(pId, itemCount).subscribe({
        next: () => {
          this.toastr.success('Product count added', 'Cart Operation');
          this.getAllCart();
        },
        error: (error) => {
          console.error('Error fetching products:', error);
        },
      });
    }
  }

  clearCart() {
    let userResp = confirm('Are you sure you want to clear the cart?');
    if (!userResp) return;
    this.cartService.clearAllCart().subscribe({
      next: () => {
        this.toastr.success('All products removed from cart', 'Cart Operation');
        this.getAllCart();
        this.router.navigate(['/home']);
      },
    });
  }

  checkout() {
    // Cart ID
    // route ==> address
    this.router.navigate(['/order', this.cartId()]);
  }
}
