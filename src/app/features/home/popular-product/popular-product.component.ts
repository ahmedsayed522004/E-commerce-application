import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ProductsService } from '../../../core/services/products/products.service';
import { Product } from '../../../core/models/products/product.interface';

@Component({
  selector: 'app-popular-product',
  imports: [CardComponent],
  templateUrl: './popular-product.component.html',
  styleUrl: './popular-product.component.css',
})
export class PopularProductComponent implements OnInit {
private readonly productService = inject(ProductsService)

  productList:WritableSignal <Product[]>= signal<Product[]>([])

  ngOnInit(): void {
    this.productService.getAllproducts().subscribe({
      next:(res)=>{
       this.productList.set(res.data);
      },
      error:(err)=>{
        console.log(err)
      },
    })
  }
}
