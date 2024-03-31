import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { AsideMenuComponent } from '../aside-menu/aside-menu.component';
import { UserInfoComponent } from '../user-info/user-info.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, LanguageSelectorComponent, UserInfoComponent, AsideMenuComponent, SidebarModule],
  selector: 'dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.scss']
})
export class DashboardNavbarComponent {
  showSidebar: boolean = false;

  openSidebar(): void {
    this.showSidebar = true;
  }
}
