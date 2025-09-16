import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { User } from '../../../core/interfaces/user';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, TranslatePipe, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  //#region Service Inject
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);
  //#endregion

  //#region Form Groupe

  // Register Form Group (Controls , Validation)
  registerForm: FormGroup = new FormGroup(
    // 1st Argument for FormGroup (Form Controls)
    {
      // Form Controls(Data , Validation Array)
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
      ]),
      rePassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(01)[0125][0-9]{8}$/),
      ]),
    },
    // 2nd Argument for FormGroup (Custom Validation Function)
    this.customValidation
  );

  //#endregion

  //#region Custom Validation

  // Custom Validation for Password and RePassword Match
  customValidation(register: AbstractControl): object | null {
    return register.get('password')?.value === register.get('rePassword')?.value
      ? null
      : { notSame: true };
  }

  //#endregion

  errorMessage = signal<string>('');

  signUp() {
    if (this.registerForm.valid) {
      this.authService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          // console.log(res);

          if (res.message === 'success') {
            // Programming Routing
            this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          // console.log(err);
          this.errorMessage.set(err.error.message);
        },
      });
    }
  }
}
