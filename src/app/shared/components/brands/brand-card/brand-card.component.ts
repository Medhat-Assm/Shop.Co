import { Component, Input } from '@angular/core';
import { Brand } from '../../../../core/interfaces/brand';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-brand-card',
  imports: [TranslatePipe],
  templateUrl: './brand-card.component.html',
  styleUrl: './brand-card.component.scss',
})
export class BrandCardComponent {
  @Input() oneBrand: Brand = {} as Brand;
}
