import { TranslateModule } from '@ngx-translate/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TranslateModule,
    RouterModule
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  restaurantCategories: any = [];
  storesCategoriesList: any = [];
  categoriesList: any = [];

  facebookLink: string = 'face';
  instagramLink: string = 'instagram';
  whatsappLink: string = 'whatsapp';

  constructor() {
    this.restaurantCategories = [
      { name: 'Riyadh Season' },
      { name: ' Jeddah Events Calendar' },
      { name: ' Diriyah Season' }
    ];
    this.storesCategoriesList = [
      { name: 'Riyadh Season' },
      { name: ' Jeddah Events Calendar' },
      { name: ' Diriyah Season' }
    ];
    this.categoriesList = [
      { name: 'Riyadh Season' },
      { name: ' Jeddah Events Calendar' },
      { name: ' Diriyah Season' }
    ];
  }

  openStoresWithCategoryId(storeCat: any): void { }
  openPlaceWithCategoryId(catId: any): void { }
  openRestaurantWithCategoryId(restaurant: any): void { }
}
