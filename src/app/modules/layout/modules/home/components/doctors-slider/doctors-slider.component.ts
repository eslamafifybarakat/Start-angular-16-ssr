import { Component, Input, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { PublicService } from './../../../../../shared/services/public.service';
import { environment } from './../../../../../../../environments/environment';
import { keys } from './../../../../../shared/configs/localstorage-key';
import { BlogsService } from './../../../../services/blogs.service';
import { HomeService } from './../../../../services/home.service';
import { doctorsSliderOptions } from '../../configs/homePage';
import { isPlatformBrowser } from '@angular/common';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-doctors-slider',
  templateUrl: './doctors-slider.component.html',
  styleUrls: ['./doctors-slider.component.scss']
})
export class DoctorsSliderComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];
  currentLanguage: any;
  imageBaseUrl: any = environment.imageBaseUrl;

  @Input() title: any = 'homePage.trendingDocotors.title';
  @Input() hideTitle: boolean = false;

  trengingDoctorsList: any = [];
  isLoadingTrengingDoctors: boolean = false;

  doctorSliderOptions: OwlOptions = doctorsSliderOptions;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private publicService: PublicService,
    private blogsService: BlogsService,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = window?.localStorage?.getItem(keys?.language);
    }

    this.homeService.homeDataServerSubj.subscribe((res: any) => {
      res?.doctors ? this.trengingDoctorsList = this.publicService.slicedData(res.doctors, 16) : '';
      this.trengingDoctorsList?.forEach(element => {
        element['avg_rate'] = this.publicService.transformDecimalToInteger(element['avg_rate']);
      });
    });
    this.blogsService.blogRelatedDoctorsSubj.subscribe((res: any) => {
      res ? this.trengingDoctorsList = this.publicService.slicedData(res, 16) : '';
      this.trengingDoctorsList?.forEach(element => {
        element['avg_rate'] = this.publicService.transformDecimalToInteger(element['avg_rate']);
      });
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}
