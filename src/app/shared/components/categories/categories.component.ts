import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { Category } from '../../../core/interfaces/category';
import { CategoryCardComponent } from './category-card/category-card.component';

@Component({
  selector: 'app-categories',
  imports: [CategoryCardComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService: CategoriesService = inject(CategoriesService);

  //#region Variables
  @Input() categories = signal<Category[]>([]);
  //#endregion

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
