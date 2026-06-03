import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, WritableSignal, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { stored_Keys } from '../../../core/constants/storedKeys';
import { CartdataResponse } from '../models/cartdata.interface';
import { CartDetailsResponse } from '../models/cart-details.interface';
import { PaymentDetailsRespnce } from '../models/payment-details.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  
  private readonly HttpClient=inject(HttpClient);
  private readonly plat_id =inject(PLATFORM_ID)

  cartCount:WritableSignal<number>=signal<number>(0);

  myHeaders:object={}
  constructor(){
    if(isPlatformBrowser(this.plat_id)){
       this.myHeaders={
    headers:{
      token: localStorage.getItem(stored_Keys.userToken)!
    }
  }
    }
  }
  addProductToCart(id:string):Observable<CartdataResponse>{
    
    return this.HttpClient.post<CartdataResponse>(
      environment.base_url+'cart',
      {
        productId:id,
      },
     this.myHeaders
    )
  }

  getLoggedUserCart():Observable<CartDetailsResponse>{
    return this.HttpClient.get<CartDetailsResponse>( environment.base_url + 'cart' , this.myHeaders)
  }

  removeProductFromCart(id:string):Observable<CartDetailsResponse>{
  return this.HttpClient.delete<CartDetailsResponse>(environment.base_url + `cart/${id}`,this.myHeaders)
}

updateCaetProductQuantity(id:string , count:number):Observable<CartDetailsResponse>{
  return this.HttpClient.put<CartDetailsResponse>(environment.base_url + `cart/${id}`,
    {
      count:count,
    },
    this.myHeaders
  )
}

  checkoutSession(cartId :string , checkoutData:object):Observable<PaymentDetailsRespnce>{
    return this.HttpClient.post<PaymentDetailsRespnce>(environment.base_url + `orders/checkout-session/${cartId}?url=http://localhost:4200`,
      checkoutData,
      this.myHeaders,
    )
  }
}

