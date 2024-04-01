// Modules
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';

//Services
import { PublicService } from './../../../services/generic/public.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfirmationService } from 'primeng/api';

// Menu Interface
interface MenuItem {
  id?: string;
  text: string;
  icon: string;
  routerLink?: string;
  state: boolean;
  children?: MenuItem[];
}
@Component({
  standalone: true,
  imports: [
    ConfirmDialogModule,
    TranslateModule,
    TooltipModule,
    CommonModule,
    RouterModule,
  ],
  selector: 'aside-menu-v2',
  templateUrl: './aside-menu-v2.component.html',
  styleUrls: ['./aside-menu-v2.component.scss']
})
export class AsideMenuV2Component {
  collapsed: boolean = false;
  screenWidth: any = 0;

  showSideMenu: boolean = false;
  rotated: boolean = false;
  menuListItems: MenuItem[] = [];

  currentLanguage: string = 'en';

  @Output() onToggleSideNav: EventEmitter<any> = new EventEmitter();

  constructor(
    private confirmationService: ConfirmationService,
    private publicService: PublicService,
    public sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMenuItems();
    this.screenWidth = window?.innerWidth;
  }

  // get menu items list
  getMenuItems(): void {
    this.menuListItems = [
      {
        id: 'statistics',
        text: this.publicService.translateTextFromJson('dashboard.sideMenu.statistics'),
        icon: `<svg width="29" height="29" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_192_85" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
<rect width="32" height="32" fill="currentColor"/>
</mask>
<g mask="url(#mask0_192_85)">
<path d="M13.6712 7.8457L14.0424 13.3656L14.2266 16.14C14.2286 16.4254 14.2733 16.7088 14.3596 16.9812C14.5821 17.51 15.1176 17.846 15.7001 17.8226L24.5764 17.2419C24.9608 17.2356 25.332 17.3794 25.6082 17.6416C25.8385 17.8602 25.9872 18.146 26.0341 18.4535L26.0498 18.6402C25.6825 23.7264 21.9469 27.9688 16.8712 29.0639C11.7954 30.159 6.59045 27.8456 4.08225 23.3798C3.35915 22.0823 2.9075 20.6563 2.75381 19.1852C2.68961 18.7498 2.66134 18.3099 2.66927 17.8699C2.66134 12.4169 6.54459 7.70253 11.9804 6.56601C12.6346 6.46413 13.276 6.81048 13.5384 7.40729C13.6062 7.5455 13.651 7.69353 13.6712 7.8457Z" fill="currentColor"/>
<path opacity="0.4" d="M29.3327 13.0829L29.3234 13.1263L29.2965 13.1895L29.3002 13.363C29.2863 13.5928 29.1975 13.8138 29.0447 13.9925C28.8854 14.1785 28.6678 14.3052 28.4282 14.3544L28.2821 14.3744L18.041 15.038C17.7003 15.0716 17.3611 14.9617 17.1079 14.7358C16.8967 14.5474 16.7618 14.2933 16.7237 14.0194L16.0363 3.79325C16.0243 3.75868 16.0243 3.7212 16.0363 3.68661C16.0457 3.40473 16.1698 3.13829 16.3809 2.94681C16.5918 2.75533 16.8723 2.65477 17.1594 2.6676C23.2393 2.82228 28.3491 7.19422 29.3327 13.0829Z" fill="currentColor"/>
</g>
</svg>
    `,
        routerLink: '/statistics',
        state: false
      },
      {
        id: 'clients',
        text: this.publicService.translateTextFromJson('dashboard.sideMenu.clients'),
        icon: `
    <svg width="31" height="32" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<mask id="mask0_199_290" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="34" height="35">
<rect y="0.5" width="34" height="34" fill="url(#pattern0)"/>
</mask>
<g mask="url(#mask0_199_290)">
<rect x="-8.5" y="-8" width="51.9444" height="51" fill="currentColor"/>
</g>
<defs>
<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_199_290" transform="scale(0.00195312)"/>
</pattern>
<image id="image0_199_290" width="512" height="512" xlink:href="data:image/png;base64,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"/>
</defs>
</svg>
    `,
        routerLink: '/Dashboard/Clients',
        state: false,
      },
      {
        id: 'sales',
        text: this.publicService.translateTextFromJson('dashboard.sideMenu.sales'),
        icon: `<svg width="29" height="29" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M28 26.6667H4V6.66675" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M28 9.33325L17.3333 18.6666L12 13.3333L4 19.9999" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `,
        routerLink: '/sales',
        state: false
      },
      {
        id: 'products',
        text: this.publicService.translateTextFromJson('dashboard.sideMenu.products'),
        icon: `<svg width="21" height="26" viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.3333 6.99992H18.6667C18.6667 3.26659 15.7333 0.333252 12 0.333252C8.26667 0.333252 5.33333 3.26659 5.33333 6.99992H2.66667C1.2 6.99992 0 8.19992 0 9.66659V25.6666C0 27.1333 1.2 28.3333 2.66667 28.3333H21.3333C22.8 28.3333 24 27.1333 24 25.6666V9.66659C24 8.19992 22.8 6.99992 21.3333 6.99992ZM12 2.99992C14.2667 2.99992 16 4.73325 16 6.99992H8C8 4.73325 9.73333 2.99992 12 2.99992ZM21.3333 25.6666H2.66667V9.66659H21.3333V25.6666ZM12 14.9999C9.73333 14.9999 8 13.2666 8 10.9999H5.33333C5.33333 14.7333 8.26667 17.6666 12 17.6666C15.7333 17.6666 18.6667 14.7333 18.6667 10.9999H16C16 13.2666 14.2667 14.9999 12 14.9999Z" fill="currentColor"/>
    </svg>
    `,
        routerLink: '/products',
        state: false
      },
      {
        id: 'messages',
        text: this.publicService.translateTextFromJson('dashboard.sideMenu.messages'),
        icon: `<svg width="25" height="25" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24.666 0.666504H3.33268C1.86602 0.666504 0.666016 1.8665 0.666016 3.33317V27.3332L5.99935 21.9998H24.666C26.1327 21.9998 27.3327 20.7998 27.3327 19.3332V3.33317C27.3327 1.8665 26.1327 0.666504 24.666 0.666504ZM24.666 19.3332H4.93268L3.33268 20.9332V3.33317H24.666V19.3332ZM20.666 12.6665H17.9993V9.99984H20.666V12.6665ZM15.3327 12.6665H12.666V9.99984H15.3327V12.6665ZM9.99935 12.6665H7.33268V9.99984H9.99935" fill="currentColor"/>
    </svg>
    `,
        routerLink: '/messages',
        state: false
      },
      {
        id: 'settings',
        text: this.publicService.translateTextFromJson('dashboard.sideMenu.settings'),
        icon: `<svg width="23" height="25" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.9995 8.6665C14.414 8.6665 15.7706 9.22841 16.7708 10.2286C17.771 11.2288 18.3329 12.5854 18.3329 13.9998C18.3329 15.4143 17.771 16.7709 16.7708 17.7711C15.7706 18.7713 14.414 19.3332 12.9995 19.3332C11.585 19.3332 10.2285 18.7713 9.22829 17.7711C8.2281 16.7709 7.6662 15.4143 7.6662 13.9998C7.6662 12.5854 8.2281 11.2288 9.22829 10.2286C10.2285 9.22841 11.585 8.6665 12.9995 8.6665ZM12.9995 11.3332C12.2923 11.3332 11.614 11.6141 11.1139 12.1142C10.6138 12.6143 10.3329 13.2926 10.3329 13.9998C10.3329 14.7071 10.6138 15.3854 11.1139 15.8855C11.614 16.3856 12.2923 16.6665 12.9995 16.6665C13.7068 16.6665 14.3851 16.3856 14.8851 15.8855C15.3852 15.3854 15.6662 14.7071 15.6662 13.9998C15.6662 13.2926 15.3852 12.6143 14.8851 12.1142C14.3851 11.6141 13.7068 11.3332 12.9995 11.3332ZM10.3329 27.3332C9.99953 27.3332 9.71953 27.0932 9.6662 26.7732L9.17286 23.2398C8.33286 22.9065 7.61286 22.4532 6.91953 21.9198L3.59953 23.2665C3.3062 23.3732 2.9462 23.2665 2.7862 22.9732L0.119531 18.3598C0.0379253 18.2225 0.00915624 18.0601 0.038604 17.903C0.0680518 17.7459 0.1537 17.605 0.279531 17.5065L3.09286 15.2932L2.99953 13.9998L3.09286 12.6665L0.279531 10.4932C0.1537 10.3947 0.0680518 10.2537 0.038604 10.0967C0.00915624 9.93962 0.0379253 9.77722 0.119531 9.63984L2.7862 5.0265C2.9462 4.73317 3.3062 4.61317 3.59953 4.73317L6.91953 6.0665C7.61286 5.5465 8.33286 5.09317 9.17286 4.75984L9.6662 1.2265C9.71953 0.906504 9.99953 0.666504 10.3329 0.666504H15.6662C15.9995 0.666504 16.2795 0.906504 16.3329 1.2265L16.8262 4.75984C17.6662 5.09317 18.3862 5.5465 19.0795 6.0665L22.3995 4.73317C22.6929 4.61317 23.0529 4.73317 23.2129 5.0265L25.8795 9.63984C26.0529 9.93317 25.9729 10.2932 25.7195 10.4932L22.9062 12.6665L22.9995 13.9998L22.9062 15.3332L25.7195 17.5065C25.9729 17.7065 26.0529 18.0665 25.8795 18.3598L23.2129 22.9732C23.0529 23.2665 22.6929 23.3865 22.3995 23.2665L19.0795 21.9332C18.3862 22.4532 17.6662 22.9065 16.8262 23.2398L16.3329 26.7732C16.2795 27.0932 15.9995 27.3332 15.6662 27.3332H10.3329ZM11.9995 3.33317L11.5062 6.81317C9.9062 7.1465 8.49286 7.99984 7.4662 9.1865L4.25286 7.79984L3.25286 9.53317L6.0662 11.5998C5.53286 13.1554 5.53286 14.8443 6.0662 16.3998L3.23953 18.4798L4.23953 20.2132L7.47953 18.8265C8.5062 19.9998 9.9062 20.8532 11.4929 21.1732L11.9862 24.6665H14.0129L14.5062 21.1865C16.0929 20.8532 17.4929 19.9998 18.5195 18.8265L21.7595 20.2132L22.7595 18.4798L19.9329 16.4132C20.4662 14.8532 20.4662 13.1598 19.9329 11.5998L22.7462 9.53317L21.7462 7.79984L18.5329 9.1865C17.4852 7.9736 16.064 7.1434 14.4929 6.8265L13.9995 3.33317H11.9995Z" fill="currentColor"/>
    </svg>
    `,
        routerLink: '/settings',
        state: false
      },
      {
        id: 'settings',
        text: 'settings',
        icon: 'pi pi-cog',
        state: false,
        children: [
          {
            text: this.publicService.translateTextFromJson('branches'),
            icon: 'pi pi-users',
            routerLink: '/dashboard/settings/branches',
            state: false
          },
          {
            text: this.publicService.translateTextFromJson('departments'),
            icon: 'layers',
            routerLink: '/dashboard/settings/departments',
            state: false
          },
          {
            text: this.publicService.translateTextFromJson('jobTitles'),
            icon: 'layers',
            routerLink: '/dashboard/settings/job-titles',
            state: false
          },
          {
            text: this.publicService.translateTextFromJson('dworkPositions'),
            icon: 'layers',
            routerLink: '/dashboard/settings/work-positions',
            state: false
          }
        ],
      },
      {
        id: 'logout',
        text: this.publicService.translateTextFromJson('auth.logout'),
        icon: `<svg width="25" height="25" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.22587 7.79889L3.66349 13.1223C3.44562 13.3708 3.33415 13.6846 3.33398 14C3.33387 14.2158 3.38587 14.4324 3.49155 14.6294C3.53852 14.7172 3.59588 14.8006 3.66349 14.8777L8.22587 20.2011C8.70507 20.7602 9.54679 20.825 10.1059 20.3458C10.6651 19.8666 10.7298 19.0249 10.2506 18.4657L7.5661 15.3334L17.8923 15.3334C18.6287 15.3334 19.2256 14.7364 19.2256 14.0001C19.2256 13.2637 18.6287 12.6667 17.8923 12.6667L7.56595 12.6667L10.2506 9.53423C10.7298 8.9751 10.6651 8.13337 10.1059 7.65417C9.54679 7.17497 8.70507 7.23977 8.22587 7.79889ZM16.6673 22.0001C15.9309 22.0001 15.334 21.4031 15.334 20.6667V18.6667C15.334 17.9304 14.737 17.3334 14.0007 17.3334C13.2643 17.3334 12.6673 17.9304 12.6673 18.6667V20.6667C12.6673 22.8759 14.4582 24.6667 16.6673 24.6667L20.6673 24.6667C22.8765 24.6667 24.6673 22.8759 24.6673 20.6667L24.6673 7.33341C24.6673 5.12428 22.8765 3.33341 20.6673 3.33341L16.6673 3.33341C14.4582 3.33341 12.6673 5.12428 12.6673 7.33341V9.33341C12.6673 10.0698 13.2643 10.6667 14.0007 10.6667C14.737 10.6667 15.334 10.0698 15.334 9.33341V7.33341C15.334 6.59703 15.9309 6.00008 16.6673 6.00008L20.6673 6.00008C21.4037 6.00008 22.0007 6.59703 22.0007 7.33341L22.0007 20.6667C22.0007 21.4031 21.4037 22.0001 20.6673 22.0001L16.6673 22.0001Z" fill="currentColor"/>
    </svg>
    `,
        routerLink: '/logout',
        state: false
      }
    ];
  }

  // Handle click event on menu item
  handelClick(item: any): void {
    // Reset state of all menu items
    this.menuListItems.forEach((ele: any) => {
      ele.state = false;
    });
    // Toggle state of clicked menu item
    item.state = !item?.state;
  }

  // Toggle sidebar collapse
  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    // Emit event with collapse state and screen width
    this.onToggleSideNav.emit(
      { collapsed: this.collapsed, screenWidth: this.screenWidth });
    this.rotate();
  }

  // Toggle sidebar icon
  toggleIcon(): void {
    this.collapsed = true;
    // Emit event with collapse state and screen width
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  // Rotate sidebar arrow icon
  rotate(): void {
    this.rotated = !this.rotated;
  }

  // Logout user
  logout(): void {
    this.confirmationService?.confirm({
      message: this.currentLanguage == 'ar' ? 'هل أنت متأكد أنك تريد تسجيل الخروج؟' : 'Are you sure you want to logout?',
      header: this.currentLanguage == 'ar' ? 'تسجيل خروج' : 'Logout',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.router?.navigate(['/Auth']);
        localStorage?.clear();
      },
    });

  }
}
