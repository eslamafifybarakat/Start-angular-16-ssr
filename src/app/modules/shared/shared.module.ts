import { TranslationChildModule } from './modules/translation-child/translation-child.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedRoutingModule } from './shared-routing.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ClickOutsideModule } from 'ng-click-outside';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SkeletonModule } from 'primeng/skeleton';
import { CoreModule } from '../core/core.module';
import { ClipboardModule } from 'ngx-clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { RatingModule } from 'primeng/rating';


import { TestimonialsSliderComponent } from '../layout/modules/home/components/testimonials-slider/testimonials-slider.component';
import { DoctorsSliderComponent } from '../layout/modules/home/components/doctors-slider/doctors-slider.component';
import { BlogsSliderComponent } from '../layout/modules/home/components/blogs-slider/blogs-slider.component';
import { UploadFileInputComponent } from './components/upload-file-input/upload-file-input.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { ShareComponent } from './components/share/share.component';
import { ShareButtonComponent } from './components/share-button/share-button.component';
import { OverlayLoadingComponent } from './components/overlay-loading/overlay-loading.component';

const components = [
  TestimonialsSliderComponent,
  UploadFileInputComponent,
  OverlayLoadingComponent,
  DoctorsSliderComponent,
  BlogsSliderComponent,
  ShareButtonComponent,
  FileUploadComponent,
  ScrollTopComponent,
  CountdownComponent,
  SkeletonComponent,
  ShareComponent,
]
const modules = [
  TranslationChildModule,
  ReactiveFormsModule,
  ConfirmDialogModule,
  ClickOutsideModule,
  ClipboardModule,
  SkeletonModule,
  CarouselModule,
  RatingModule,
  ImageModule,
  FormsModule
]
@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    SharedRoutingModule,
    CommonModule,
    CoreModule,
    ...modules
  ],
  exports: [
    ...components,
    ...modules
  ]
})
export class SharedModule { }
