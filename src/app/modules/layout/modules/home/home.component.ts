import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { MetadataService } from './../../../shared/services/metadata.service';
import { PublicService } from './../../../shared/services/public.service';
import { AlertsService } from './../../../core/services/alerts.service';
import { environment } from './../../../../../environments/environment';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { keys } from './../../../shared/configs/localstorage-key';
import { HomeService } from '../../services/home.service';
import { heroSliderOptions } from './configs/homePage';
import { DialogService } from 'primeng/dynamicdialog';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private unsubscribe: Subscription[] = [];
  imageBaseUrl: any = environment?.imageBaseUrl;
  currentLanguage: any;
  heroSlider: OwlOptions = heroSliderOptions;

  isLoadingHomeData: boolean = false;
  homeDataServer: any;
  homePageData: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private metadataService: MetadataService,
    private publicService: PublicService,
    private alertsService: AlertsService,
    private dialogService: DialogService,
    private homeService: HomeService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    if (isPlatformServer(this.platformId)) {
      // Server-side rendering
      this.updateMetaTags();
    }

    if (isPlatformBrowser(this.platformId)) {
      // Access browser-specific APIs like localStorage here
      this.currentLanguage = localStorage.getItem(keys?.language);
      this.updateMetaTags();
    }

    this.getHomePageData();
    this.initializeHomePageData();
  }
  private updateMetaTags(): void {
    this.metadataService.updateTitle('تلبينة | الرئيسية');
    this.metadataService.updateMetaTagsName([
      { name: 'title', content: 'تلبينة | الرئيسية' },
      { name: 'description', content: 'احصل على الصحة النفسية التي تحتاجها مع تطبيق تلبينة. جلسات علاج نفسي مع أفضل أخصائي الطب النفسي في السعودية، متاحة لك في راحة بمنزلك عبر الإنترنت. ابدأ علاجك النفسي اليوم' },
      { name: 'date', content: '2023-10-29T09:28:59+00:00' },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:url', content: 'http://talbinah.net/' },
      { name: 'twitter:site', content: '@Talbinahco' },
      { name: 'twitter:title', content: 'تلبينة | الرئيسية' },
      { name: 'twitter:description', content: 'احصل على الصحة النفسية التي تحتاجها مع تطبيق تلبينة. جلسات علاج نفسي مع أفضل أخصائي الطب النفسي في السعودية، متاحة لك في راحة بمنزلك عبر الإنترنت. ابدأ علاجك النفسي اليوم' },
      { name: 'twitter:image', content: 'https://talbinah.net/assets/images/main/logos/logo_talbinah.png' },
    ]);
    this.metadataService.updateMetaTagsProperty([
      { property: 'og:locale', content: 'ar_AR' },
      { property: 'article:publisher', content: 'https://www.facebook.com/Talbinahco/' },
      { property: 'article:modified_time', content: '2023-10-29T09:28:59+00:00' },

      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'http://talbinah.net/' },
      { property: 'og:title', content: 'تلبينة | الرئيسية' },
      { property: 'og:description', content: 'احصل على الصحة النفسية التي تحتاجها مع تطبيق تلبينة. جلسات علاج نفسي مع أفضل أخصائي الطب النفسي في السعودية، متاحة لك في راحة بمنزلك عبر الإنترنت. ابدأ علاجك النفسي اليوم' },
      { property: 'og:image', content: 'https://talbinah.net/assets/images/main/logos/logo_talbinah.png' },
      { property: 'twitter:site_name', content: 'تطبيق تلبينة' }
    ]);
  }

  initializeHomePageData(): void {
    this.homePageData = {
      hero: {
        image: 'assets/images/main/homePage/heroImage.png',
        slider: [
          {
            title: 'homePage.heroSection.heroTitle',
            sub_title: 'homePage.heroSection.heroText',
          },
          {
            title: 'homePage.heroSection.heroTitle',
            sub_title: 'homePage.heroSection.heroText',
          }
        ]
      },
      steps: {
        title: 'homePage.stepsTry.tryTitle',
        image: 'assets/images/main/homePage/stepsVector.svg',
        list: [
          {
            title: 'homePage.stepsTry.getInTouch',
            body: 'homePage.stepsTry.answerQuestions'
          },
          {
            title: 'homePage.stepsTry.bookSession',
            body: 'homePage.stepsTry.ChooseTime'
          },
          {
            title: 'homePage.stepsTry.StartSession',
            body: 'homePage.stepsTry.canCommunicate'
          }
        ]
      }
    };
  }
  getHomePageData(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isLoadingHomeData = true;
      this.homeService?.getHomeData()?.subscribe(
        (res: any) => {
          if (res?.status == true) {
            this.homeDataServer = res?.data;
            this.homeService.homeDataServerSubj.next(res?.data);
            // console.log(this.homeDataServer);
            this.isLoadingHomeData = false;
          } else {
            this.isLoadingHomeData = false;
            res?.message ? this.alertsService?.openToast('error', res?.message) : '';
          }
        },
        (err: any) => {
          err ? this.alertsService?.openToast('error', err) : '';
          this.isLoadingHomeData = false;
        }
      );
    }
  }
  openModal(): void {
    // const ref = this?.dialogService?.open(EarthStatisticsComponent, {
    //   width: '60%',
    //   dismissableMask: true,
    //   styleClass: 'auth-dialog'
    // });
    // ref?.onClose?.subscribe((res: any) => {
    // });
  }

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}


