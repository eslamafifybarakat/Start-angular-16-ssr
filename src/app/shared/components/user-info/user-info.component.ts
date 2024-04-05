import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { keys } from '../../configs/localstorage-key';
import { TranslateModule } from '@ngx-translate/core';
import { userInfoMenu } from './user-info-menu-list';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from '../../../services/authentication/auth.service';
interface MenuItem {
  id?: string;
  text: string;
  icon: string;
  routerLink?: string;
}
@Component({
  standalone: true,
  imports: [TranslateModule, CommonModule, RouterModule],
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
  currentLanguage: string;
  userInfoList: MenuItem[] = userInfoMenu;

  constructor(
    private confirmationService: ConfirmationService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService:AuthService,
    public sanitizer: DomSanitizer,
    private router: Router
  ) { }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLanguage = window?.localStorage?.getItem(keys?.language);
    }
  }
  logOut(): void {
    this.confirmationService?.confirm({
      message: this.currentLanguage == 'ar' ? 'هل أنت متأكد أنك تريد تسجيل الخروج؟' : 'Are you sure you want to logout?',
      header: this.currentLanguage == 'ar' ? 'تسجيل خروج' : 'Logout',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.authService.signOut();
      }
    });

  }
}
