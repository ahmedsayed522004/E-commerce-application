import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Categories } from '../../core/models/categories/categories.interface';

@Component({
  selector: 'app-categories',
  imports: [CarouselModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  categoriesList: WritableSignal<Categories[]> = signal<Categories[]>([]);

  ngOnInit(): void {
    this.categoriesService.getallcategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categoriesList.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
