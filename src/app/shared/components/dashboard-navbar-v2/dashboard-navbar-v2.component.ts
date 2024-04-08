// Modules
import { TranslateModule } from '@ngx-translate/core';
import { SidebarModule } from 'primeng/sidebar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

// Components
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { AsideMenuComponent } from '../aside-menu/aside-menu.component';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  standalone: true,
  imports: [
    // Modules
    TranslateModule,
    CommonModule,
    RouterModule,
    SidebarModule,

    // Components
    LanguageSelectorComponent,
    UserInfoComponent,
    AsideMenuComponent,
  ],
  selector: 'dashboard-navbar-v2',
  templateUrl: './dashboard-navbar-v2.component.html',
  styleUrls: ['./dashboard-navbar-v2.component.scss']
})
export class DashboardNavbarV2Component {
  showSidebar: boolean = false;

  openSidebar(): void {
    this.showSidebar = true;
  }
}
