import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { stored_Keys } from '../../../core/constants/storedKeys';
import { isPlatformBrowser } from '@angular/common';
import { WhishlistResponse } from '../models/whishlist.interface';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private readonly httpclient = inject(HttpClient);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  whishListCount: WritableSignal<number> = signal<number>(0);

  addProductToWhishlist(id: string): Observable<any> {
    return this.httpclient.post(environment.base_url + `wishlist`, {
      productId: id,
    });
  }

  removeProductFromWhishlist(id: string): Observable<any> {
    return this.httpclient.delete(environment.base_url + `wishlist/${id}`);
  }
  getLoggedUserWhishlist(): Observable<WhishlistResponse> {
    return this.httpclient.get<WhishlistResponse>(environment.base_url + 'wishlist');
  }
  updateWhishlistProductQuantity(id: string, count: number): Observable<WhishlistResponse> {
    return this.httpclient.put<WhishlistResponse>(environment.base_url + `wishlist/${id}`, {
      count: count,
    });
  }
}
