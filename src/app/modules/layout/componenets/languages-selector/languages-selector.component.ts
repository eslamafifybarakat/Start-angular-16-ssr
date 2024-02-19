import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslationService } from './../../../core/services/translation.service';
import { PublicService } from './../../../shared/services/public.service';
import { keys } from './../../../shared/configs/localstorage-key';

@Component({
  selector: 'app-languages-selector',
  templateUrl: './languages-selector.component.html',
  styleUrls: ['./languages-selector.component.scss']
})
export class LanguagesSelectorComponent {
  currentLanguage: any;
  language: string = '';
  page: any;

  constructor(
    public translationService: TranslationService,
    private publicService: PublicService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = window.localStorage.getItem(keys.language);
    }

    this.publicService.pushUrlData.subscribe((res: any) => {
      this.page = res.page;
    });
  }
}
