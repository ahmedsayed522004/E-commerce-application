import { Component, inject, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { ServiceService } from './services/whishlist.service';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { Whishlist } from './models/whishlist.interface';
import { stored_Keys } from '../../core/constants/storedKeys';

@Component({
  selector: 'app-whishlist',
  imports: [CurrencyPipe],
  templateUrl: './whishlist.component.html',
  styleUrl: './whishlist.component.css',
})
export class WhishlistComponent {
  private readonly whishlistService = inject(ServiceService);
  whishListData: WritableSignal<Whishlist[]> = signal<Whishlist[]>([]);
  private readonly plat_id = inject(PLATFORM_ID);
  ngOnInit(): void {
    if (isPlatformBrowser(this.plat_id)) {
      const token = localStorage.getItem(stored_Keys.userToken);
      if (token) {
        this.getUserWhishlistData();
      }
    }
  }
  getUserWhishlistData(): void {
    this.whishlistService.getLoggedUserWhishlist().subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.whishListData.set(res.data);
          this.whishlistService.whishListCount.set(res.count);
          console.log(res);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  removeProductItemFromWhishlist(id: string): void {
    this.whishlistService.removeProductFromWhishlist(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.getUserWhishlistData();
          console.log(res);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
