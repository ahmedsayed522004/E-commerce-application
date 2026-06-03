import { AllordersResponse } from './../models/allorders.interface';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CashordersResponse } from '../models/cashorders.interface';

@Injectable({
  providedIn: 'root',
})
export class AllordersService {
  private readonly httpclient = inject(HttpClient);
  private readonly plat_id = inject(PLATFORM_ID);

  createCashOrder(cartId: string, orderData: object): Observable<CashordersResponse> {
    return this.httpclient.post<CashordersResponse>(
      environment.base_url + `orders/${cartId}`,
      orderData,
    );
  }
  getUserOrderDetails(id: string | null): Observable<AllordersResponse> {
    return this.httpclient.get<AllordersResponse>(environment.base_url + `orders/user/${id}`);
  }
  checkOutSeassion(cartId: string, checkoutData: object): Observable<AllordersResponse> {
    return this.httpclient.post<AllordersResponse>(
      environment.base_url + `orders/checkout-session/${cartId}?url=http://localhost:4200`,
      checkoutData,
    );
  }
}
