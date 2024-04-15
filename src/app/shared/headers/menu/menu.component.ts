import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Menu, NavService } from '../../services/nav.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() icon: boolean | undefined;
  @Input() menuRight: boolean = false;
  @Input() dropdownOpenOnHover: boolean = false;

  public menuItems: Menu[] = [];

  constructor(public navServices: NavService) {
    this.navServices.items.subscribe(
      (menuItems) => (this.menuItems = menuItems)
    );
  }

  toggleDropdown(item: Menu, open?: boolean): void {
    // This check now handles both megaMenu items and the general dropdown hover setting
    if (item.megaMenu || this.dropdownOpenOnHover || open !== undefined) {
      item.active = open !== undefined ? open : !item.active;
    }
  }
  
}
