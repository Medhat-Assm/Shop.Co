import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlatformService } from '../../../core/services/platform/platform.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, TranslatePipe, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  //#region Service Inject
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);
  private readonly platformService: PlatformService = inject(PlatformService);
  //#endregion

  //#region Form Control
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
    ]),
  });
  //#endregion

  errorMessage = signal<string>('');

  login() {
    if (this.loginForm.valid) {
      this.authService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            if (this.platformService.checkPlatFormBrowser()) {
              // 1- localstorage ==> token
              localStorage.setItem('userToken', res.token);
              // 2- Service ==> shared
              this.authService.setUserData();
              // 3- Routing ==> Home
              this.router.navigate(['/home']);
            }
          }
        },
        error: (err) => {
          this.errorMessage.set(err.error.message);
        },
      });
    }
  }
}
