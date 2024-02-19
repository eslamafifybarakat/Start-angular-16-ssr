import { MetadataService } from './modules/shared/services/metadata.service';
import { TranslationService } from './modules/core/services/translation.service';
import { DOCUMENT, isPlatformBrowser, isPlatformServer, registerLocaleData } from '@angular/common';
import { Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { PublicService } from './modules/shared/services/public.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { keys } from './modules/shared/configs/localstorage-key';
import { TranslateService } from '@ngx-translate/core';
import localeAr from '@angular/common/locales/ar'
import { PrimeNGConfig } from 'primeng/api';
import { filter, map } from 'rxjs';
import * as AOS from "aos";

registerLocaleData(localeAr);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'title';
  languages = ['en', 'ar', 'ru', 'cn'];;
  browserLang: any;
  currentTheme: any;
  currentLanguage: any;
  favIcon: HTMLLinkElement | any;
  showSpinner: boolean = true;
  platform: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public translationService: TranslationService,
    @Inject(DOCUMENT) private document: Document,
    private translateService: TranslateService,
    private metadataService: MetadataService,
    private activatedRoute: ActivatedRoute,
    private publicService: PublicService,
    private primengConfig: PrimeNGConfig,
    private renderer: Renderer2,
    private router: Router,
  ) {
    // Set up router events subscription
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd), map(() => {
      let child = this.activatedRoute?.firstChild;
      while (child) {
        if (child?.firstChild) {
          child = child.firstChild;
        } else if (child?.snapshot?.data) {
          return child.snapshot.data;
        } else {
          return null;
        }
      }
      return null;
    })
    ).subscribe((data: any) => {
      if (data) {
        this.publicService.pushUrlData.next(data);
      }
    });
    // Set up translations

    // Client only code.
    if (isPlatformBrowser(this.platformId)) {
      this.translateService.addLangs(this.languages);
      this.platform = 'Browser';
      this.currentLanguage = window.localStorage.getItem(keys.language);
      if (this.currentLanguage !== null && this.currentLanguage !== undefined) {
        this.translateService.use(this.currentLanguage);
        let direction: any;
        if (isPlatformBrowser(this.platformId)) {
          this.platform = 'Browser';
          direction = window.localStorage.getItem(keys.language) === "ar" ? "rtl" : "ltr";
        } else if (isPlatformServer(this.platformId)) {
          this.platform = 'Server';
        } else {
          this.platform = 'Unknown';
        }

        this.setLanguage(direction);
        this.translateService?.stream('primeng')?.subscribe((data: any) => {
          this.primengConfig?.setTranslation(data);
        });

      } else {
        this.browserLang = this.translateService.getBrowserLang();
        if (isPlatformBrowser(this.platformId)) {
          this.platform = 'Browser';
          window.localStorage.setItem(keys.language, 'ar');
        } else if (isPlatformServer(this.platformId)) {
          this.platform = 'Server';
        } else {
          this.platform = 'Unknown';
        }
        this.translateService.use('ar');
        this.translateService.setDefaultLang('ar');
        window.location.reload();
      }
    } else if (isPlatformServer(this.platformId)) {
      this.platform = 'Server';
    } else {
      this.platform = 'Unknown';
    }
  }

  ngOnInit(): void {
    this.translationService.changeLang('ar');
    AOS.init();
    this.primengConfig.ripple = true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 2000);
    // this.metadataService?.addMetaTagsName([{ name: 'title', content: "طبيق تلبينة" }, { name: 'description', content: "احصل على الصحة النفسية التي تحتاجها مع تطبيق تلبينة. جلسات علاج نفسي مع أفضل أخصائي الطب النفسي في السعودية، متاحة لك في راحة بمنزلك عبر الإنترنت. ابدأ علاجك النفسي اليوم" }])
  }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.favIcon = this.document.querySelector("#appIcon");
      if (this.favIcon) {
        this.favIcon.href = "https://talbinah.net/assets/images/main/logos/logo_talbinah.png";
      }
    }
  }

  setLanguage(direction: string): void {
    this.renderer.setAttribute(this.document.documentElement, 'dir', direction);
    this.renderer.setAttribute(this.document.documentElement, 'lang', this.currentLanguage);
    // Assuming you still want to set the class attribute to the current language
    this.renderer.setAttribute(this.document.documentElement, 'class', this.currentLanguage);
  }
}
