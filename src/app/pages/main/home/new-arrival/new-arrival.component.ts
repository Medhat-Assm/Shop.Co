import { Component, Input, signal } from '@angular/core';
import { Product } from '../../../../core/interfaces/product';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-new-arrival',
  imports: [RouterLink, CurrencyPipe, TranslatePipe],
  templateUrl: './new-arrival.component.html',
  styleUrl: './new-arrival.component.scss',
})
export class NewArrivalComponent {
  @Input() products = signal<Product[] | null>(null);
}
