import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { keys } from './../../shared/configs/localstorage-key';
@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  browserLang: any = '';

  constructor(
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (isPlatformBrowser(this.platformId)) {
      // console.clear();
      if (window.navigator.onLine) {
        if (request.url.startsWith('https://ipapi.co/json')) {
          return next.handle(request);
        }

        let header: any = {};
        if (window.localStorage.getItem(keys.language)) {
          header["locale"] = window.localStorage.getItem(
            keys.language
          );
        } else {
          this.browserLang = this.translateService.getBrowserLang();
          window.localStorage.setItem(keys.language, this.browserLang);
          header["locale"] = window.localStorage.getItem(
            keys.language
          );
        }

        if (JSON.parse(window.localStorage.getItem(keys.userLoginData) || '{}')?.token) {
          let userLoginData: any = JSON.parse(window.localStorage.getItem(keys.userLoginData) || '{}');
          if (userLoginData && userLoginData?.token) {
            header["Authorization"] = `Bearer ${userLoginData?.token}`;
          }
        }

        request = request.clone({
          setHeaders: header,
          // url: request.url.replace("http", "https"),
        });

        return next.handle(request);
      } else {
        return next.handle(request);
      }
    } else {
      return next.handle(request);
    }
  }
}

