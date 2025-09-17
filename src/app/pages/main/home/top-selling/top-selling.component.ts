import { CurrencyPipe } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Product } from '../../../../core/interfaces/product';

@Component({
  selector: 'app-top-selling',
  imports: [RouterLink, CurrencyPipe, TranslatePipe],
  templateUrl: './top-selling.component.html',
  styleUrl: './top-selling.component.scss',
})
export class TopSellingComponent {
  @Input() products = signal<Product[] | null>(null);
}
