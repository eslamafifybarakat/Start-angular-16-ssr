// Modules
import { Component, EventEmitter, Output } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';

// Services
import { AsideMenuService } from '../../../components/dashboard/services/aside-menu.service';
import { AuthService } from './../../../services/authentication/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfirmationService } from 'primeng/api';

// Menu Interface
interface MenuItem {
  id?: string;
  text: string;
  icon: string;
  routerLink?: string;
  state: boolean;
  permission?: boolean;
  children?: MenuItem[];
}

@Component({
  standalone: true,
  imports: [
    ConfirmDialogModule,
    TranslateModule,
    TooltipModule,
    CommonModule,
    RouterModule
  ],
  selector: 'aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss']
})
export class AsideMenuComponent {
  collapsed: boolean = false;
  screenWidth: any = 0;
  showSideMenu: boolean = false;
  rotated: boolean = false;
  menuListItems: MenuItem[] = [];
  currentLanguage: string = 'en';

  @Output() onToggleSideNav: EventEmitter<any> = new EventEmitter();

  constructor(
    private confirmationService: ConfirmationService,
    private asideMenuService: AsideMenuService,
    private authService: AuthService,
    public sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMenuItems();
    this.screenWidth = window?.innerWidth;
  }

  // Get menu items list
  getMenuItems(): void {
    this.menuListItems = this.asideMenuService.getAsideMenuItem();
  }

  // Handle click event on menu item
  handelClick(item: any): void {
    this.menuListItems.forEach((ele: any) => {
      ele.state = false;
    });
    item.state = !item?.state;
  }
  // Toggle sidebar collapse
  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    this.rotate();
  }
  // Toggle sidebar icon
  toggleIcon(): void {
    this.collapsed = true;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }
  // Rotate sidebar arrow icon
  rotate(): void {
    this.rotated = !this.rotated;
  }

  // Logout User
  logout(): void {
    this.confirmationService.confirm({
      message: this.currentLanguage == 'ar' ? 'هل أنت متأكد أنك تريد تسجيل الخروج؟' : 'Are you sure you want to logout?',
      header: this.currentLanguage == 'ar' ? 'تسجيل خروج' : 'Logout',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.authService.signOut();
      }
    });
  }
}
