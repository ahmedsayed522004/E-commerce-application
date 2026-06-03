import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../service/authentication/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { stored_Keys } from '../../constants/storedKeys';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  errorMessage: WritableSignal<string> = signal('');
  isLoading: WritableSignal<boolean> = signal(false);

  refsubSubscribtion: Subscription = new Subscription();

  isSubmitted: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),
    ]),
  });
  flag: boolean = true;

  // ================= Submit =================
  submitLoginForm(): void {
    this.isSubmitted = true;

    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');

      this.refsubSubscribtion.unsubscribe();
      this.refsubSubscribtion = this.authService.sendLoginData(this.loginForm.value).subscribe({
        next: (res) => {
          this.isLoading.set(false);

          if (res.message === 'success') {
            this.loginForm.reset();
            this.isSubmitted = false;

            localStorage.setItem(stored_Keys.userToken, res.token);
            this.authService.decodeUserToken();

            this.router.navigate(['/home']);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading.set(false);
          this.errorMessage.set(err.error.message);
        },
      });
    }
  }
}
