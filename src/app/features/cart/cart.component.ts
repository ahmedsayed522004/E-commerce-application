import { CurrencyPipe } from '@angular/common';
import { CartDetails } from './models/cart-details.interface';
import { CartService } from './services/cart.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {

  private readonly cartService =inject(CartService);

  cartDetailsData:WritableSignal<CartDetails>=signal<CartDetails>({} as CartDetails)
item: any;

  ngOnInit(): void {
    this.getUserCartData();
    
  }
  getUserCartData():void{
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
       if(res.status==='success')
       {
        
        this.cartDetailsData.set(res.data)
       }
      },
      error:(err)=>{
        console.log(err)
      },
    })
  }

 removeProductItemFromCart(id: string): void {
  this.cartService.removeProductFromCart(id).subscribe({
    next: (res) => {
      if (res.status === 'success') {
        this.cartService.cartCount.set(res.numOfCartItems);
        this.cartDetailsData.set(res.data);
      }
    },
    error: (err) => {
      console.log(err);
    }
  });
}

updateProductCount(id:string , count:number):void{

  this.cartService.updateCaetProductQuantity(id,count).subscribe({
    next:(res)=>{
      if (res.status === 'success') {
         this.cartService.cartCount.set(res.numOfCartItems);
        this.cartDetailsData.set(res.data);
      }
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
}
