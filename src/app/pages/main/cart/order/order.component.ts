import { Component, inject, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  ɵInternalFormsSharedModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../../core/services/order/order.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-order',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  private readonly order: OrderService = inject(OrderService);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  cartId = signal<string | null>(null);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((p) => {
      this.cartId.set(p.get('id'));
    });
  }

  addressForm: FormGroup = new FormGroup({
    details: new FormControl(null, Validators.required),
    phone: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^(01)[0125][0-9]{8}$/),
    ]),
    city: new FormControl(null, Validators.required),
  });

  checkout() {
    this.order.checkoutSession(this.cartId(), this.addressForm.value).subscribe({
      next: (res) => {
        window.location.href = res.session.url;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
