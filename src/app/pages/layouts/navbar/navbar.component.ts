import { Component, inject, OnInit, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PlatformService } from '../../../core/services/platform/platform.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { User } from '../../../core/interfaces/user';

@Component({
  selector: 'app-navbar',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  //#region Service Inject
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);
  private readonly platformService: PlatformService = inject(PlatformService);
  //#endregion

  //#region Variable
  userData = signal<User | null>(null);
  isLogin = signal<boolean>(false);
  isDarkMode = false;
  //#endregion

  //#region Get Dark Mode Last Session
  getLastSessionDarkMode() {
    if (this.platformService.checkPlatFormBrowser()) {
      this.isDarkMode =
        localStorage.getItem('color-theme') === 'dark' ||
        (!('color-theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches);

      this.applyTheme();
    }
  }
  //#endregion

  //#region Change Theme Button
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('color-theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
  //#endregion

  //#region Check User Statues
  checkLogin() {
    // this.authService.setUserData();
    // Behavior Subject
    this.authService.userData.subscribe({
      next: () => {
        if (this.authService.userData.getValue() == null) {
          if (localStorage.getItem('userToken')) {
            this.authService.setUserData();
            this.userData.set(this.authService.userData.getValue());
            this.isLogin.set(true);
          } else {
            this.isLogin.set(false);
          }
        } else {
          this.userData.set(this.authService.userData.getValue());
          this.isLogin.set(true);
        }
      },
    });
  }
  //#endregion

  //#region Logout
  logout() {
    localStorage.removeItem('userToken');
    this.authService.userData.next(null);
    this.userData.set(null);
    this.router.navigate(['/login']);
  }
  //#endregion
  ngOnInit(): void {
    this.getLastSessionDarkMode();
    if (this.platformService.checkPlatFormBrowser()) {
      this.checkLogin();
    }
  }
}
