
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { keys } from '../../configs/localstorage-key';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarModule } from 'primeng/sidebar';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'navbar-mobile',
  standalone: true,
  imports: [SidebarModule, RouterModule, TranslateModule, NgOptimizedImage, LanguageSelectorComponent],
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.scss']
})
export class NavbarMobileComponent {
  displayMenu: boolean = false;
  isUserLoggedIn: boolean = false;
  currentLanguage: string | null = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = window.localStorage.getItem(keys.language);
    }
  }
  openSidebar(): void {
    this.displayMenu = true;
  }
  closeSidebar(): void {
    this.displayMenu = false;
  }

  logOut(): void {
    this.closeSidebar();
  }
  login(): void {
    this.closeSidebar();
  }
}
