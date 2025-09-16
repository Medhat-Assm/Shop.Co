import { Component, inject, OnInit, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-verification-code',
  imports: [TranslatePipe, ReactiveFormsModule, RouterLink],
  templateUrl: './verification-code.component.html',
  styleUrl: './verification-code.component.scss',
})
export class VerificationCodeComponent implements OnInit {
  //#region Service Inject
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);
  //#endregion
  //#region Variables
  errorMessage = signal<string>('');
  resendBtn = signal<boolean>(true);
  verifyForm = signal<boolean>(true);
  timer = signal<number>(60);
  isDisabled = signal(true);
  interval: any;
  //#endregion
  //#region Form Control
  verifyCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^\d{1,6}$/)]),
  });
  //#endregion

  //#region Resend Timer
  startTimer() {
    if (this.resendBtn() == true) {
      this.resendBtn.set(false);
    } else {
      this.resendBtn.set(true);
    }
    this.isDisabled.set(true);
    this.timer.set(60);
    this.interval = setInterval(() => {
      const current = this.timer();
      this.timer.set(current - 1);

      if (this.timer() <= 0) {
        clearInterval(this.interval);
        this.isDisabled.set(false);
        this.resendBtn.set(false);
      }
    }, 1000);
  }
  //#endregion

  ngOnInit(): void {
    this.startTimer();
  }

  verifyCode() {
    this.authService.verifyResetCode(this.verifyCodeForm.value).subscribe({
      next: () => {
        this.router.navigate(['/reset-password']);
      },
      error: (err) => {
        this.errorMessage.set(err.error.message);
      },
    });
  }
}
