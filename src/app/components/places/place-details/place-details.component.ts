import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { MetadataService } from '../../../services/generic/metadata.service';
import { PublicService } from '../../../services/generic/public.service';
import { PlaceApiResponse, PlaceData } from '../../../interfaces/places';
import { environment } from '../../../../environments/environment';
import { PlacesService } from '../../../services/places.service';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Meta, Title } from '@angular/platform-browser'; // For SEO purposes
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-place-details',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.scss']
})
export class PlaceDetailsComponent {
  private subscriptions: Subscription[] = [];

  private imageBaseUrl: string = '';
  private fullPageUrl: string = '';
  private placeSlug: any = null;
  // listingArray: Listing[];
  placeDetails?: PlaceData; // Assuming placeDetails is a class member
  isLoadingPlaceDetails: boolean = false;

  InformationView: boolean = false;
  featuresView: boolean = false;
  mapView: boolean = false;
  chatGptView: boolean = false;


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private metadataService: MetadataService,
    private activatedRoute: ActivatedRoute,
    private publicService: PublicService,
    private placesService: PlacesService,
    private cdr: ChangeDetectorRef,
    private title: Title,// For SEO
    private meta: Meta,// For SEO
  ) { }
  private initPageData(): void {
    this.placeSlug = 'dar-al-madinah-museum';
    this.activatedRoute.params.subscribe((params) => {
      // this.placeSlug = params['slug'];
      if (this.placeSlug) {
        this.getPLaceDataBySlug(this.placeSlug);
        // this.getRelatedPlaces(this.placeSlug);
        // this.fullPageUrl = environment.publicUrl + '/places/details/' + this.placeSlug;
      }
    });
  }

  ngOnInit(): void {
    this.initPageData();
  }

  getPLaceDataBySlug(slug: any, preventLoading?: boolean): void {
    if (!preventLoading) {
      this.isLoadingPlaceDetails = true;
    }

    let placeDataSubscription = this.placesService?.getPLaceItemData(slug)?.pipe(
      tap((res: PlaceApiResponse) => {
        if (res?.code === 200) {
          this.placeDetails = res.data;
          this.handlePlaceDetails();
          if (isPlatformServer(this.platformId)) {
            this.updateMetaTagsForSEO(); // Update meta tags for SEO when running on the server
            this.cdr.detectChanges();
          }
          if (isPlatformBrowser(this.platformId)) {
            this.updateMetaTagsForSEO(); // Update meta tags for SEO when running on the browser
            this.cdr.detectChanges();
          }
        } else {
          this.handleError(res?.message);
        }
      }),
      catchError(err => this.handleError(err)),
      finalize(() => this.isLoadingPlaceDetails = false)
    ).subscribe();

    this.subscriptions.push(placeDataSubscription);
  }
  private handlePlaceDetails(): void {
    this.updateRate();
    this.updateAddress();
    this.updateAddressName();
    this.showInformationTab();
  }
  // private updateMetaTagsForSEO(): void {
  //   // This method should be called only when SSR is happening
  //   if (this.placeDetails) {
  //     const title = this.placeDetails.title || 'Default Title';
  //     this.title.setTitle(title);
  //     this.meta.updateTag({ name: 'description', content: this.placeDetails.description || 'Default Description' });
  //     this.meta.updateTag({ property: 'og:title', content: title });
  //     this.meta.updateTag({ property: 'og:description', content: this.placeDetails.description || 'Default Description' });
  //     this.meta.updateTag({ property: 'og:url', content: this.fullPageUrl });

  //     if (isPlatformBrowser(this.platformId)) {
  //       // Browser-specific SEO actions, such as schema.org scripts or other client-side SEO improvements
  //     }
  //   }
  //   if (this.placeDetails) {
  //     const title = this.placeDetails.title || 'Default Title';
  //     this.title.setTitle(title);
  //     this.meta.updateTag({ name: 'description', content: this.placeDetails.description || 'Default Description' });
  //     this.meta.updateTag({ property: 'og:title', content: title });
  //     this.meta.updateTag({ property: 'og:description', content: this.placeDetails.description || 'Default Description' });
  //     this.meta.updateTag({ property: 'og:url', content: this.fullPageUrl });

  //     if (isPlatformBrowser(this.platformId)) {
  //       // Browser-specific SEO actions, such as schema.org scripts or other client-side SEO improvements
  //     }
  //   }
  // }
  private updateRate(): void {
    if (this.placeDetails?.rate != null) {
      this.placeDetails.rate = Math.ceil(this.placeDetails.rate);
    }
  }
  private updateAddress(): void {
    if (this.placeDetails?.lat != null && this.placeDetails?.long != null && this.placeDetails.address_type === 'map') {
      this.placeDetails.address = this.publicService.createGoogleMapsLink(this.placeDetails.lat, this.placeDetails.long);
    }
  }
  private updateAddressName(): void {
    if (!this.placeDetails) return;
    const { region, city } = this.placeDetails;
    const parts = [region?.name, city?.name].filter(Boolean);
    if (parts.length) {
      this.placeDetails.address_name = parts.join(' - ');
    }
  }

  //Handle api requests error messages
  private handleError(err: any): any {
    this.setErrorMessage(err || 'An error has occurred');
  }
  private setErrorMessage(message: string): void {
    // Implementation for displaying the error message, e.g., using a toast
    // Example: this.alertsService?.openToast('error', message);
  }


  // private updateMetaTags(): void {
  //   this.metadataService.updateTitle(`${this.placeDetails.title}`);
  //   this.metadataService.updateMetaTagsName([
  //     { name: 'title', content: `${this.placeDetails.title}` },
  //     { name: 'description', content: this.placeDetails.description },
  //   ]);
  //   this.metadataService.updateMetaTagsProperty([
  //     {
  //       property: 'og:url',
  //       content: `${environment.publicUrl}/places/details/${this.placeDetails.slug}`,
  //     },
  //     { property: 'og:title', content: `${this.placeDetails.title}` },
  //     { property: 'og:description', content: this.placeDetails.description },
  //     {
  //       property: 'og:image',
  //       content: this.imageBaseUrl + '/' + this.placeDetails.image,
  //     },
  //   ]);
  // }
  private updateMetaTagsForSEO(): void {
    if (this.placeDetails) {
      this.metadataService.updateTitle(`${this.placeDetails.title}`);
      this.metadataService.updateMetaTagsName([
        { name: 'title', content: `${this.placeDetails.title}` },
        { name: 'description', content: this.placeDetails.description },
      ]);
      this.metadataService.updateMetaTagsProperty([
        // {
        //   property: 'og:url',
        //   content: `${environment.publicUrl}/places/details/${this.placeDetails.slug}`,
        // },
        { property: 'og:title', content: `${this.placeDetails.title}` },
        { property: 'og:description', content: this.placeDetails.description },
        {
          property: 'og:image',
          content: this.imageBaseUrl + '/' + this.placeDetails.image,
        },
      ]);
    }
  }
  // Tabs for details views
  showInformationTab(): void {
    this.InformationView = true;
    this.featuresView = false;
    this.mapView = false;
    this.chatGptView = false;
  }
  showFeaturesTab(): void {
    this.featuresView = true;
    this.InformationView = false;
    this.mapView = false;
    this.chatGptView = false;
  }
  showMapTab(): void {
    this.mapView = true;
    this.InformationView = false;
    this.featuresView = false;
    this.chatGptView = false;
  }
  showChatGptTab(): void {
    this.chatGptView = true;
    this.mapView = false;
    this.InformationView = false;
    this.featuresView = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
