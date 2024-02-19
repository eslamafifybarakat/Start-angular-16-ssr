import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';


import { SharedModule } from './../../../shared/shared.module';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { HomeRoutingModule } from './home-routing.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { GoogleMapsModule } from '@angular/google-maps';
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
import { SidebarModule } from 'primeng/sidebar';
import { SwiperModule } from 'swiper/angular';
import { NgModule } from '@angular/core';
import { RatingModule } from 'primeng/rating';

import { SpecialitiesSliderComponent } from './components/specialities-slider/specialities-slider.component';

@NgModule({
  declarations: [
    SpecialitiesSliderComponent,
    HomeComponent
  ],
  imports: [
    DynamicDialogModule,
    SlickCarouselModule,
    HomeRoutingModule,
    GoogleMapsModule,
    GalleriaModule,
    CarouselModule,
    SidebarModule,
    RatingModule,
    SwiperModule,
    SharedModule,
    CommonModule
  ]
})
export class HomeModule { }
