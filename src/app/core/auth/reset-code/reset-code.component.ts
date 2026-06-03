import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../service/authentication/auth.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-code',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reset-code.component.html',
  styleUrl: './reset-code.component.css',
})
export class ResetCodeComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  errorMessage: string = '';
  successMessage: string = '';
  isLoading = false;

  resetCodeForm = new FormGroup({
    code: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
  });

  submitResetCodeForm(): void {
    if (this.resetCodeForm.invalid) return;

    this.isLoading = true;

    const data = {
      resetCode: this.resetCodeForm.get('code')?.value ?? '',
    };

    this.authService.verifyResetCode(data).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.errorMessage = '';
        this.isLoading = false;
        this.router.navigate(['/reset-password']);
      },

      error: (error) => {
        this.errorMessage = error.error.message;
        this.successMessage = '';
        this.isLoading = false;
      },
    });
  }
}
