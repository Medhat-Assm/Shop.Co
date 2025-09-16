import { Component, inject, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { PlatformService } from '../../../core/services/platform/platform.service';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, TranslatePipe, RouterLink],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  //#region Service Inject
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);
  //#endregion

  //#region Form Control
  passwordForm: FormGroup = new FormGroup(
    {
      currentPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
      ]),
      rePassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
      ]),
    },
    this.customValidation
  );
  //#endregion

  errorMessage = signal<string>('');

  // Custom Validation for Password and RePassword Match
  customValidation(password: AbstractControl): object | null {
    return password.get('password')?.value === password.get('rePassword')?.value
      ? null
      : { notSame: true };
  }

  //#endregion

  //#region Logout
  logout() {
    localStorage.removeItem('userToken');
    this.authService.userData.next(null);
    this.router.navigate(['/login']);
  }
  //#endregion

  changePassword() {
    if (this.passwordForm.valid) {
      this.authService.updateLoggedUserPassword(this.passwordForm.value).subscribe({
        next: (res) => {
          this.logout();
        },
        error: (err) => {
          this.errorMessage.set(err.error.errors.msg);
        },
      });
    }
  }
}
