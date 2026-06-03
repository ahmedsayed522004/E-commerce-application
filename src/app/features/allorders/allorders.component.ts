import { AuthService } from './../../core/auth/service/authentication/auth.service';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AllordersService } from './services/allorders.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Allorders } from './models/allorders.interface';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllordersComponent {
  private readonly allOrdersService = inject(AllordersService);
  private readonly authService = inject(AuthService);
  allOrders: WritableSignal<Allorders[]> = signal<Allorders[]>([]);
  userId: string | null = null;
  ngOnInit(): void {
    this.getUserOrderDetails();
  }

  getUserOrderDetails(): void {
    this.getUserIdFromToken();
    if (this.userId) {
      this.allOrdersService.getUserOrderDetails(this.userId).subscribe({
        next: (res) => {
          console.log(res);
          this.allOrders.set(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  getUserIdFromToken(): void {
    this.authService.decodeUserToken();
    this.userId = this.authService.userDataDecoded.id;
  }
}
