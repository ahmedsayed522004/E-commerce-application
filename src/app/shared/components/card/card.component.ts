import { CurrencyPipe } from '@angular/common';
import { Product } from './../../../core/models/products/product.interface';
import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SplitPipe } from '../../pipes/split-pipe';
import { CartService } from '../../../features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../../features/whishlist/services/whishlist.service';

@Component({
  selector: 'app-card',
  imports: [RouterLink, CurrencyPipe, SplitPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() cardProduct: Product = {} as Product;

  private readonly cartService = inject(CartService);
  private readonly whishlistService = inject(ServiceService);

  private readonly toastrService = inject(ToastrService);
  addProductItemToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.cartService.cartCount.set(res.numOfCartItems);
          console.log(res);
          this.toastrService.success(res.message, 'Freshcart');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addProductItemToWhishlist(id: string): void {
    this.whishlistService.addProductToWhishlist(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          console.log(res);
          this.whishlistService.whishListCount.set(res.data.length);
          this.toastrService.success(res.message, 'Freshcart');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
