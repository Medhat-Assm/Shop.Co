import { Component, ElementRef, inject, signal, ViewChild, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from './pages/layouts/navbar/navbar.component';
import { BannerComponent } from './pages/layouts/banner/banner.component';
import { FooterComponent } from './pages/layouts/footer/footer.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, BannerComponent, FooterComponent, RouterOutlet, NgxSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Shop.Co');

  //#region Services Inject
  private readonly flowbiteService: FlowbiteService = inject(FlowbiteService);
  private spinner: NgxSpinnerService = inject(NgxSpinnerService);
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
