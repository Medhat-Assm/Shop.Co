import { Component, inject, signal, Signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { PlatformService } from '../../../core/services/platform/platform.service';

@Component({
  selector: 'app-banner',
  imports: [TranslatePipe],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {
  private readonly translate = inject(TranslateService);
  private readonly platformService: PlatformService = inject(PlatformService);

  langToggleText = signal<string>('EN');
  currentLang = signal<'en' | 'ar'>('en');

  ngOnInit(): void {
    if (this.platformService.checkPlatFormBrowser()) {
      const savedLang = (localStorage.getItem('lang') as 'en' | 'ar') || 'en';
      this.useLanguage(savedLang);
    }
  }

  toggleLanguage(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.useLanguage(checked ? 'ar' : 'en');
  }

  useLanguage(language: 'en' | 'ar'): void {
    this.currentLang.set(language);
    this.translate.use(language);

    // set text short form
    this.langToggleText.set(language === 'en' ? 'English' : 'Arabic');

    // set document direction
    document.dir = language === 'ar' ? 'rtl' : 'ltr';

    // save preference
    localStorage.setItem('lang', language);
  }
}
