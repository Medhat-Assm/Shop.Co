import { Component, inject } from '@angular/core';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { PlatformService } from '../../../core/services/platform/platform.service';

@Component({
  selector: 'app-navbar',
  imports: [TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  //#region Service Inject
  private readonly platformService: PlatformService = inject(PlatformService);
  //#endregion

  //#region Dark Mode Toggle
  isDarkMode = false;

  getLastSessionDarkMode() {
    if (this.platformService.checkPlatFormBrowser()) {
      this.isDarkMode =
        localStorage.getItem('color-theme') === 'dark' ||
        (!('color-theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches);

      this.applyTheme();
    }
  }

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

  ngOnInit() {
    this.getLastSessionDarkMode();
  }
}
