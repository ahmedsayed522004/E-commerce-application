import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/authentication/auth.service';
@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  currentPassword = '';
  password = '';
  rePassword = '';
  errorMessage = '';
  successMessage = '';

  submitChangePasswordForm(): void {
    if (!this.currentPassword || !this.password || !this.rePassword) return;

    if (this.password !== this.rePassword) {
      this.errorMessage = 'Passwords do not match';
      this.successMessage = '';
      return;
    }

    const data = {
      currentPassword: this.currentPassword,
      password: this.password,
      rePassword: this.rePassword,
    };

    this.authService.changePassword(data).subscribe({
      next: (response: any) => {
        this.successMessage = response.message;
        this.errorMessage = '';
        console.log(response);
        localStorage.setItem('userToken', response.token);
        this.router.navigate(['/home']);
      },

      error: (error: any) => {
        this.errorMessage = error.error.message;
        this.successMessage = '';
      },
    });
  }
}
