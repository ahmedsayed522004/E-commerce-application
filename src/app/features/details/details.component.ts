import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from './../products/service/product-details/product-details.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductDetails } from '../products/models/product-details/product-details.interface';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {

  private readonly activateRoute = inject(ActivatedRoute);
  private readonly productDetailsService = inject(ProductDetailsService);

  productDetailsData:WritableSignal<ProductDetails> =signal<ProductDetails>({} as ProductDetails)

  ngOnInit(): void {

    this.activateRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productDetailsService.getSpecificProduct(id).subscribe({
          next: (res) => {
            this.productDetailsData.set(res.data)
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });

  }
}
