import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { PlatformService } from '../../../../core/services/platform/platform.service';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  //#region Service Inject
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);
  private readonly platformService: PlatformService = inject(PlatformService);
  //#endregion

  //#region Form Control
  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
    ]),
  });
  //#endregion

  errorMessage = signal<string>('');

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      this.authService
        .resetPassword(this.resetPasswordForm.value)
        .subscribe(() => this.router.navigate(['/login']));
    }
  }
}
