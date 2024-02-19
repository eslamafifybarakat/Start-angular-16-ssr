import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToastModule } from 'primeng/toast';

import { LanguagesSelectorComponent } from './componenets/languages-selector/languages-selector.component';
import { NavigationHeaderComponent } from './componenets/navigation-header/navigation-header.component';
import { MainFooterComponent } from './componenets/main-footer/main-footer.component';
import { TopHeaderComponent } from './componenets/top-header/top-header.component';
import { LayoutComponent } from './layout.component';
import { CustomersServiceButtonComponent } from './componenets/customers-service-button/customers-service-button.component';
import { DownloadAppComponent } from './componenets/download-app/download-app.component';




@NgModule({
  declarations: [
    LayoutComponent,
    TopHeaderComponent,
    LanguagesSelectorComponent,
    NavigationHeaderComponent,
    MainFooterComponent,
    CustomersServiceButtonComponent,
    DownloadAppComponent
  ],
  imports: [
    LayoutRoutingModule,
    CommonModule,
    SharedModule,
    CoreModule,
    ToastModule
  ]
})
export class LayoutModule { }
