import { Component, ElementRef, inject, signal, ViewChild, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from './pages/layouts/navbar/navbar.component';
import { PlatformService } from './core/services/platform/platform.service';
import { BannerComponent } from './pages/layouts/banner/banner.component';
import { FooterComponent } from './pages/layouts/footer/footer.component';
import { HomeComponent } from './pages/main/home/home.component';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, BannerComponent, FooterComponent, HomeComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Shop.Co');

  //#region Services Inject
  flowbiteService: FlowbiteService = inject(FlowbiteService);
  platformService: PlatformService = inject(PlatformService);
  //#endregion

  //#region Flowbite Configuration Inject
  flowbiteConfiguration() {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
  //#endregion

  ngOnInit(): void {
    this.flowbiteConfiguration();
  }
}
