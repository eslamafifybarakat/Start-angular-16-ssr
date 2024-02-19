import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { keys } from '../../shared/configs/localstorage-key';
import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  currentLang: string;
  localeEvent = new Subject<string>();

  constructor(
    public translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: any
  ) { }

  changeLang(lang: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLang = localStorage.getItem(keys.language);
      if (this.currentLang !== lang) {
        localStorage.setItem(keys.language, lang);
        window.location.reload();
        window.scrollTo(0, 0);
      }
    }

    setTimeout(() => {
      this.translate.use(lang);
      this.localeEvent.next(lang);

      let direction = this.currentLang === "ar" ? "rtl" : "ltr";
      this.document.documentElement.dir = direction;
      this.document.documentElement.lang = lang;

      let getMain = this.document.getElementsByTagName("html")[0];
      getMain.setAttribute("lang", lang);
      getMain.setAttribute("class", lang);
    }, 1000);
  }

  getSelectedLanguage(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(keys.language) || this.translate.getDefaultLang();
    } else {
      // Provide a server-side alternative for language determination, if necessary
      return this.translate.getDefaultLang();
    }
  }
}
