import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../service/authentication/auth.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  errorMessage: string = '';
  successMessage: string = '';

  isLoading = false;

  forgetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  submitForgetPasswordForm(): void {
    if (this.forgetPasswordForm.invalid) return;

    this.isLoading = true;

    const email = this.forgetPasswordForm.value.email as string;

    this.authService.forgetPassword(email).subscribe({
      next: (response: any) => {
        this.successMessage = response.message;
        this.errorMessage = '';
        this.isLoading = false;

        this.router.navigate(['/reset-code']);
      },
      error: (error) => {
        this.errorMessage = error.error.message;
        this.successMessage = '';
        this.isLoading = false;
      },
    });
  }
}
