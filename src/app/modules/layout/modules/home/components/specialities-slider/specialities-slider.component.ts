import { HomeService } from './../../../../services/home.service';
import { PublicService } from './../../../../../shared/services/public.service';
import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { keys } from './../../../../../shared/configs/localstorage-key';
import { specialitiesSliderOptions } from '../../configs/homePage';
import { isPlatformBrowser } from '@angular/common';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-specialities-slider',
  templateUrl: './specialities-slider.component.html',
  styleUrls: ['./specialities-slider.component.scss']
})
export class SpecialitiesSliderComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];
  currentLanguage: any;
  specialitiesList: any = [];
  isLoadingSpecialities: boolean = false;
  categorySliderOptions: OwlOptions = specialitiesSliderOptions;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private publicService: PublicService,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = window?.localStorage?.getItem(keys?.language);
    }
    this.homeService.homeDataServerSubj.subscribe((res: any) => {
      res?.specialists ? this.specialitiesList = res.specialists : '';
      this.specialitiesList.forEach(element => {
        switch (element?.id) {
          case 1:
            element['image'] = 'assets/images/main/specialities/psyCoun.svg';
            break;
          case 2:
            element['image'] = 'assets/images/main/specialities/psyTret.svg';
            break;
          case 3:
            element['image'] = 'assets/images/main/specialities/psychiatry.svg';
            break;
          case 4:
            element['image'] = 'assets/images/main/specialities/psyFam.svg';
            break;

          default:
            break;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}
