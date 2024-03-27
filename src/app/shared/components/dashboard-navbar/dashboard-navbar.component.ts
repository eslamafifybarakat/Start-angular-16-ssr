import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { UserInfoComponent } from '../user-info/user-info.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, LanguageSelectorComponent, UserInfoComponent],
  selector: 'dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.scss']
})
export class DashboardNavbarComponent {

}
