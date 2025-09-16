import { Component, Input } from '@angular/core';
import { Category } from '../../../../core/interfaces/category';

@Component({
  selector: 'app-category-card',
  imports: [],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
})
export class CategoryCardComponent {
  @Input() oneCategory: Category = {} as Category;
}
