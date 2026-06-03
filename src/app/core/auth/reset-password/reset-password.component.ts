import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/authentication/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  errorMessage = '';
  successMessage = '';
  isLoading = false;

  newPassword = '';
  email = '';

  submitResetPasswordForm(): void {
    if (!this.email || !this.newPassword) return;

    this.isLoading = true;

    const data = {
      email: this.email,
      newPassword: this.newPassword,
    };

    this.authService.resetPassword(data).subscribe({
      next: (response: any) => {
        this.successMessage = response.message;
        this.errorMessage = '';
        this.isLoading = false;

        this.router.navigate(['/login']);
      },

      error: (error: any) => {
        this.errorMessage = error.error.message;
        this.successMessage = '';
        this.isLoading = false;
      },
    });
  }
}
