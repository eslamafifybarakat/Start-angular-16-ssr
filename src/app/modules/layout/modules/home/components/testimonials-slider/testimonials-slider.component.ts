import { PublicService } from './../../../../../shared/services/public.service';
import { DoctorsService } from './../../../../services/doctors.service';
import { keys } from './../../../../../shared/configs/localstorage-key';
import { Component, Input, Inject, PLATFORM_ID } from '@angular/core';
import { testimonialsSliderOptions } from '../../configs/homePage';
import { HomeService } from './../../../../services/home.service';
import { isPlatformBrowser } from '@angular/common';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-testimonials-slider',
  templateUrl: './testimonials-slider.component.html',
  styleUrls: ['./testimonials-slider.component.scss']
})
export class TestimonialsSliderComponent {
  private unsubscribe: Subscription[] = [];
  currentLanguage: any;

  @Input() title: any;
  testimonialsList: any = [];
  isLoadingTestimonials: boolean = false;

  testimonialSliderOptions: OwlOptions = testimonialsSliderOptions;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private doctorsService: DoctorsService,
    private publicService: PublicService,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = window.localStorage.getItem(keys.language);
    }

    this.homeService.homeDataServerSubj.subscribe((res: any) => {
      res?.reviews ? this.testimonialsList = res.reviews : '';
      this.testimonialsList?.forEach(element => {
        element['rating'] = this.publicService.transformDecimalToInteger(element['rating']);
      });
    });
    this.doctorsService.reviewsDoctorSubj.subscribe((res: any) => {
      res ? this.testimonialsList = res : '';
      this.testimonialsList?.forEach(element => {
        element['rating'] = this.publicService.transformDecimalToInteger(element['rating']);
      });
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}
