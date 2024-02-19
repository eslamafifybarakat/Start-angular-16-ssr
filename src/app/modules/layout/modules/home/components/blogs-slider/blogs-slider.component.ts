import { Component, Input, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { PublicService } from './../../../../../shared/services/public.service';
import { environment } from './../../../../../../../environments/environment';
import { keys } from './../../../../../shared/configs/localstorage-key';
import { BlogsService } from './../../../../services/blogs.service';
import { HomeService } from './../../../../services/home.service';
import { blogsSliderOptions } from '../../configs/homePage';
import { isPlatformBrowser } from '@angular/common';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blogs-slider',
  templateUrl: './blogs-slider.component.html',
  styleUrls: ['./blogs-slider.component.scss']
})
export class BlogsSliderComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];
  currentLanguage: any;
  imageBaseUrl: any = environment.imageBaseUrl;

  @Input() title: any = 'titles.blogs';
  @Input() hideTitle: boolean = false;

  blogsList: any = [];
  isLoadingBlogs: boolean = false;

  blogSliderOptions: OwlOptions = blogsSliderOptions;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public publicService: PublicService,
    public blogsService: BlogsService,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = window.localStorage.getItem(keys.language);
    }

    this.homeService.homeDataServerSubj.subscribe((res: any) => {
      res?.latestArticles ? this.blogsList = res.latestArticles : '';
    });
    this.blogsService.blogRelatedArticlesSubj.subscribe((res: any) => {
      res ? this.blogsList = res : '';
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}
