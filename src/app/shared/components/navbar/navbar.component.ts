import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { CommonModule, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Links } from '../../../interfaces/public';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgOptimizedImage, RouterModule, TranslateModule, CommonModule, LanguageSelectorComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  page: string = '';

  collapse: boolean = false;
  displayMenu: boolean = false;
  isVisitMegaMenuVisible: boolean = false;
  isUserLoggedIn: boolean = false;
  navAllLinks: Links[] = [];
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
    this.page = 'home';
    this.navAllLinks = [
      { title: 'home', name: 'nav.home', route: '/home' },
      { title: 'place', name: 'nav.place', route: '/places' },
      { title: 'stores', name: 'nav.stores', route: '/stores' },
      { title: 'swalefs', name: 'nav.swalefs', route: '/stories' },
      { title: 'events', name: 'nav.events', route: '/events' },
    ]
  }

  ngOnInit(): void {
  }
  shouldApplyHeaderBg(): boolean {
    const excludedPages = [
      'home',
      'places',
      'trips',
      'coming-soon',
      'stores',
      'events',
      'restaurant-details',
      'stories',
      'searchResult'
    ];
    return !excludedPages.includes(this.page);
  }
  shouldDisplayDarkLogo(): boolean {
    return ['stores', 'events', 'restaurant-details', 'searchResult', 'stories'].includes(this.page);
  }
  login(): void {
  }
}
