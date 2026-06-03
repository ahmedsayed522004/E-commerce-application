import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Product } from '../../core/models/products/product.interface';
import { ProductsService } from '../../core/services/products/products.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-products',
  imports: [CardComponent, NgxPaginationModule, SearchPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  private readonly productService = inject(ProductsService);
  private readonly ngxSpinnerService = inject(NgxSpinnerService);

  productList: WritableSignal<Product[]> = signal<Product[]>([]);

  pagination: PaginationInstance = {
    id: 'products',
    itemsPerPage: 40,
    currentPage: 1,
    totalItems: 0,
  };

  ngOnInit(): void {
    this.getAllProductsData();
  }

  text: string = '';

  getAllProductsData(): void {
    this.ngxSpinnerService.show();

    this.productService
      .getAllproducts(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe({
        next: (res) => {
          this.ngxSpinnerService.hide();
          this.productList.set(res.data);
          this.pagination.totalItems = res.results;
        },
        error: (err) => {
          this.ngxSpinnerService.hide();
          console.log(err);
        },
      });
  }
  pageChanged(Page: number): void {
    this.pagination.currentPage = Page;
    this.getAllProductsData();
  }
}
