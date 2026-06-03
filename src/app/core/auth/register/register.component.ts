import { Component, inject, signal, WritableSignal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../service/authentication/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  private readonly authService = inject(AuthService)

  private readonly router = inject(Router)

  errorMessage: WritableSignal<string> = signal<string>('')

  isLoading: WritableSignal<boolean> = signal<boolean>(false)

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),

      email: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),

      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
        ),
      ]),

      rePassword: new FormControl(null, [Validators.required]),

      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
        ),
      ]),
    },
    {
      validators: this.handleConfirmPassword,
    }
  );

  // ================= Confirm Password =================
  handleConfirmPassword(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const repassword = group.get('rePassword')?.value;

    if (password === repassword) {
      return null;
    }

    return { mismatch: true };
  }

  // ================= Submit =================
  submitRegisterForm(): void {

  if (this.registerForm.valid) {

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.sendRegisterData(this.registerForm.value).subscribe({

      next: (res) => {

        this.isLoading.set(false);

        if (res.message === 'success') {

          this.registerForm.reset();   // ✅ هنا بعد النجاح
          this.router.navigate(['/login']);

        }
      },

      error: (err: HttpErrorResponse) => {

        console.log(err);
        this.isLoading.set(false);
        this.errorMessage.set(err.error.message);

      }

    });

  } else {

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!"
    });

  }

}

}
