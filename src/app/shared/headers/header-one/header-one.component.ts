import { CommonModule, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, Input, PLATFORM_ID } from '@angular/core';
import { NavItem, navItems } from './../../../interfaces/navbar';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { LanguageSelectorComponent } from '../../components/language-selector/language-selector.component';
import { MenuComponent } from '../menu/menu.component';
import { Menu } from '../../services/nav.service';

@Component({
  selector: 'app-header-one',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterModule,
    TranslateModule,
    CommonModule,
    MenuComponent,
    LanguageSelectorComponent
  ],
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss']
})
export class HeaderOneComponent {
  @Input() enableIcons: boolean = false;
  @Input() postionType: string = 'relative'; // fixed - sticky - relative

  page: string = '';
  collapse: boolean = false;
  displayMenu: boolean = false;
  isVisitMegaMenuVisible: boolean = false;
  isUserLoggedIn: boolean = false;
  navItems: Menu[];

  @HostListener("window:scroll", ["$event"])
  handleScroll(event: Event) {
    this.handleKeyDown();
  }
  ngAfterViewInit() {
    this.handleKeyDown();
  }
  handleKeyDown() {
    if (isPlatformBrowser(this.platformId)) {
      let element: any = document.querySelector(".navbar") as HTMLElement;
      if (element) {
        if (window.pageYOffset > 30) {
          element ? element.classList.add("headerScroll") : '';
        } else {
          element ? element.classList.remove("headerScroll") : '';
        }
      } else {
        console.error("Element with class 'navbar' not found");
      }
    }
  }

  onHoverMegaMenu(): void {
    this.isVisitMegaMenuVisible = true;
  }
  onLeaveMegaMenu(): void {
    this.isVisitMegaMenuVisible = false;
  }
  stopClickPropagation(event: Event): void {
    event.stopPropagation();
  }

  openPlace(): void {
    this.collapse = false;
  }
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.page = 'Home';
    this.navItems = navItems;
  }

  ngOnInit(): void {
  }
  shouldApplyHeaderBg(): boolean {
    const excludedPages = [
      'Home',
    ];
    return !excludedPages.includes(this.page);
  }
  shouldDisplayDarkLogo(): boolean {
    return ['Home'].includes(this.page);
  }
  login(): void {
  }
}
