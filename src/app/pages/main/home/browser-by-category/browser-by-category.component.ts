import { Component, Input, signal } from '@angular/core';
import { Category } from '../../../../core/interfaces/category';
import { TranslatePipe } from '@ngx-translate/core';
import { CategoryCardComponent } from '../../../../shared/components/categories/category-card/category-card.component';

@Component({
  selector: 'app-browser-by-category',
  imports: [TranslatePipe, CategoryCardComponent],
  templateUrl: './browser-by-category.component.html',
  styleUrl: './browser-by-category.component.scss',
})
export class BrowserByCategoryComponent {
  @Input() categories = signal<Category[] | null>(null);
}
