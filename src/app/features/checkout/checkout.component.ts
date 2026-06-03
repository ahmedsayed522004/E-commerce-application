import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart/services/cart.service';
import { AllordersService } from '../allorders/services/allorders.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly cartService = inject(CartService);
  private readonly allordersService = inject(AllordersService);
  buttonId: string | null = null;
  cartId: string | null = null;
  ngOnInit(): void {
    this.getCartId();
  }

  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.cartId = urlParams.get('id');
      },
    });
  }
  onSubmitCheckoutForm(e: SubmitEvent): void {
    if (this.checkoutForm.valid) {
      // console.log(this.checkoutForm.value)
      // console.log(this.cartId)
      const ele = e.submitter as HTMLElement;
      console.log(ele);
      this.buttonId = ele.getAttribute('id');
      if (this.buttonId === 'visa') {
        this.cartService.checkoutSession(this.cartId!, this.checkoutForm.value).subscribe({
          next: (res) => {
            if (res.status === 'success') {
              window.open(res.session.url, '_self');
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else if (this.buttonId === 'cash') {
        this.allordersService.createCashOrder(this.cartId!, this.checkoutForm.value).subscribe({
          next: (res) => {
            if (res.status === 'success') {
              console.log(res);
              this.checkoutForm.reset();
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    }
  }

  checkoutForm: FormGroup = this.fb.group({
    shippingAddress: this.fb.group({
      details: [null, [Validators.required]],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/)],
      ],
      city: [null, [Validators.required]],
    }),
  });
}
