import { DashboardNavbarComponent } from './../../shared/components/dashboard-navbar/dashboard-navbar.component';
import { AsideMenuComponent } from './../../shared/components/aside-menu/aside-menu.component';
import { FooterComponent } from './../../shared/components/footer/footer.component';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [AsideMenuComponent, FooterComponent, DashboardNavbarComponent, RouterModule, CommonModule],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isSideNavCollapsed: boolean = false;
  screenWidth: number = 0;
  toggleSideMenu: boolean = false;
  constructor(
    // private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    // this.sharedService.showSideMenu.subscribe((res: any) => {
    //   this.toggleSideMenu = res
    // })
    console.log(this.getLetterByIndex(5));
  }

  onToggleSideNav(data: any): void {
    this.isSideNavCollapsed = data.collapsed;
    this.screenWidth = data.screenWidth;
  }

  getDashClass(): string {
    let styleClass = '';
    if (this.isSideNavCollapsed && this.screenWidth > 768 && !this.toggleSideMenu) {
      styleClass = 'dash-trimmed';
    } else if (this.isSideNavCollapsed && this.screenWidth <= 768 && this.screenWidth > 0 && !this.toggleSideMenu) {
      styleClass = 'dash-md-screen';
    }
    return styleClass;
  }




  getLetterByIndex(i: any): any {
    // this.sharedService?.getLetter(i);
  }
}
