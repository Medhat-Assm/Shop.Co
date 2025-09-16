import { Component, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [TranslatePipe, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  //#region Service Inject
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);
  //#endregion

  //#region Variables
  errorMessage = signal<string>('');
  //#endregion

  //#region Form Control
  forgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
  //#endregion

  forgetPassword() {
    this.authService.forgetPassword(this.forgetPasswordForm.value).subscribe(() => {
      this.router.navigate(['/verification-code']);
    });
  }
}
